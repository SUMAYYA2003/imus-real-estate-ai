'use client';

import React, { useState } from 'react';
import { CinematicIntro } from '@/components/intro/CinematicIntro';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MarketTrendChart } from '@/components/dashboard/MarketTrendChart';
import { AreaYieldChart } from '@/components/dashboard/AreaYieldChart';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Building2, 
  TrendingUp, 
  Calculator, 
  ShieldCheck, 
  ArrowUpRight,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const { formatPrice, formatRate } = useCurrency();

  return (
    <main className="relative min-h-screen w-full bg-[#07060A] text-slate-100 flex">
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      <div
        className={`flex w-full min-h-screen transition-opacity duration-1000 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-[#0F0D1A] via-[#141026] to-[#0A0812] p-8 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                AI DECISION PLATFORM
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Dubai Real Estate Intelligence Suite
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Official Land Department transactions, LightGBM price valuation, and SHAP explainability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium">Median Sales Price</span>
                  <Building2 className="h-4 w-4 text-purple-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {formatPrice(2450000)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>+8.4% vs last quarter</span>
                </div>
              </div>

              <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium">Avg Price / SqFt</span>
                  <Calculator className="h-4 w-4 text-indigo-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {formatRate(1840)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>+4.2% annualized</span>
                </div>
              </div>

              <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium">Gross Yield</span>
                  <TrendingUp className="h-4 w-4 text-amber-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400">7.15%</div>
                <div className="mt-2 text-xs text-slate-400">Tenancy deeds synced</div>
              </div>

              <div className="rounded-xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium">AI Accuracy</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">R² 0.912</div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-purple-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>LightGBM (MAE 6.4%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketTrendChart />
              <AreaYieldChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
