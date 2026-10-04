'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  X, 
  TrendingUp, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface PropertyItem {
  id: string;
  title: string;
  community: string;
  type: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  status: 'Off-Plan' | 'Ready Secondary';
  yieldEst: number;
  mlValuation: number;
  priceDelta: number;
}

const mockProperties: PropertyItem[] = [
  {
    id: 'DXB-101',
    title: 'Marina Gate Tower 1',
    community: 'Dubai Marina',
    type: 'Apartment',
    price: 2650000,
    sqft: 1240,
    beds: 2,
    baths: 2,
    status: 'Ready Secondary',
    yieldEst: 7.2,
    mlValuation: 2710000,
    priceDelta: -2.2,
  },
  {
    id: 'DXB-102',
    title: 'The Address Residences Sky View',
    community: 'Downtown',
    type: 'Apartment',
    price: 4850000,
    sqft: 1520,
    beds: 2,
    baths: 3,
    status: 'Ready Secondary',
    yieldEst: 5.9,
    mlValuation: 4920000,
    priceDelta: -1.4,
  },
  {
    id: 'DXB-103',
    title: 'One Palm by Omniyat',
    community: 'Palm Jumeirah',
    type: 'Penthouse',
    price: 18500000,
    sqft: 4200,
    beds: 4,
    baths: 5,
    status: 'Ready Secondary',
    yieldEst: 5.1,
    mlValuation: 18200000,
    priceDelta: 1.6,
  },
  {
    id: 'DXB-104',
    title: 'Peninsula Four',
    community: 'Business Bay',
    type: 'Apartment',
    price: 1890000,
    sqft: 940,
    beds: 1,
    baths: 2,
    status: 'Off-Plan',
    yieldEst: 7.8,
    mlValuation: 1950000,
    priceDelta: -3.1,
  },
  {
    id: 'DXB-105',
    title: 'Binghatti Onyx',
    community: 'JVC',
    type: 'Apartment',
    price: 920000,
    sqft: 780,
    beds: 1,
    baths: 1,
    status: 'Off-Plan',
    yieldEst: 8.9,
    mlValuation: 940000,
    priceDelta: -2.1,
  },
  {
    id: 'DXB-106',
    title: 'Cayan Tower (Infinity)',
    community: 'Dubai Marina',
    type: 'Apartment',
    price: 3400000,
    sqft: 1680,
    beds: 3,
    baths: 3,
    status: 'Ready Secondary',
    yieldEst: 6.8,
    mlValuation: 3350000,
    priceDelta: 1.5,
  }
];

export const PropertyExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [activeProperty, setActiveProperty] = useState<PropertyItem | null>(null);
  const { formatPrice, formatRate } = useCurrency();

  const filteredProperties = mockProperties.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.community.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommunity = selectedCommunity === 'All' || item.community === selectedCommunity;
    return matchesSearch && matchesCommunity;
  });

  return (
    <div className="relative space-y-6">
      <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/80 p-5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
          <input
            type="text"
            placeholder="Search tower, project, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#151222] border border-purple-900/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-amber-400 shrink-0" />
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="w-full md:w-auto bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Communities</option>
            <option value="Dubai Marina">Dubai Marina</option>
            <option value="Downtown">Downtown Dubai</option>
            <option value="Palm Jumeirah">Palm Jumeirah</option>
            <option value="Business Bay">Business Bay</option>
            <option value="JVC">JVC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProperties.map((prop) => {
          const pricePerSqft = Math.round(prop.price / prop.sqft);
          return (
            <div
              key={prop.id}
              onClick={() => setActiveProperty(prop)}
              className="rounded-2xl border border-purple-900/20 hover:border-purple-500/40 bg-[#0E0C17]/90 hover:bg-[#120F1F] p-6 shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300">
                    {prop.status}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                    <TrendingUp className="h-3 w-3" />
                    <span>{prop.yieldEst}% Yield</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {prop.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                  <span>{prop.community}</span>
                </div>

                <div className="my-5 py-4 border-y border-purple-950/40 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-purple-400" />
                    <span>{prop.beds} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-purple-400" />
                    <span>{prop.baths} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="h-4 w-4 text-purple-400" />
                    <span>{prop.sqft.toLocaleString('en-US')} sqft</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Transaction Price</span>
                    <span className="text-xl font-bold font-mono text-white">
                      {formatPrice(prop.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Rate</span>
                    <span className="text-xs font-mono text-slate-300">
                      {formatRate(pricePerSqft)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/20 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-purple-400">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    ML Valuation
                  </span>
                  <span className="font-mono text-slate-200">
                    {formatPrice(prop.mlValuation)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeProperty && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0E0C17] border-l border-purple-500/30 h-full p-8 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">ID: {activeProperty.id}</span>
                <button
                  onClick={() => setActiveProperty(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-950/40"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{activeProperty.title}</h2>
                <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                  <span>{activeProperty.community} • {activeProperty.type}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-900/30 bg-[#141124] space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Verified Registry Record
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Deed Price:</span>
                  <span className="font-mono text-white font-bold">{formatPrice(activeProperty.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Price per SqFt:</span>
                  <span className="font-mono text-slate-200">{formatRate(Math.round(activeProperty.price / activeProperty.sqft))}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  Model Intelligence Estimate
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">AI Valuation:</span>
                  <span className="font-mono text-amber-300 font-bold">{formatPrice(activeProperty.mlValuation)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Model Spread vs Listing:</span>
                  <span className={`font-mono font-bold ${activeProperty.priceDelta < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {activeProperty.priceDelta}% (Under Market Value)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveProperty(null)}
              className="w-full mt-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition-all"
            >
              Close Intelligence View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
