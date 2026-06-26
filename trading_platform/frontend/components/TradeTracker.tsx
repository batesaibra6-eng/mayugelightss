'use client';
import React, { useState } from 'react';

export const TradeTracker = () => {
  const [balance, setBalance] = useState('1000');
  const [lotSize, setLotSize] = useState('0.1');

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Active Trade Tracker</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Balance ($)</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Lot Size</label>
          <input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
      <div className="bg-gray-950 p-4 rounded border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Floating P/L</span>
          <span className="text-2xl font-bold text-green-400">+$0.00</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Risk %</span>
            <span>1.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Target R/R</span>
            <span>1:3.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
