// client/components/HealthStatusCard.jsx

import React from "react";

const HealthStatusCard = ({ status, color, emoji, aqi }) => {
  return (
    <div
      className="rounded-3xl p-6 md:p-8 text-white shadow-lg transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <div className="text-6xl md:text-7xl">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold mt-4">Status: {status}</h1>
      <p className="mt-2 text-lg md:text-xl font-medium">AQI: {aqi}</p>
    </div>
  );
};

export default HealthStatusCard;