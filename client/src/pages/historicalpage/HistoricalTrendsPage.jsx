import React, { useState } from 'react';
import { fetchHistoricalAQIData } from '../../services/aqiService';
import HistoricalFilters from './HistoricalFilters';
import HistoricalChart from './HistoricalChart';

export default function HistoricalTrendsPage() {
  const [city, setCity] = useState('');
  const [parameter, setParameter] = useState('pm25');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setError('');
    setLoading(true);
    setData([]);

    if (!city.trim() || !fromDate || !toDate) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const results = await fetchHistoricalAQIData(city, parameter, fromDate, toDate);
      const transformed = results
        .map(item => ({
          date: item.date.local.split('T')[0],
          value: item.value
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setData(transformed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-200 p-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <HistoricalFilters
          city={city}
          setCity={setCity}
          parameter={parameter}
          setParameter={setParameter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          onFetch={handleFetch}
          loading={loading}
        />

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

        <HistoricalChart data={data} parameter={parameter} />
      </div>
    </div>
  );
}
