# 🌱 Prāṇa Swarakṣā – We Protect Your Breath

**Prāṇa Swarakṣā** is an intelligent air quality visualization and forecasting platform designed especially for underserved rural and health-vulnerable regions in India. It bridges the urban–rural AQI divide using satellite data, weather intelligence, and community participation — turning raw pollution data into actionable, localized alerts for farmers, schools, health workers, and everyday citizens.

---

## 🌍 Why Prāṇa Swarakṣā?

> “Apps only care about big cities. My village is invisible.”

Unlike typical AQI apps that only serve metro areas, **Prāṇa Swarakṣā** brings air quality insight to everyone — even in sensor deserts — with transparency, multilingual access, and role-based UX.

---

## 🔑 Key Features

### 📡 AQI Estimation & Access
- Multi-source AQI: Sensor + Satellite + Weather
- Sensor desert detection map
- Confidence scores & AQI source labels
- Offline support + SMS fallback

### 🩺 Health & Forecasting
- Personalized health risk alerts (age, conditions, occupation)
- Smart mask recommendations (N95/cloth/surgical)
- Explainable 3-day AQI forecasts
- Hospital visit delay advisor

### 🌾 Rural & Farmer Tools
- Agri spray timing alerts
- Pollinator (bee) safety alerts
- SMS tips for low-data users
- Crop yield risk warnings

### 🧑‍🤝‍🧑 Inclusive UX & Community
- Dashboards for Farmers, Schools, NGOs, Urban Users
- Multilingual interface (Hindi, Tamil, etc.)
- Emoji-based AQI reporting
- Shareable AQI cards, NGO data exports

---

## 🖼️ UI & UX Overview

- **Role-based onboarding**: Users select their role to personalize experience
- **Map-based AQI visuals**: Color-coded zones with source explanations
- **Health widgets**: Daily risk, mask tip, and hospital alerts
- **Farmer dashboard**: Spray timing, wind conditions, rainfall overlay

---

## 🏗️ Tech Stack

| Layer        | Tech Used                         |
|--------------|-----------------------------------|
| Frontend     | React + Tailwind (Vite setup)     |
| Backend      | Node.js + Express (API Layer)     |
| Data Sources | Satellite APIs, OpenAQ, Weather   |
| Maps         | Leaflet.js / Mapbox               |
| Storage      | Firebase / JSON server (prototype)|
| Offline/SMS  | Twilio / Mocked fallback layer    |



