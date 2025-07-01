import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function HistoricalChart({ data, parameter }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-4">
        No data to display. Try changing filters.
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: parameter.toUpperCase(),
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#14b8a6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
