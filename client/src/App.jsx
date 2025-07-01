import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import MapPage from "./pages/mappage/MapPage";
import HistoricalTrendsPage from './pages/historicalpage/HistoricalTrendsPage';
import Health from "./pages/healthpage/Health"; // ✅ Import Health page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/trends" element={<HistoricalTrendsPage />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </Router>
  );
}

export default App;
