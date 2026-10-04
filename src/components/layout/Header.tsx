'use client';

import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-purple-900/20 bg-[#07060A]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>Autonomous Real Estate Intelligence</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Market Status Beacon */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[11px]">DLD REGISTRY SYNCED</span>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-[#0F0D17] border border-purple-900/30 rounded-lg p-0.5 text-xs font-mono">
          <button className="px-2.5 py-1 rounded-md bg-purple-600/30 text-purple-200 border border-purple-500/30">
            AED
          </button>
          <button className="px-2.5 py-1 rounded-md text-slate-400 hover:text-slate-200">
            USD
          </button>
        </div>

        {/* Alert Notification */}
        <button 
          aria-label="View system notifications"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-purple-950/20 border border-purple-900/20 transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
