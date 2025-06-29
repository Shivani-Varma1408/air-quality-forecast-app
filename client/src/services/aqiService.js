// /client/src/services/aqiService.js
import axios from "axios";

export const fetchAqi = async (city) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
    const url = `${baseUrl}/aqi?city=${encodeURIComponent(city)}`;
    const res = await axios.get(url);

    // ✅ Protects against misrouted HTML responses
    if (typeof res.data === "string" && res.data.includes("<!doctype html>")) {
      throw new Error("HTML received instead of JSON. Check proxy/server.");
    }

    return res.data; // ✅ Clean response
  } catch (err) {
    console.error("❌ AQI Fetch Error:", err.message);
    throw err;
  }
};
