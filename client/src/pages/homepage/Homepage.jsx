import React from 'react';
import WeatherCard from '../homepage/Weathercard'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-sky-400 p-4">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search City"
          className="w-full mb-4 p-3 rounded-full text-xl bg-teal-700 text-black placeholder-black"
        />
        <div className="flex gap-4">
          <WeatherCard />
          <div className="flex flex-col gap-4">
            <button className="bg-teal-700 px-6 py-3 rounded-xl text-white">View on Map</button>
            <button className="bg-teal-700 px-6 py-3 rounded-xl text-white">View Forecast</button>
            <button className="bg-teal-700 px-6 py-3 rounded-xl text-white flex justify-between items-center">
              View in Map <span className="ml-4">➝</span>
            </button>
            <div className="bg-teal-700 text-white p-4 rounded-xl text-center">
              some health notes
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-6 text-3xl">
          <span className="text-lime-400">★</span>
          <span className="text-yellow-400">★</span>
          <span className="text-orange-400">★</span>
          <span className="text-red-500">★</span>
          <span className="text-purple-400">★</span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;