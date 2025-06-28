import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // Tailwind or your global styles

// 🔍 Testing .env variables
console.log("🔥 FIREBASE KEY:", import.meta.env.REACT_APP_FIREBASE_API_KEY);
console.log("🌐 BASE URL:", import.meta.env.REACT_APP_BASE_URL);
if (!import.meta.env.REACT_APP_FIREBASE_API_KEY) {
  alert("🔥 .env not loaded!");
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
