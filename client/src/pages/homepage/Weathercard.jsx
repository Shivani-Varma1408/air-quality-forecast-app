import React from "react";

const WeatherCard = ({ data }) => {
  // Use dummy fallback if no data passed
  const {
    conditionIcon = "☀️",
    aqi = 72,
    category = "Moderate",
    city = "CHENNAI",
    temperature = 35,
    humidity = 40,
    wind = 15.9,
  } = data || {};

  return (
    <div
      className="bg-gradient-to-r from-yellow-200 to-orange-400 p-6 rounded-3xl w-full md:w-1/2 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label={`Air quality card for ${city}, AQI ${aqi} (${category})`}
    >
      <div className="flex justify-between items-start">
        <span className="text-4xl" aria-hidden="true">
          {conditionIcon}
        </span>
        <div className="text-right">
          <div className="text-5xl font-extrabold leading-none">{aqi}</div>
          <div className="text-lg font-semibold uppercase tracking-wide">{category}</div>
        </div>
      </div>

      <div className="text-center text-3xl font-semibold mt-6">{city}</div>

      <div className="flex justify-between mt-8 text-base font-medium tracking-wide">
        <div>
          🌥 <span>{temperature}°C</span>
        </div>
        <div>
          💧 <span>{humidity}%</span>
        </div>
        <div>
          💨 <span>{wind} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
