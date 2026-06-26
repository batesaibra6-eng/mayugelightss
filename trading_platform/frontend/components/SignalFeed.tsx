import React from 'react';

interface Signal {
  id: number;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry_price: string;
  sl: string;
  tp1: string;
  confidence_score: number;
  setup_type: string;
  status: string;
  timestamp: string;
}

export const SignalFeed = ({ signals }: { signals: Signal[] }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Live Institutional Signals</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {signals.map((signal) => (
          <div key={signal.id} className="p-3 border border-gray-800 rounded bg-gray-950 hover:bg-gray-800 transition">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-lg font-bold">{signal.pair}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${signal.direction === 'BUY' ? 'bg-green-600' : 'bg-red-600'}`}>
                {signal.direction}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <div>Entry: <span className="text-white">{signal.entry_price}</span></div>
              <div>SL: <span className="text-red-400">{signal.sl}</span></div>
              <div>TP: <span className="text-green-400">{signal.tp1}</span></div>
              <div>Score: <span className="text-yellow-400">{signal.confidence_score}%</span></div>
            </div>
            <div className="mt-2 text-xs text-blue-400">{signal.setup_type}</div>
          </div>
        ))}
        {signals.length === 0 && <p className="text-gray-500 italic text-center">Waiting for institutional setups...</p>}
      </div>
    </div>
  );
};
