import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// src/App.jsx
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-4">Tailwind CSS is Working! 🎉</h1>
      <p className="text-lg mb-6">You can now start building your app using Tailwind.</p>
      <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
        Let's Build 🚀
      </button>
    </div>
  );
}

export default App;

