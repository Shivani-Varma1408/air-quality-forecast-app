// client/pages/HealthPage/Health.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getHealthStatus } from "../healthpage/utils/aqiToHealth";

import AdvisoryCard from "./AdvisoryCard";

const Health = () => {
  const location = useLocation();
  const passedData = location.state || {};

  const [standard, setStandard] = useState("india");
  const [isRural, setIsRural] = useState(false);

  const aqi = passedData.aqi || 0;
  const source = passedData.source || "Unknown";

  const { status, color, emoji, advisory } = getHealthStatus(aqi, standard);

  const ruralTips = [
    "Avoid firewood indoors",
    "Keep ventilation open",
    "Use masks if burning crops nearby",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* AQI Status Card */}
      <div
        className="w-full max-w-2xl rounded-3xl shadow-lg p-6 text-white"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-2xl font-bold mb-2">Health Status: {status}</h2>
        <div className="text-5xl mb-4">{emoji}</div>
        <p className="text-lg mb-1">
          AQI: {aqi} ({standard.toUpperCase()} standard)
        </p>
        <p className="text-sm">Data Source: {source}</p>
      </div>

      {/* Standard Toggle Buttons */}
      <div className="mt-6 flex gap-4">
        {["india", "who", "us"].map((std) => (
          <button
            key={std}
            onClick={() => setStandard(std)}
            className={`px-4 py-2 rounded-full text-white ${
              standard === std ? "bg-blue-700" : "bg-gray-400"
            }`}
          >
            {std.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Rural Toggle Checkbox */}
      <div className="mt-4 flex items-center gap-2">
        <input
          id="ruralCheck"
          type="checkbox"
          checked={isRural}
          onChange={(e) => setIsRural(e.target.checked)}
          className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
        />
        <label htmlFor="ruralCheck" className="text-black text-lg">
          I am from a rural area
        </label>
      </div>

      {/* Advisory Cards */}
      <div className="mt-6 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {advisory.map((tip, i) => (
          <AdvisoryCard key={i} tip={tip} />
        ))}

        {isRural &&
          ruralTips.map((tip, i) => (
            <AdvisoryCard key={`rural-${i}`} tip={tip} icon="🌾" />
          ))}
      </div>
    </div>
  );
};

export default Health;
