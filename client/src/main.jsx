// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // Tailwind CSS or your global styles

// ✅ Show .env logs only during development
if (import.meta.env.DEV) {
  console.log("🔥 FIREBASE KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
  console.log("🌐 BASE URL:", import.meta.env.VITE_BASE_URL);
  console.log("✅ Env loaded?", import.meta.env);

  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    alert("🔥 .env not loaded! Check your .env file.");
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
