// components/dashboard/Earnings.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Earnings() {
  const [progressValue, setProgressValue] = useState(0);
  const targetValue = 80; // target percentage
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(targetValue);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const calculateStrokeDashoffset = (percentage: number) => {
    // Circle circumference = 2πr = 2 * π * 70 = 439.82
    const circumference = 2 * Math.PI * 70;
    return circumference - (circumference * percentage) / 100;
  };
  
  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg h-full">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Earnings</h2>
        <p className="text-xs text-gray-400">Total Revenue</p>
      </div>
      
      <div className="text-3xl font-bold text-cyan-400 mt-4">
        Rs 60,078.76
      </div>
      <div className="text-xs text-green-400 mt-1">
        Profit is 48% More than last Month
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Background circle */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="#334155"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Progress circle with animation */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={calculateStrokeDashoffset(progressValue)}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            
            {/* Percentage text */}
            <text
              x="90"
              y="90"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="28"
              fontWeight="bold"
              fill="white"
            >
              {progressValue}%
            </text>
            <text
              x="90"
              y="112"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="12"
              fill="#94A3B8"
            >
              completion
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}