'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const areaData = [
  { area: 'JVC', yieldRate: 8.8, avgPrice: 1250 },
  { area: 'Business Bay', yieldRate: 7.4, avgPrice: 2100 },
  { area: 'Dubai Marina', yieldRate: 6.9, avgPrice: 2350 },
  { area: 'Downtown', yieldRate: 5.6, avgPrice: 3200 },
  { area: 'Palm Jumeirah', yieldRate: 5.1, avgPrice: 4600 },
];

export const AreaYieldChart: React.FC = () => {
  return (
    <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Top Communities: Rental Yield Performance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Average gross rental yield percentage by key sub-market
          </p>
        </div>
        <div className="text-[11px] font-mono text-amber-400">
          Ranked by ROI
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#231F33" vertical={false} />
            <XAxis
              dataKey="area"
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
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#120F1F',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#F1F5F9',
              }}
              formatter={(value: any) => [`${value}%`, 'Gross Yield']}
            />
            <Bar dataKey="yieldRate" fill="#F59E0B" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
