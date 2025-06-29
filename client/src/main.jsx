// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // Tailwind CSS or your global styles

// ✅ Optional .env check (only alert if missing in dev)
if (import.meta.env.DEV && !import.meta.env.VITE_FIREBASE_API_KEY) {
  alert("🔥 .env not loaded! Check your .env file.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
