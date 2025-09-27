# 🌿 Prāṇa Swarakṣā

**“For every breath, in every corner of India.”**  
A real-time air quality visualizer and health advisory platform tailored for rural, underserved, and health-vulnerable communities.

---

## 📱 Live Features

### ✅ Home Page
- Search city or auto-detect location
- Real-time AQI with PM2.5 / PM10 values
- Color-coded health indicators
- Source labels (Ground / Satellite)
- “No Data” fallback card

### ✅ Map Page
- Interactive Leaflet.js map with AQI-colored pins
- User's location pin drop
- Satellite view toggle (ISRO Bhuvan static overlay)
- Marker popups with pollutant data + source labels

### ✅ Health & Advisory Page
- Personalized risk cards (e.g., “Wear N95”, “Avoid outdoor PE”)
- Indian vs WHO standard toggle
- Rural-specific suggestions (e.g., firewood warnings)
- Source-based confidence message

### ✅ Historical Trends Page
- Recharts line graph with pollutant filters
- Date & location selectors
- Data source labels on chart
- Optional satellite view toggles

---

## 🧱 Tech Stack

### Frontend
- `React.js`, `React Router DOM`
- `Tailwind CSS`, `Recharts`
- `Leaflet.js`, `Axios`

### Backend
- `Node.js`, `Express`
- `.env`, `cors`, `dotenv`

### APIs
- `OpenAQ`, `Open-Meteo`, `OpenWeatherMap`
- `ISRO Bhuvan (Static Tiles)`
- `Nominatim OSM` for reverse geocoding

### Database & Auth
- `Firebase` (Firestore + Auth)

---

## 🧠 Inclusivity Features
- “📍 Use My Location” support
- “No AQI Data” fallback UI
- Labels for AQI Source (Sensor / Satellite / Heuristic)
- Rural-specific health tips
- Multilingual support (in progress)

## Youtube Link
- https://youtu.be/Y1eT8upvbTg?feature=shared