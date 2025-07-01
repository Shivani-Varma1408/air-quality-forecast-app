// AQI standard definitions with status, emoji, color, and advisory
const standards = {
  india: [
    {
      min: 0,
      max: 50,
      status: "Good",
      color: "#00e400",
      emoji: "😊",
      advisory: ["Enjoy outdoor activities"],
    },
    {
      min: 51,
      max: 100,
      status: "Satisfactory",
      color: "#a3c853",
      emoji: "🙂",
      advisory: ["Sensitive groups should reduce outdoor exertion"],
    },
    {
      min: 101,
      max: 200,
      status: "Moderate",
      color: "#fff833",
      emoji: "😷",
      advisory: ["Wear a mask", "Avoid long outdoor activities"],
    },
    {
      min: 201,
      max: 300,
      status: "Poor",
      color: "#f29c33",
      emoji: "😡",
      advisory: ["Avoid morning/evening walks", "Use air purifiers"],
    },
    {
      min: 301,
      max: 400,
      status: "Very Poor",
      color: "#e93f33",
      emoji: "☠",
      advisory: ["Stay indoors", "Use N95 mask if going out"],
    },
    {
      min: 401,
      max: 500,
      status: "Severe",
      color: "#af2d24",
      emoji: "☠",
      advisory: ["Health emergency", "Avoid all outdoor activity"],
    },
  ],
  who: [
    {
      min: 0,
      max: 25,
      status: "Good",
      color: "#00e400",
      emoji: "😊",
      advisory: ["Safe for all"],
    },
    {
      min: 26,
      max: 50,
      status: "Moderate",
      color: "#ffff00",
      emoji: "🙂",
      advisory: ["Minimize outdoor activity"],
    },
    {
      min: 51,
      max: 100,
      status: "Unhealthy",
      color: "#ff9933",
      emoji: "😷",
      advisory: ["Wear a mask outdoors"],
    },
    {
      min: 101,
      max: 150,
      status: "Very Unhealthy",
      color: "#cc0033",
      emoji: "😡",
      advisory: ["Stay indoors when possible"],
    },
    {
      min: 151,
      max: 300,
      status: "Hazardous",
      color: "#660099",
      emoji: "☠",
      advisory: ["Health emergency, avoid exposure"],
    },
  ],
  us: [
    {
      min: 0,
      max: 50,
      status: "Good",
      color: "#00e400",
      emoji: "😊",
      advisory: ["Air quality is ideal"],
    },
    {
      min: 51,
      max: 100,
      status: "Moderate",
      color: "#ffff00",
      emoji: "🙂",
      advisory: ["Unusually sensitive people should limit outdoor exertion"],
    },
    {
      min: 101,
      max: 150,
      status: "Unhealthy for Sensitive Groups",
      color: "#ff7e00",
      emoji: "😷",
      advisory: ["Sensitive groups should reduce outdoor activity"],
    },
    {
      min: 151,
      max: 200,
      status: "Unhealthy",
      color: "#ff0000",
      emoji: "😡",
      advisory: ["Everyone should limit prolonged outdoor exertion"],
    },
    {
      min: 201,
      max: 300,
      status: "Very Unhealthy",
      color: "#8f3f97",
      emoji: "☠",
      advisory: ["Avoid all outdoor activity"],
    },
    {
      min: 301,
      max: 500,
      status: "Hazardous",
      color: "#7e0023",
      emoji: "☠",
      advisory: ["Health warning of emergency conditions"],
    },
  ],
};

/**
 * Returns health status info based on AQI and standard.
 * @param {number} aqi - The air quality index value.
 * @param {"india" | "who" | "us"} [standard="india"]
 * @returns {{status: string, color: string, emoji: string, advisory: string[]}}
 */
export function getHealthStatus(aqi, standard = "india") {
  const ranges = standards[standard] || standards["india"];
  return (
    ranges.find((range) => aqi >= range.min && aqi <= range.max) || {
      status: "Unknown",
      color: "#ccc",
      emoji: "❓",
      advisory: ["No data available"],
    }
  );
}
