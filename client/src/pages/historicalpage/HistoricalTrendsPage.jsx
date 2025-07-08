import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaSmog,
  FaSatellite,
  FaFire,
  FaCloudSunRain,
  FaChevronDown,
  FaChartLine,
} from "react-icons/fa";
import forecastData from "../../data/forecastData";

// Pollutants with icons
const pollutants = [
  { value: "pm25", label: "PM2.5", icon: <FaSmog className="mr-2" /> },
  { value: "pm10", label: "PM10", icon: <FaSmog className="mr-2" /> },
  { value: "no2", label: "NO₂", icon: <FaSmog className="mr-2" /> },
  { value: "so2", label: "SO₂", icon: <FaSmog className="mr-2" /> },
  { value: "co", label: "CO", icon: <FaSmog className="mr-2" /> },
  { value: "o3", label: "O₃", icon: <FaSmog className="mr-2" /> },
];

const cities = ["Chennai", "Mumbai"];

export default function HistoricalTrendsPage() {
  const [city, setCity] = useState("Chennai");
  const [pollutant, setPollutant] = useState(pollutants[0]);
  const [fromDate, setFromDate] = useState("2025-06-01");
  const [toDate, setToDate] = useState("2025-06-05");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = forecastData
      .filter(
        (item) =>
          item.city === city &&
          item.pollutant === pollutant.value &&
          item.source === "sensor" &&
          item.date >= fromDate &&
          item.date <= toDate
      )
      .map((entry) => ({
        date: entry.date,
        value: entry.aqi,
      }));
    setFilteredData(filtered);
  }, [city, pollutant, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-[#00CFFF] p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white flex justify-center items-center gap-2">
        <FaChartLine /> Air Quality Trends
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
        {/* City Dropdown */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-lg bg-[#0C7771] text-white"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Custom Pollutant Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-2 rounded-lg bg-[#0C7771] text-white flex justify-between items-center"
          >
            <span className="flex items-center">
              {pollutant.icon}
              {pollutant.label}
            </span>
            <FaChevronDown />
          </button>

          {dropdownOpen && (
            <ul className="absolute bg-white rounded shadow mt-1 z-10 w-full">
              {pollutants.map((p) => (
                <li
                  key={p.value}
                  onClick={() => {
                    setPollutant(p);
                    setDropdownOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-[#0C7771] hover:text-white flex items-center"
                >
                  {p.icon}
                  {p.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          max={toDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 rounded-lg bg-[#0C7771] text-white"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          min={fromDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 rounded-lg bg-[#0C7771] text-white"
        />
      </div>

      {/* Line Chart */}
      <div className="w-full max-w-5xl mx-auto bg-[#0C7771] rounded-xl p-4 shadow text-white">
        {filteredData.length === 0 ? (
          <p className="text-center">⚠️ No data available for this selection.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff4d" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00E9B3"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Satellite Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
        <div className="bg-[#0C7771] text-white p-6 rounded-xl shadow text-center text-lg">
          <FaSatellite className="text-2xl mb-2 mx-auto" />
          Satellite Monitoring <br /> Over {city}
        </div>
        <div className="bg-[#0C7771] text-white p-6 rounded-xl shadow text-center text-lg">
          <FaFire className="text-2xl mb-2 mx-auto" />
          Wildfire Risk <br /> & Heat Zones
        </div>
        <div className="bg-[#0C7771] text-white p-6 rounded-xl shadow text-center text-lg">
          <FaCloudSunRain className="text-2xl mb-2 mx-auto" />
          Weather Overlay <br /> & Wind Flow
        </div>
      </div>
    </div>
  );
}