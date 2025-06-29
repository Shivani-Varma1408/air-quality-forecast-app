const express = require("express");
const router = express.Router();
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const cache = require("../services/cache");
const cityInfo = require("../config/cities");

// Rate limiter for AQI API
const aqiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" }
});

// Health check
router.get("/health", (req, res) => {
  console.log("🧪 Health check hit");
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Weather endpoint
router.get("/weather", async (req, res) => {
  const city = (req.query.city || '').trim();
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

// AQI endpoint
router.get("/aqi", aqiLimiter, async (req, res) => {
  const city = (req.query.city || '').toLowerCase().trim();
  if (!city || !cityInfo[city]) return res.status(400).json({ error: "Invalid city" });

  const cacheKey = `aqi_${city}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  try {
    const response = await axios.get("https://api.airvisual.com/v2/city", {
      params: {
        city: cityInfo[city].city,
        state: cityInfo[city].state,
        country: cityInfo[city].country,
        key: process.env.IQAIR_API_KEY
      }
    });

    const data = response.data.data;
    const result = {
      location: `${data.city}, ${data.state}`,
      aqi: data.current.pollution.aqius,
      mainPollutant: data.current.pollution.mainus,
      time: data.current.pollution.ts
    };

    cache.set(cacheKey, result);
    res.json(result);
  } catch (err) {
    console.error("🌫 AQI fetch error:", err.message);
    res.status(500).json({ error: "AQI fetch failed", details: err.message });
  }
});

module.exports = router;
