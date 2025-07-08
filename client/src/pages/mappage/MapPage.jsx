import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoSearchSharp } from "react-icons/io5";
import { fetchAllAqi } from "../../services/aqiService";

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "yellow";
  if (aqi <= 150) return "orange";
  if (aqi <= 200) return "red";
  if (aqi <= 300) return "purple";
  return "maroon";
};

function MapFlyTo({ position }) {
  const map = useMap();
  if (position) map.flyTo(position, 12);
  return null;
}

const LegendItem = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <div style={{
      width: "16px",
      height: "16px",
      backgroundColor: color,
      borderRadius: "4px"
    }}></div>
    <span style={{ fontSize: "12px" }}>{label}</span>
  </div>
);

const AQILegend = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      padding: "10px",
      zIndex: 1000
    }}
  >
    <h4 style={{ margin: "0 0 6px 0", textAlign: "center" }}>AQI Scale</h4>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <LegendItem color="green" label="Good (0-50)" />
      <LegendItem color="yellow" label="Moderate (51-100)" />
      <LegendItem color="orange" label="Unhealthy (101-150)" />
      <LegendItem color="red" label="Very Unhealthy (151-200)" />
      <LegendItem color="purple" label="Hazardous (201-300)" />
      <LegendItem color="maroon" label="Severe (>300)" />
    </div>
  </div>
);

const MapPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [aqiData, setAqiData] = useState([]);
  const [customPin, setCustomPin] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const getAllCities = async () => {
      try {
        const data = await fetchAllAqi();
        setAqiData(data);
      } catch (err) {
        console.error("Map AQI load failed:", err.message);
      }
    };

    getAllCities();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setNoDataMessage("");
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = aqiData.filter(city =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSelectSuggestion = (city) => {
    setSelectedCity(city);
    setMarkerPosition([city.lat, city.lon]);
    setSearchInput(city.name);
    setSuggestions([]);
    setNoDataMessage("");
    setCustomPin(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      } else {
        setSelectedCity(null);
        setMarkerPosition([22.9734, 78.6569]);
        setNoDataMessage(`No data for "${searchInput}".`);
        setCustomPin(null);
      }
    }
  };

  const toggleSatellite = () => setSatelliteView(!satelliteView);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <AQILegend />

      {/* Search and controls */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        padding: "8px",
        width: "260px"
      }}>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <IoSearchSharp style={{
              position: "absolute",
              top: "50%",
              left: "8px",
              transform: "translateY(-50%)",
              color: "#888"
            }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "6px 10px 6px 30px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                outline: "none"
              }}
            />
          </div>
          <button onClick={() => {
            if (suggestions.length > 0) {
              handleSelectSuggestion(suggestions[0]);
            } else {
              setSelectedCity(null);
              setMarkerPosition([22.9734, 78.6569]);
              setNoDataMessage(`No data for "${searchInput}".`);
              setCustomPin(null);
            }
          }} style={{
            padding: "6px 10px",
            backgroundColor: "#007B83",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}>Go</button>
        </div>

        {suggestions.length > 0 && (
          <div style={{
            marginTop: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            background: "white"
          }}>
            {suggestions.map((city, index) => (
              <div key={index} onClick={() => handleSelectSuggestion(city)} style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}>{city.name}</div>
            ))}
          </div>
        )}

        <button onClick={toggleSatellite} style={{
          marginTop: "8px",
          width: "100%",
          padding: "6px 10px",
          backgroundColor: "#007B83",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          {satelliteView ? "Switch to Map View" : "Switch to Satellite View"}
        </button>
      </div>

      <MapContainer
        center={markerPosition || [22.9734, 78.6569]}
        zoom={markerPosition ? 10 : 5}
        style={{ height: "100%", width: "100%" }}
        onClick={async (e) => {
          const lat = e.latlng.lat;
          const lon = e.latlng.lng;

          try {
            const res = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/aqi-coords?lat=${lat}&lon=${lon}`
            );
            const data = await res.json();

            if (data.error) {
              alert("Could not fetch AQI for that location.");
              return;
            }

            setCustomPin({
              lat,
              lon,
              aqi: data.aqi,
              pollutant: data.pollutant,
              city: data.city || "Unknown",
              source: data.source || "coord-api"
            });
            setMarkerPosition([lat, lon]);
            setSelectedCity(null);
            setNoDataMessage("");
          } catch (err) {
            alert("Error: " + err.message);
          }
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url={satelliteView
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        {/* Selected City */}
        {markerPosition && selectedCity && (
          <>
            <MapFlyTo position={markerPosition} />
            <CircleMarker center={markerPosition} radius={12} pathOptions={{
              color: getAQIColor(selectedCity.aqi),
              fillColor: getAQIColor(selectedCity.aqi),
              fillOpacity: 0.8
            }}>
              <Popup>
                📍 {selectedCity.name}<br />
                AQI: {selectedCity.aqi}<br />
                Pollutant: {selectedCity.pollutant}<br />
                Source: {selectedCity.source || "city-api"}
              </Popup>
            </CircleMarker>
          </>
        )}

        {/* Custom Pin Drop */}
        {customPin && (
          <CircleMarker center={[customPin.lat, customPin.lon]} radius={14} pathOptions={{
            color: "#3399ff",
            fillColor: "#3399ff",
            fillOpacity: 0.6
          }}>
            <Popup>
              📌 Custom Pin<br />
              Lat: {customPin.lat.toFixed(3)}<br />
              Lon: {customPin.lon.toFixed(3)}<br />
              AQI: {customPin.aqi}<br />
              Pollutant: {customPin.pollutant}<br />
              Source: {customPin.source}
            </Popup>
          </CircleMarker>
        )}

        {/* All Cities */}
        {aqiData.map((city, index) => (
          <CircleMarker key={index} center={[city.lat, city.lon]} radius={10} pathOptions={{
            color: getAQIColor(city.aqi),
            fillColor: getAQIColor(city.aqi),
            fillOpacity: 0.8
          }}>
            <Popup>
              📍 {city.name}<br />
              AQI: {city.aqi}<br />
              Pollutant: {city.pollutant}<br />
              Source: {city.source || "city-api"}
            </Popup>
          </CircleMarker>
        ))}

        {noDataMessage && (
          <Popup position={[22.9734, 78.6569]}>
            {noDataMessage}
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
