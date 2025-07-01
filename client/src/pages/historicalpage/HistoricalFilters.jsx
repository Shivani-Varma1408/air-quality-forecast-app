import React from "react";

const pollutantOptions = ["pm25", "pm10", "co", "no2", "so2", "o3"];

export default function HistoricalFilters({
  city,
  setCity,
  parameter,
  setParameter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onFetch,
  loading,
}) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Historical AQI Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {pollutantOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={onFetch}
        disabled={loading}
        className={`w-full mt-4 py-2 rounded ${
          loading ? "bg-gray-400" : "bg-teal-700 hover:bg-teal-800"
        } text-white`}
      >
        {loading ? "Fetching..." : "Fetch Data"}
      </button>
    </div>
  );
}
