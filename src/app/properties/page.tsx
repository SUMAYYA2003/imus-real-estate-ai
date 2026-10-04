'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PropertyExplorer } from '@/components/properties/PropertyExplorer';
import { Search } from 'lucide-react';

export default function PropertiesPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#07060A] text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-2">
              <Search className="h-3.5 w-3.5 text-amber-400" />
              DATABASE EXPLORER
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Property & Transaction Intelligence Explorer
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Browse historical deed transactions and compare actual prices with machine-learning valuations.
            </p>
          </div>

          <PropertyExplorer />
        </div>
      </div>
    </main>
  );
}
