'use client';
import React, { useState, useEffect } from 'react';
import { SignalFeed } from '../components/SignalFeed';
import { TradeTracker } from '../components/TradeTracker';
import { TradingChart } from '../components/TradingChart';

export default function Dashboard() {
  const [signals, setSignals] = useState([]);
  const [mockData, setMockData] = useState([
    { time: '2025-06-25', open: 1.0900, high: 1.1000, low: 1.0850, close: 1.0950 },
    { time: '2025-06-26', open: 1.0950, high: 1.1050, low: 1.0900, close: 1.1020 },
    { time: '2025-06-27', open: 1.1020, high: 1.1060, low: 1.0980, close: 1.1040 },
  ]);

  useEffect(() => {
    // Fetch signals from API
    const fetchSignals = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/signals/');
        const data = await res.json();
        setSignals(data);
      } catch (e) {
        console.error("API unreachable, showing empty feed");
      }
    };
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6">
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">INSTITUTIONAL CRT <span className="text-blue-500">PLATFORM</span></h1>
          <p className="text-gray-500 text-sm">Powered by Romeotpt Methodology</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-900 px-4 py-2 rounded border border-gray-800">
            <span className="text-xs block text-gray-500 uppercase">Server Status</span>
            <span className="text-green-500 font-bold text-sm">● LIVE</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 h-[500px]">
             <TradingChart data={mockData} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-900 p-4 rounded border border-gray-800">
                <span className="text-gray-500 text-xs uppercase">Win Rate</span>
                <p className="text-2xl font-bold text-white">68.4%</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-800">
                <span className="text-gray-500 text-xs uppercase">Profit Factor</span>
                <p className="text-2xl font-bold text-white">2.41</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-800">
                <span className="text-gray-500 text-xs uppercase">Avg R/R</span>
                <p className="text-2xl font-bold text-white">1:3.5</p>
            </div>
          </div>
        </div>

        {/* Sidebar Feed & Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <TradeTracker />
          <SignalFeed signals={signals} />
        </div>
      </div>
    </main>
  );
}
