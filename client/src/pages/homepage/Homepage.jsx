import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import WeatherCard from "../homepage/Weathercard";
import { FaMapMarkedAlt, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

const isValidCity = (name) => /^[a-zA-Z\s]+$/.test(name.trim());

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

const ButtonGroup = ({ onMapClick }) => (
  <div className="flex flex-row gap-4 w-full">
    <button
      onClick={onMapClick}
      className="bg-teal-700 px-15 py-8 rounded-xl text-white flex items-center justify-center whitespace-nowrap gap-2 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
      aria-label="View on Map"
    >
      <FaMapMarkedAlt />
      <span>View on Map</span>
    </button>

    <button
      className="bg-teal-700 px-15 py-8 rounded-xl text-white flex items-center justify-center whitespace-nowrap gap-2 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
      aria-label="View Forecast"
    >
      <FaChartLine />
      <span>View Forecast</span>
    </button>
  </div>
);

const HealthNotes = () => (
  <div className="bg-teal-700 text-white px-15 py-50 rounded-xl text-center" aria-live="polite">
    Some health notes
  </div>
);

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

  const fetchAqi = () => {
    if (!city.trim()) return setError("Please enter a city");
    if (!isValidCity(city)) return setError("City name is invalid");

    setLoading(true);
    setError("");
    setAqiData(null);

    setTimeout(() => {
      setAqiData({
        aqi: 72,
        category: "Moderate",
        city: city.toUpperCase(),
        temperature: 35,
        humidity: 40,
        wind: 15.9,
        conditionIcon: "☀",
      });
      setLoading(false);
    }, 1500);
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
              <ButtonGroup onMapClick={() => navigate("/map")} />
            </div>
            <div className="flex-1">
              <HealthNotes />
            </div>
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
