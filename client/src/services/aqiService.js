// /client/src/services/aqiService.js
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export const fetchAqi = async (city) => {
  try {
    const url = `${baseUrl}/aqi?city=${encodeURIComponent(city)}`;
    const res = await axios.get(url);

    if (typeof res.data === "string" && res.data.includes("<!doctype html>")) {
      throw new Error("HTML received instead of JSON. Check proxy/server.");
    }

    return res.data;
  } catch (err) {
    console.error("❌ AQI Fetch Error:", err.message);
    throw err;
  }
};

export const fetchWeather = async (city) => {
  try {
    const url = `${baseUrl}/weather?city=${encodeURIComponent(city)}`;
    const res = await axios.get(url);

    if (typeof res.data === "string" && res.data.includes("<!doctype html>")) {
      throw new Error("HTML received instead of JSON. Check proxy/server.");
    }

    return res.data;
  } catch (err) {
    console.error("❌ Weather Fetch Error:", err.message);
    throw err;
  }
};
export const fetchAllAqi = async () => {
  try {
    const url = `${baseUrl}/all-aqi`;
    const res = await axios.get(url);

    if (typeof res.data === "string" && res.data.includes("<!doctype html>")) {
      throw new Error("HTML received instead of JSON. Check proxy/server.");
    }

    return res.data;
  } catch (err) {
    console.error("❌ All AQI Fetch Error:", err.message);
    throw err;
  }
};