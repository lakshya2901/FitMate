// components/dashboard/CustomerFulfillment.tsx
'use client';

// import { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CustomerFulfillment() {
  const data = [
    { name: 'Week 1', currentMonth: 4000, lastMonth: 2400 },
    { name: 'Week 2', currentMonth: 3000, lastMonth: 1398 },
    { name: 'Week 3', currentMonth: 2000, lastMonth: 9800 },
    { name: 'Week 4', currentMonth: 2780, lastMonth: 3908 },
    { name: 'Week 5', currentMonth: 1890, lastMonth: 4800 },
    { name: 'Week 6', currentMonth: 2390, lastMonth: 3800 },
    { name: 'Week 7', currentMonth: 3490, lastMonth: 4300 }
  ];

  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Customer Fulfillment</h2>
        <p className="text-xs text-gray-400">Fitness plan adherence rates</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 10 }} stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="currentMonth" 
              stroke="#06B6D4" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, fill: '#06B6D4' }}
            />
            <Line 
              type="monotone" 
              dataKey="lastMonth" 
              stroke="#A855F7" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, fill: '#A855F7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
          <span className="text-xs text-gray-300">This Month</span>
          <span className="text-xs font-semibold ml-2">Rs 5,506</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <span className="text-xs text-gray-300">Last Month</span>
          <span className="text-xs font-semibold ml-2">Rs 4,087</span>
        </div>
      </div>
    </div>
  );
}