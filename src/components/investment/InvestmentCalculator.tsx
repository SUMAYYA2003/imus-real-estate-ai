'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert
} from 'lucide-react';

export const InvestmentCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(2500000);
  const [expectedRent, setExpectedRent] = useState(175000);
  const [serviceChargePerSqft, setServiceChargePerSqft] = useState(16);
  const [propertySqft, setPropertySqft] = useState(1200);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [capitalGrowthRate, setCapitalGrowthRate] = useState(6.5);

  // Financial calculations
  const grossYield = ((expectedRent / purchasePrice) * 100).toFixed(2);
  const annualServiceCharges = serviceChargePerSqft * propertySqft;
  const managementFee = expectedRent * 0.05;
  const maintenanceReserve = expectedRent * 0.03;
  const totalOperatingCosts = annualServiceCharges + managementFee + maintenanceReserve;
  const netRentalIncome = expectedRent - totalOperatingCosts;
  const netYield = ((netRentalIncome / purchasePrice) * 100).toFixed(2);
  const fiveYearValue = Math.round(purchasePrice * Math.pow(1 + capitalGrowthRate / 100, 5));
  const fiveYearProfit = fiveYearValue - purchasePrice + (netRentalIncome * 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Parameter Sliders & Inputs */}
      <div className="lg:col-span-6 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-purple-900/20">
          <Calculator className="h-4 w-4 text-purple-400" />
          <h2 className="text-sm font-semibold text-white">Investment Assumptions</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Acquisition Price (AED)</label>
            <input
              type="number"
              step="50000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Annual Rent Expected (AED)</label>
              <input
                type="number"
                step="5000"
                value={expectedRent}
                onChange={(e) => setExpectedRent(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Unit Size (SqFt)</label>
              <input
                type="number"
                value={propertySqft}
                onChange={(e) => setPropertySqft(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Service Charge (AED/SqFt)</label>
              <input
                type="number"
                value={serviceChargePerSqft}
                onChange={(e) => setServiceChargePerSqft(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Down Payment %</label>
              <input
                type="number"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Expected Annual Capital Growth (%)</label>
            <input
              type="number"
              step="0.5"
              value={capitalGrowthRate}
              onChange={(e) => setCapitalGrowthRate(Number(e.target.value))}
              className="w-full bg-[#151222] border border-purple-900/30 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-purple-900/20 text-[11px] text-slate-400 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Includes mandatory 4% Dubai Land Department registration fee.</span>
        </div>
      </div>

      {/* Financial Output Dossier */}
      <div className="lg:col-span-6 space-y-6">
        {/* Yield Highlights Card */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-5 shadow-lg">
            <span className="text-xs text-slate-400 block mb-1">Gross Yield</span>
            <div className="text-3xl font-mono font-bold text-white">{grossYield}%</div>
            <span className="text-[11px] text-purple-400 mt-1 block">Before OPEX deductions</span>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 shadow-lg">
            <span className="text-xs text-amber-300 block mb-1">Net Realized Yield</span>
            <div className="text-3xl font-mono font-bold text-amber-400">{netYield}%</div>
            <span className="text-[11px] text-slate-400 mt-1 block">After fees & maintenance</span>
          </div>
        </div>

        {/* Operating Breakdown */}
        <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-6 shadow-xl space-y-3.5">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Annual Cash Flow Waterfall</h3>

          <div className="flex justify-between text-xs py-2 border-b border-purple-950/40">
            <span className="text-slate-400">Gross Rental Collection</span>
            <span className="font-mono text-emerald-400 font-bold">+AED {expectedRent.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between text-xs py-2 border-b border-purple-950/40">
            <span className="text-slate-400">Service Charges ({propertySqft} sqft)</span>
            <span className="font-mono text-rose-400 font-bold">-AED {annualServiceCharges.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between text-xs py-2 border-b border-purple-950/40">
            <span className="text-slate-400">Management & Maintenance Reserve</span>
            <span className="font-mono text-rose-400 font-bold">-AED {Math.round(managementFee + maintenanceReserve).toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between text-xs py-2 pt-3 font-semibold">
            <span className="text-white">Annual Net Cash Flow</span>
            <span className="font-mono text-amber-400 font-bold text-sm">AED {Math.round(netRentalIncome).toLocaleString('en-US')}</span>
          </div>
        </div>

        {/* 5-Year Horizon Projection */}
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#120F24] to-[#0A0814] p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-purple-300">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              5-Year Horizon Return
            </span>
            <span className="font-mono">CAGR {capitalGrowthRate}%</span>
          </div>

          <div className="text-2xl lg:text-3xl font-bold font-mono text-white">
            AED {fiveYearValue.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-slate-400">
            Projected Asset Value in Year 5 with cumulative profit of <span className="text-emerald-400 font-mono font-bold">+AED {fiveYearProfit.toLocaleString('en-US')}</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
