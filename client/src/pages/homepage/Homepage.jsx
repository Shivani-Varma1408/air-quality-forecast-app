
import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import WeatherCard from "../homepage/Weathercard";
import { FaMapMarkedAlt, FaChartLine, FaArrowRight } from "react-icons/fa";
import { fetchAqi as fetchAqiFromService } from "../../services/aqiService";

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

// Component: City Input Field
const CityInput = ({ city, onChange, error }) => (
  <div className="mb-2">
    <input
      type="text"
      placeholder="🔍 Search City"
      value={city}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search city"
      aria-invalid={!!error}
      className={`w-full p-3 rounded-full text-xl bg-teal-700 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-teal-400 ${
        error ? "border-2 border-red-600" : ""
      }`}
    />
    {error && <p className="text-red-600 mt-1">{error}</p>}
  </div>
);

// Component: Buttons (Map, Forecast)
const ButtonGroup = () => (
  <div className="flex flex-col gap-4">
    <button className="bg-teal-700 px-6 py-3 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
      <FaMapMarkedAlt />
      View on Map
    </button>
    <button className="bg-teal-700 px-6 py-3 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
      <FaChartLine />
      View Forecast
    </button>
    <button className="bg-teal-700 px-6 py-3 rounded-xl text-white flex justify-between items-center hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400">
      View in Map <FaArrowRight />
    </button>
  </div>
);

// Component: Health Notes
const HealthNotes = () => (
  <div className="bg-teal-700 text-white p-4 rounded-xl text-center" aria-live="polite">
    Some health notes
  </div>
);

// ✅ Main Component
const Homepage = () => {
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

  // 🧠 STEP 5: FIXED fetchAqi Function
  const fetchAqi = async () => {
    console.log("🟡 Fetching AQI triggered");

    if (!city.trim()) return setError("Please enter a city");
    if (!isValidCity(city)) return setError("Invalid city name");

    const safeCity = city.trim().toLowerCase();
    setLoading(true);
    setError("");
    setAqiData(null);

    try {
      const aqiRes = await fetchAqiFromService(safeCity);
      console.log("✅ API Success:", aqiRes);

      if (!aqiRes || typeof aqiRes.aqi !== "number") {
        console.error("❌ Invalid AQI response:", aqiRes);
        throw new Error("Invalid AQI data");
      }

      setAqiData({
        aqi: aqiRes.aqi,
        category: getCategory(aqiRes.aqi),
        city: aqiRes.location || safeCity,
        conditionIcon: "🌤️", // static placeholder
      });
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError("Failed to fetch AQI. Try a valid city.");
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
          className={`mb-4 px-6 py-3 rounded-xl text-white ${
            loading || !!error || !city.trim()
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-700 hover:bg-teal-800"
          }`}
        >
          {loading ? "Loading..." : "Get AQI"}
        </button>

        <div className="flex gap-4 flex-wrap">
          {aqiData && <WeatherCard data={aqiData} loading={loading} />}
          <div className="flex flex-col gap-4 flex-grow max-w-xs">
            <ButtonGroup />
            <HealthNotes />
          </div>
        </div>

        <div className="flex justify-around mt-6 text-3xl" aria-label="Air quality rating stars">
          <span className="text-lime-400" aria-hidden="true">★</span>
          <span className="text-yellow-400" aria-hidden="true">★</span>
          <span className="text-orange-400" aria-hidden="true">★</span>
          <span className="text-red-500" aria-hidden="true">★</span>
          <span className="text-purple-400" aria-hidden="true">★</span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
