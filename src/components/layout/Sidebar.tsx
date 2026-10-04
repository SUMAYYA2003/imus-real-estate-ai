'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Search, 
  BrainCircuit, 
  MapPin, 
  TrendingUp, 
  FlaskConical, 
  Scale, 
  Layers
} from 'lucide-react';

const navigationItems = [
  { name: 'Executive Overview', href: '/', icon: BarChart3 },
  { name: 'Market Intelligence', href: '/market', icon: TrendingUp },
  { name: 'Property Explorer', href: '/properties', icon: Search },
  { name: 'AI Valuation & SHAP', href: '/valuation', icon: BrainCircuit },
  { name: 'Map Intelligence', href: '/map', icon: MapPin },
  { name: 'Investment Analysis', href: '/investment', icon: Scale },
  { name: 'Data Science Lab', href: '/data-lab', icon: FlaskConical },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-purple-900/20 bg-[#0A0812]/90 backdrop-blur-xl flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand identity header */}
        <div className="h-16 flex items-center px-6 border-b border-purple-900/20 gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-[1.5px] shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07060A] text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-amber-200">
              IMUS
            </div>
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-100 block">IMUS REALTY</span>
            <span className="text-[10px] font-medium tracking-tight text-purple-400/80 block">AI & DATA LAB</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5">
          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Intelligence Modules
          </span>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-950/40 text-purple-200 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/20 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer telemetry */}
      <div className="p-4 border-t border-purple-900/20 bg-black/20">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span className="flex items-center gap-1.5">
            <Layers className="h-3 w-3 text-purple-400" />
            Model Version
          </span>
          <span className="text-amber-400 font-mono text-[10px]">v1.4.0-DLD</span>
        </div>
        <div className="text-[10px] text-slate-500">
          Trained on official Dubai transactions.
        </div>
      </div>
    </aside>
  );
};
