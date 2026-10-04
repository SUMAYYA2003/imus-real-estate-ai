'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Calculator, 
  Activity,
  Compass
} from 'lucide-react';

interface ZoneData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  avgPriceSqft: number;
  medianPrice: number;
  grossYield: number;
  volumeQ3: number;
  yoyGrowth: number;
  tier: 'Ultra Luxury' | 'Prime' | 'High Yield';
  description: string;
}

const dubaiZones: ZoneData[] = [
  {
    id: 'marina',
    name: 'Dubai Marina',
    lat: 25.0805,
    lng: 55.1403,
    avgPriceSqft: 2100,
    medianPrice: 2450000,
    grossYield: 6.9,
    volumeQ3: 4210,
    yoyGrowth: 9.4,
    tier: 'Prime',
    description: 'High-density waterfront corridor with strong international rental demand.',
  },
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    lat: 25.1972,
    lng: 55.2744,
    avgPriceSqft: 3200,
    medianPrice: 3850000,
    grossYield: 5.6,
    volumeQ3: 3180,
    yoyGrowth: 12.1,
    tier: 'Ultra Luxury',
    description: 'Flagship commercial and residential core anchored around Burj Khalifa.',
  },
  {
    id: 'palm',
    name: 'Palm Jumeirah',
    lat: 25.1124,
    lng: 55.1390,
    avgPriceSqft: 4600,
    medianPrice: 8900000,
    grossYield: 5.1,
    volumeQ3: 1420,
    yoyGrowth: 15.8,
    tier: 'Ultra Luxury',
    description: 'Global benchmark for beachfront luxury villas and branded penthouses.',
  },
  {
    id: 'businessbay',
    name: 'Business Bay',
    lat: 25.1857,
    lng: 55.2638,
    avgPriceSqft: 2050,
    medianPrice: 1950000,
    grossYield: 7.4,
    volumeQ3: 5340,
    yoyGrowth: 8.7,
    tier: 'Prime',
    description: 'Rapidly appreciating financial and lifestyle canal district.',
  },
  {
    id: 'jvc',
    name: 'Jumeirah Village Circle (JVC)',
    lat: 25.0601,
    lng: 55.2081,
    avgPriceSqft: 1250,
    medianPrice: 950000,
    grossYield: 8.8,
    volumeQ3: 6120,
    yoyGrowth: 11.2,
    tier: 'High Yield',
    description: 'Top-performing suburban investment hub delivering leading net yields.',
  },
];

export const MapIntelligence: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneData>(dubaiZones[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Interactive Map Viewport */}
      <div className="lg:col-span-8 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[500px]">
        {/* Header Controls */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-purple-900/20">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-white">Geospatial Registry Heatmap</span>
          </div>
          <span className="text-[11px] font-mono text-purple-400">EPSG:4326 Dubai Grid</span>
        </div>

        {/* Spatial Canvas */}
        <div className="relative flex-1 my-4 rounded-xl border border-purple-950/50 bg-[#090710] overflow-hidden flex flex-col items-center justify-center p-8">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute h-72 w-72 rounded-full border border-purple-500/10 pointer-events-none animate-ping opacity-25" />
          <div className="absolute h-96 w-96 rounded-full border border-purple-500/10 pointer-events-none" />

          {/* Interactive Hub Buttons */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
            {dubaiZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-4 py-3 rounded-xl border text-xs font-medium transition-all duration-200 flex flex-col items-start gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] scale-102'
                      : 'bg-[#141124]/90 border-purple-900/40 text-slate-300 hover:border-purple-500/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full justify-between">
                    <span className="font-semibold truncate">{zone.name}</span>
                    <MapPin className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-purple-400'}`} />
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                    AED {zone.avgPriceSqft.toLocaleString('en-US')}/sqft
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-500">
            Lat: {selectedZone.lat.toFixed(4)} | Long: {selectedZone.lng.toFixed(4)}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-purple-900/20">
          <span>Active Layer: DLD Transaction Density</span>
          <span className="text-amber-400 font-mono text-[11px]">{selectedZone.tier} Corridor</span>
        </div>
      </div>

      {/* Selected Micro-Market Intelligence Panel */}
      <div className="lg:col-span-4 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/80 p-6 shadow-xl flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/20">
              {selectedZone.tier}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">{selectedZone.name}</h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedZone.description}</p>
          </div>

          <div className="space-y-3.5">
            <div className="p-4 rounded-xl border border-purple-900/30 bg-[#141124]">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Avg Price / SqFt</span>
                <Calculator className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                AED {selectedZone.avgPriceSqft.toLocaleString('en-US')}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-900/30 bg-[#141124]">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Median Sales Price</span>
                <Building2 className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                AED {selectedZone.medianPrice.toLocaleString('en-US')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-950/10">
                <span className="text-[10px] text-slate-400 block mb-1">Rental Yield</span>
                <span className="text-lg font-bold font-mono text-amber-400">{selectedZone.grossYield}%</span>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
                <span className="text-[10px] text-slate-400 block mb-1">YoY Growth</span>
                <span className="text-lg font-bold font-mono text-emerald-400">+{selectedZone.yoyGrowth}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-purple-900/20 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-purple-400" />
            Q3 Deeds Volume
          </span>
          <span className="font-mono text-white font-semibold">{selectedZone.volumeQ3.toLocaleString('en-US')} units</span>
        </div>
      </div>
    </div>
  );
};
