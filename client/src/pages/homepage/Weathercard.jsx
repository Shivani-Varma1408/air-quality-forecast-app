import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ data }) => {
  const [locationAqiData, setLocationAqiData] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (locationAqiData && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [locationAqiData]);

  // Prefer dynamic AQI data if available, else fallback to props
  const {
    conditionIcon = "☀️",
    aqi = locationAqiData?.aqi || 72,
    category =
      aqi <= 50
        ? "Good"
        : aqi <= 100
        ? "Moderate"
        : aqi <= 150
        ? "Unhealthy for Sensitive"
        : aqi <= 200
        ? "Unhealthy"
        : aqi <= 300
        ? "Very Unhealthy"
        : "Hazardous",
    city = locationAqiData?.city || data?.city || "Your Location",
    temperature = locationAqiData?.temperature || data?.temperature || 35,
    humidity = locationAqiData?.humidity || data?.humidity || 40,
    wind = locationAqiData?.wind || data?.wind || 15.9,
      source = locationAqiData?.source || "IQAir API",

  } = data || {};

  const handleUseMyLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `/api/aqi-coords?lat=${latitude}&lon=${longitude}`
        );

        if (res.data && res.data.city && res.data.aqi) {
          setLocationAqiData(res.data);
          setLocationError(null);
        } else {
          setLocationAqiData(null);
          setLocationError("⚠️ No data available for this region.");
        }
      } catch (err) {
        console.error("Error fetching AQI:", err);
        setLocationAqiData(null);
        setLocationError("Could not fetch AQI for your location.");
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      setLocationError("Failed to get your location.");
    }
  );
};


  return (
    <div
      className="bg-gradient-to-r from-yellow-200 to-orange-400 p-6 rounded-3xl w-full max-w-md mx-auto flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label={`Air quality card for ${city}, AQI ${aqi} (${category})`}
    >
      <div className="flex justify-between items-start">
        <span className="text-4xl" aria-hidden="true">
          {conditionIcon}
        </span>
        <div className="text-right">
          <div className="text-6xl font-extrabold leading-tight">{aqi}</div>
          <div className="text-base font-semibold uppercase tracking-wide">
            {category}
          </div>
          <p className="text-sm text-gray-600 mt-1">
  Source: {source}
</p>

        </div>
      </div>

      <div className="text-center text-3xl font-semibold mt-6">{city}</div>

      <div className="flex justify-around mt-6 text-base font-medium tracking-wide space-x-4">
        <div>
          🌥 <span>{temperature}°C</span>
        </div>
        <div>
          💧 <span>{humidity}%</span>
        </div>
        <div>
          💨 <span>{wind.toFixed(1)} km/h</span>

        </div>
      </div>

      <button
        onClick={handleUseMyLocation}
        className="mt-6 bg-white text-orange-700 font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-orange-100 transition"
      >
        📍 Use My Location
      </button>

  
      {locationError && !locationAqiData && (
  <div className="mt-4 p-4 text-red-700 font-medium border border-red-400 rounded bg-red-50 shadow">
    ⚠️ No data available for this region.
  </div>
)}

      {locationAqiData && (
        <div
          ref={resultRef}
          className="mt-4 border p-4 rounded bg-green-50 shadow-sm"
        >
          <p className="text-xl font-bold mb-2">
            📍 Live AQI From Your Location
          </p>
          <p>
            <strong>City:</strong> {locationAqiData.city}
          </p>
          <p>
            <strong>AQI:</strong> {locationAqiData.aqi}
          </p>
          <p>
            <strong>Temperature:</strong> {locationAqiData.temperature}°C
          </p>
          <p>
            <strong>Humidity:</strong> {locationAqiData.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {locationAqiData.wind} km/h
          </p>
          <p className="text-sm mt-2 text-gray-600 italic">
            Source: IQAir API
          </p>
        </div>
      )}

    </div>
  );
};

export default WeatherCard;
