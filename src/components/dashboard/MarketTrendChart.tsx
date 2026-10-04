'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const trendData = [
  { quarter: 'Q1 2024', avgPriceSqft: 1420, volume: 18400 },
  { quarter: 'Q2 2024', avgPriceSqft: 1510, volume: 21200 },
  { quarter: 'Q3 2024', avgPriceSqft: 1590, volume: 19800 },
  { quarter: 'Q4 2024', avgPriceSqft: 1680, volume: 24500 },
  { quarter: 'Q1 2025', avgPriceSqft: 1740, volume: 26100 },
  { quarter: 'Q2 2025', avgPriceSqft: 1810, volume: 28900 },
  { quarter: 'Q3 2025', avgPriceSqft: 1840, volume: 27400 },
  { quarter: 'Q4 2025', avgPriceSqft: 1920, volume: 31200 },
];

export const MarketTrendChart: React.FC = () => {
  return (
    <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Market Velocity & Price per SqFt Trend
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Historical transaction growth across Dubai residential sector (2024–2025)
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            AED / SqFt
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#231F33" vertical={false} />
            <XAxis
              dataKey="quarter"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#120F1F',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#F1F5F9',
              }}
              formatter={(value: any) => [`AED ${value}`, 'Avg Price / SqFt']}
            />
            <Area
              type="monotone"
              dataKey="avgPriceSqft"
              stroke="#A855F7"
              strokeWidth={2.5}
              fill="url(#purpleGlow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
