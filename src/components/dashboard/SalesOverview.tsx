// components/dashboard/SalesOverview.tsx
'use client';

import { ShoppingBag, IndianRupee, Users, Package } from 'lucide-react';
import { JSX } from 'react';



interface MetricCardProps {
  title: string;
  value: string;
  percentChange: number;
  icon: JSX.Element;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, percentChange, icon, iconBg }) => {
  const isPositive = percentChange >= 0;
  
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-2xl">{value}</h3>
          <p className="text-xs text-gray-400">{title}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{percentChange}% from yesterday
        </span>
      </div>
    </div>
  );
};

export default function SalesOverview() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: 'Rs 85k',
      percentChange: 15,
      icon: <IndianRupee size={20} className="text-amber-300" />,
      iconBg: 'bg-amber-900/30'
    },
    {
      title: 'Total Orders',
      value: '783',
      percentChange: 8,
      icon: <ShoppingBag size={20} className="text-cyan-300" />,
      iconBg: 'bg-cyan-900/30'
    },
    {
      title: 'Products Sold',
      value: '12',
      percentChange: -2,
      icon: <Package size={20} className="text-purple-300" />,
      iconBg: 'bg-purple-900/30'
    },
    {
      title: 'New Customers',
      value: '45',
      percentChange: 12,
      icon: <Users size={20} className="text-blue-300" />,
      iconBg: 'bg-blue-900/30'
    }
  ];

  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Sales of today</h2>
        <p className="text-xs text-gray-400">Sales Summary</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            percentChange={metric.percentChange}
            icon={metric.icon}
            iconBg={metric.iconBg}
          />
        ))}
      </div>
    </div>
  );
}