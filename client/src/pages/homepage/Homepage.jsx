import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaMapMarkedAlt, FaChartLine, FaHeartbeat } from "react-icons/fa";
import WeatherCard from "../homepage/Weathercard";
import { fetchAqi as fetchAqiFromService, fetchWeather } from "../../services/aqiService";

// Utility: AQI to category
const getCategory = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy (Sensitive)";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

// Utility: City name validator
const isValidCity = (name) => /^[a-zA-Z\s]+$/.test(name.trim());

// Utility: Weather emoji from main condition
const getWeatherIcon = (main) => {
  switch (main?.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "thunderstorm": return "⛈️";
    case "snow": return "❄️";
    case "mist":
    case "fog":
    case "haze": return "🌫️";
    default: return "🌡️";
  }
};

// 🔹 City Input Field
const CityInput = ({ city, onChange, error }) => (
  <div className="mb-2">
    <div className="relative w-full">
      <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black text-xl">
        <IoSearchSharp />
      </span>
      <input
        type="text"
        placeholder="Search City"
        value={city}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search city"
        aria-invalid={!!error}
        className={`w-full pl-12 py-3 rounded-full text-xl bg-teal-700 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-teal-400 ${error ? "border-2 border-red-600" : ""}`}
      />
    </div>
    {error && <p className="text-red-600 mt-1">{error}</p>}
  </div>
);

// 🔹 All 3 Buttons
const ButtonGroup = ({ onMapClick, onForecastClick, onHealthClick }) => (
  <div className="flex flex-row gap-4 flex-wrap w-full">
    <button
      onClick={onMapClick}
      className="bg-teal-700 px-8 py-6 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-teal-800 focus:ring-2 focus:ring-teal-400"
    >
      <FaMapMarkedAlt />
      <span>View on Map</span>
    </button>

    <button
      onClick={onForecastClick}
      className="bg-teal-700 px-8 py-6 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-teal-800 focus:ring-2 focus:ring-teal-400"
    >
      <FaChartLine />
      <span>View Forecast</span>
    </button>

    <button
      onClick={onHealthClick}
      className="bg-teal-700 px-8 py-6 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-teal-800 focus:ring-2 focus:ring-teal-400"
    >
      <FaHeartbeat />
      <span>View Health Chart</span>
    </button>
  </div>
);

// 🔹 Health Notes filler
const HealthNotes = () => (
  <div className="bg-teal-700 text-white px-8 py-8 rounded-xl text-center" aria-live="polite">
    Some health notes
  </div>
);

// ✅ Main Component
const Homepage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aqiData, setAqiData] = useState(null);

  const debouncedValidate = useCallback(
    debounce((value) => {
      if (value && !isValidCity(value)) {
        setError("City name must contain only letters and spaces");
      } else {
        setError("");
      }
    }, 500),
    []
  );

  const handleCityChange = (value) => {
    setCity(value);
    setError("");
    debouncedValidate(value);
  };

  const fetchAqi = async () => {
    if (!city.trim()) return setError("Please enter a city");
    if (!isValidCity(city)) return setError("Invalid city name");

    const safeCity = city.trim().toLowerCase();
    setLoading(true);
    setError("");
    setAqiData(null);

    try {
      const [aqiRes, weatherRes] = await Promise.all([
        fetchAqiFromService(safeCity),
        fetchWeather(safeCity),
      ]);

      if (!aqiRes || typeof aqiRes.aqi !== "number") {
        throw new Error("Invalid AQI data");
      }

      setAqiData({
        aqi: aqiRes.aqi,
        category: getCategory(aqiRes.aqi),
        city: aqiRes.location || safeCity,
        conditionIcon: getWeatherIcon(weatherRes?.weather?.[0]?.main),
        temperature: weatherRes?.main?.temp ?? 0,
        humidity: weatherRes?.main?.humidity ?? 0,
        wind: (weatherRes?.wind?.speed ?? 0) * 3.6,
        locationType: "urban", // you can make dynamic later
        metadata: {
          source: aqiRes?.source || "Ground Station",
        },
      });
    } catch (err) {
      console.error("Error fetching AQI/Weather:", err);
      setError("Failed to fetch data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-400 p-4">
      <div className="max-w-4xl mx-auto">
        <CityInput city={city} onChange={handleCityChange} error={error} />

        <button
          onClick={fetchAqi}
          disabled={loading || !!error || !city.trim()}
          aria-label="Get Air Quality Index"
          className={`mb-4 px-6 py-3 rounded-xl text-white ${loading || !!error || !city.trim()
            ? "bg-teal-400 cursor-not-allowed"
            : "bg-teal-700 hover:bg-teal-800"
            }`}
        >
          {loading ? "Loading..." : "Get AQI"}
        </button>

        <div className="flex gap-4 flex-wrap md:flex-nowrap items-stretch h-[300px]">
          {aqiData && (
            <div className="flex-1 min-w-[250px]">
              <WeatherCard data={aqiData} loading={loading} />
            </div>
          )}

          <div className="flex flex-col gap-4 flex-1 min-w-[250px]">
            <div className="flex-1">
              <ButtonGroup
                onMapClick={() => navigate("/map")}
                onForecastClick={() => navigate(`/trends?city=${encodeURIComponent(city)}`)}
                onHealthClick={() =>
                  navigate("/health", {
                    state: {
                      aqi: aqiData?.aqi,
                      location: aqiData?.city,
                      locationType: aqiData?.locationType,
                      source: aqiData?.metadata?.source,
                    },
                  })
                }
              />
            </div>
            <div className="flex-1">
              <HealthNotes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
