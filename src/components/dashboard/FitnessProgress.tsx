// components/dashboard/FitnessProgress.tsx
'use client';

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

export default function FitnessProgress() {
  const data = [
    { name: 'Mon', volume: 40, service: 24 },
    { name: 'Tue', volume: 30, service: 13 },
    { name: 'Wed', volume: 20, service: 38 },
    { name: 'Thu', volume: 27, service: 39 },
    { name: 'Fri', volume: 18, service: 48 },
    { name: 'Sat', volume: 23, service: 38 },
    { name: 'Sun', volume: 34, service: 43 }
  ];

  const activeIndex = 3; // Thursday is active

  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Plan Adherence</h2>
        <p className="text-xs text-gray-400">Weekly fitness plan completion rates</p>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
            />
            <Bar 
              dataKey="volume" 
              fill="#06B6D4" 
              radius={[4, 4, 0, 0]} 
              barSize={12}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === activeIndex ? '#06B6D4' : '#0E7490'} 
                  opacity={index === activeIndex ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
          <span className="text-xs text-gray-300">Workout Volume</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-cyan-800 mr-2"></div>
          <span className="text-xs text-gray-300">Service Usage</span>
        </div>
      </div>
      
      <div className="mt-4 text-center bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 rounded-lg p-2">
        <p className="text-xs text-gray-300">Average completion rate</p>
        <p className="text-lg font-bold text-cyan-400">84%</p>
      </div>
    </div>
  );
}