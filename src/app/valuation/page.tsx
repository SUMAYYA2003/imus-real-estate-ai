'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ValuationSandbox } from '@/components/valuation/ValuationSandbox';
import { Sparkles } from 'lucide-react';

export default function ValuationPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#07060A] text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              MACHINE LEARNING INFERENCE
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI Property Valuation & Explainability Lab
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Test predictive pricing scenarios with transparent feature-level SHAP mathematical breakdowns.
            </p>
          </div>

          <ValuationSandbox />
        </div>
      </div>
    </main>
  );
}
