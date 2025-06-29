import React from 'react';

const WeatherCard = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-200 to-orange-400 p-6 rounded-3xl w-1/2 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-3xl">☀️</span>
        <div className="text-right">
          <div className="text-4xl font-bold">72</div>
          <div className="text-md">MODERATE</div>
        </div>
      </div>
      <div className="text-center text-2xl font-semibold mt-4">CHENNAI</div>
      <div className="flex justify-between mt-6 text-sm">
        <div>🌥 35°</div>
        <div>💧 40%</div>
        <div>💨 15.9 km/h</div>
      </div>
    </div>
  );
};

export default WeatherCard;