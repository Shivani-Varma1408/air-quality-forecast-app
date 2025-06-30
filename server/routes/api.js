const express = require("express");
const router = express.Router();
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const cache = require("../services/cache");
const cityInfo = require("../config/cities");

// ⏱ Delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ✅ Startup validation
Object.entries(cityInfo).forEach(([key, meta]) => {
  if (!meta.city || !meta.state || !meta.country) {
    throw new Error(`❌ Invalid city entry for "${key}": missing city/state/country`);
  }
});

// ✅ Rate limiter
const aqiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" }
});

// ✅ Health check
router.get("/health", (req, res) => {
  console.log("🧪 Health check hit");
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ✅ Weather by city
router.get("/weather", async (req, res) => {
  const city = (req.query.city || "").trim();
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        units: "metric",
        appid: process.env.OPENWEATHER_API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("🌩 Weather fetch error:", err.message);
    res.status(500).json({ error: "Weather fetch failed", details: err.message });
  }
});

// ✅ Smart AQI by city with fallback
router.get("/aqi", aqiLimiter, async (req, res) => {
  const city = (req.query.city || "").toLowerCase().trim();
  if (!city || !cityInfo[city]) return res.status(400).json({ error: "Invalid city" });

  const cacheKey = `aqi_${city}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ ...cached, cached: true });

  try {
    const data = await fetchAqiWithFallback(city, cityInfo[city]);
    cache.set(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error(`❌ AQI fetch failed for ${city}:`, error.message);
    res.status(500).json({ error: "AQI fetch failed", details: error.message });
  }
});

// ✅ AQI by coordinates
router.get("/aqi-coords", aqiLimiter, async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

  try {
    const response = await axios.get("http://api.airvisual.com/v2/nearest_city", {
      params: {
        lat,
        lon,
        key: process.env.IQAIR_API_KEY
      }
    });

    const data = response.data.data;
    res.json({
      city: data.city,
      aqi: data.current.pollution.aqius,
      temperature: data.current.weather.tp,
      humidity: data.current.weather.hu,
      wind: data?.current?.weather?.ws ? parseFloat(data.current.weather.ws * 3.6).toFixed(1) : null
    });
  } catch (error) {
    console.error("🌍 AQI from coords error:", error.message);
    res.status(500).json({ error: "Failed to fetch AQI from coordinates" });
  }
});

// ✅ All cities AQI
router.get("/all-aqi", aqiLimiter, async (req, res) => {
  try {
    const results = [];

    for (const [key, meta] of Object.entries(cityInfo)) {
      await delay(1000);
      const cacheKey = `aqi_${key}`;

      try {
        const cached = cache.get(cacheKey);
        if (cached) {
          results.push(formatCityResult(meta, cached));
          continue;
        }

        const data = await fetchAqiWithFallback(key, meta);
        cache.set(cacheKey, data);
        results.push(formatCityResult(meta, data));
      } catch (error) {
        console.warn(`❌ Skipping ${meta.city}:`, error.message);
        continue;
      }
    }

    if (results.length === 0) {
      return res.status(500).json({ error: "All AQI fetches failed" });
    }

    res.json(results);
  } catch (error) {
    console.error("❌ /all-aqi fatal error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔧 Helper functions
function formatCityResult(meta, data) {
  return {
    name: meta.city,
    lat: meta.lat || null,
    lon: meta.lon || null,
    aqi: data.aqi,
    pollutant: data.mainPollutant,
    source: data.source || "unknown"
  };
}

function processCityResponse(data) {
  return {
    location: `${data.data.city}, ${data.data.state}`,
    aqi: data.data.current.pollution.aqius,
    mainPollutant: data.data.current.pollution.mainus,
    time: data.data.current.pollution.ts,
    source: "city-api"
  };
}

function processCoordResponse(data, meta) {
  return {
    location: `${meta.city}, ${meta.state}`,
    aqi: data.data.current.pollution.aqius,
    mainPollutant: data.data.current.pollution.mainus,
    time: data.data.current.pollution.ts,
    source: "coord-api"
  };
}

async function fetchAqiWithFallback(key, meta) {
  try {
    const response = await axios.get("https://api.airvisual.com/v2/city", {
      params: {
        city: meta.city,
        state: meta.state,
        country: meta.country,
        key: process.env.IQAIR_API_KEY
      }
    });
    return processCityResponse(response.data);
  } catch (cityError) {
    console.warn(`⚠️ City API failed for ${meta.city}:`, cityError.message);

    if (!meta.lat || !meta.lon) throw cityError;

    const coordResponse = await axios.get("http://api.airvisual.com/v2/nearest_city", {
      params: {
        lat: meta.lat,
        lon: meta.lon,
        key: process.env.IQAIR_API_KEY
      }
    });

    return processCoordResponse(coordResponse.data, meta);
  }
}

module.exports = router;
