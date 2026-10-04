'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MarketTrendChart } from '@/components/dashboard/MarketTrendChart';
import { AreaYieldChart } from '@/components/dashboard/AreaYieldChart';
import { TrendingUp, Activity, BarChart3, ArrowUpRight } from 'lucide-react';

export default function MarketPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#07060A] text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
              MACRO MARKET TRENDS
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Dubai Real Estate Macro Intelligence
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Time-series tracking of average transaction rates, transaction velocities, and community yield distributions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs">Annual Transaction Volume</span>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">124,580 Units</div>
              <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3.5 w-3.5" /> +21.4% YoY Growth
              </span>
            </div>

            <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs">Prime Off-Plan Share</span>
                <BarChart3 className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400">58.2%</div>
              <span className="text-xs text-slate-400 mt-1 block">Of all Q3 sales volume</span>
            </div>

            <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs">Median Days on Market</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">22 Days</div>
              <span className="text-xs text-slate-400 mt-1 block">High liquidity velocity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketTrendChart />
            <AreaYieldChart />
          </div>
        </div>
      </div>
    </main>
  );
}
