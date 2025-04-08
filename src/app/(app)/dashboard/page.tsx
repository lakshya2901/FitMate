// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import SalesOverview from '@/components/dashboard/SalesOverview';
import TopProducts from '@/components/dashboard/TopProducts';
import CustomerFulfillment from '@/components/dashboard/CustomerFulfillment';
import Earnings from '@/components/dashboard/Earnings';
import VisitorInsights from '@/components/dashboard/VisitorInsights';
import FitnessProgress from '@/components/dashboard/FitnessProgress';

import TokenManagement from '@/components/dashboard/TokenManagement';

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div className={`flex-1 transition-all ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-1">FitMate Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mb-6">Monitor fitness progress, manage tokens and track sales</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Top Row - Summary Stats */}
            <div className="lg:col-span-8">
              <SalesOverview />
            </div>
            <div className="lg:col-span-4">
              <FitnessProgress />
            </div>

            {/* Middle Row */}
            <div className="lg:col-span-6">
              <TopProducts />
            </div>
            <div className="lg:col-span-6">
              <CustomerFulfillment />
            </div>

            {/* Bottom Row */}
            <div className="lg:col-span-4">
              <Earnings />
            </div>
            <div className="lg:col-span-4">
              <TokenManagement />
            </div>
            <div className="lg:col-span-4">
              <VisitorInsights />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}