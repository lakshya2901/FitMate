// components/dashboard/VisitorInsights.tsx
'use client';

// import { useEffect, useRef } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function VisitorInsights() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1000 },
    { name: 'Aug', value: 1200 },
    { name: 'Sep', value: 800 },
    { name: 'Oct', value: 900 },
    { name: 'Nov', value: 700 },
    { name: 'Dec', value: 500 }
  ];

  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Visitor Insights</h2>
          <p className="text-xs text-gray-400">App and Web Traffic</p>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 mr-1"></div>
          <span className="text-xs text-gray-400">New Visitors</span>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }} 
              stroke="#6B7280" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
              formatter={(value: number) => [`${value} visits`, 'Visitors']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              dot={false}
              activeDot={{ r: 6, fill: '#06B6D4' }}
              stroke="#06B6D4" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 p-2 bg-cyan-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-300">
            Current month visitors: <span className="font-bold text-cyan-400">+27%</span>
          </div>
          <div className="text-xs text-gray-400">compared to last month</div>
        </div>
      </div>
    </div>
  );
}