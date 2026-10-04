'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  Info,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface ShapFactor {
  feature: string;
  impactValue: number;
  direction: 'up' | 'down';
  description: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const ValuationSandbox: React.FC = () => {
  const [area, setArea] = useState('Dubai Marina');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [sizeSqft, setSizeSqft] = useState(1250);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [ageYears, setAgeYears] = useState(4);
  const { formatPrice } = useCurrency();

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [prediction, setPrediction] = useState<{
    estimatedValue: number;
    baseValue: number;
    rangeLow: number;
    rangeHigh: number;
    reconciliationDiff: number;
    shapFactors: ShapFactor[];
  } | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          community: area,
          sqft: sizeSqft,
          beds: bedrooms,
          baths: bathrooms,
          age: ageYears,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction from FastAPI backend');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error('Error connecting to ML backend:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/80 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Property Parameters</h2>
            <p className="text-xs text-slate-400">LightGBM Regressor v1.4 & TreeSHAP</p>
          </div>
        </div>

        <form onSubmit={handlePredict} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1.5 block">Micro-Market / Community</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="Dubai Marina">Dubai Marina</option>
              <option value="Downtown">Downtown Dubai</option>
              <option value="Palm Jumeirah">Palm Jumeirah</option>
              <option value="Business Bay">Business Bay</option>
              <option value="JVC">Jumeirah Village Circle (JVC)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1.5 block">Property Typology</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-1.5 block">Built-up Area (SqFt)</label>
              <input
                type="number"
                value={sizeSqft}
                onChange={(e) => setSizeSqft(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1.5 block">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-1.5 block">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 mb-1.5 block">Building Age (Years)</label>
              <input
                type="number"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="w-full bg-[#151222] border border-purple-900/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Computing TreeSHAP Values...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Execute Live Model Inference</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        {prediction ? (
          <>
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#120F22] to-[#0A0814] p-6 shadow-2xl relative overflow-hidden space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Live ML Inference Successful
                </span>
                <span className="font-mono text-slate-400">Synthetic Research Dataset</span>
              </div>

              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-tight">
                {formatPrice(prediction.estimatedValue)}
              </div>

              <div className="text-xs text-slate-400 font-mono pt-1 flex items-center justify-between">
                <span>Prediction Interval: {formatPrice(prediction.rangeLow)} – {formatPrice(prediction.rangeHigh)}</span>
                <span className="text-purple-400 text-[10px]">Reconciliation Delta: {prediction.reconciliationDiff}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/80 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">Explainable AI (TreeSHAP Attributions)</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Exact Shapley Breakdown</span>
              </div>

              {/* Base Value Display */}
              <div className="p-3.5 rounded-xl border border-purple-900/30 bg-[#151222] flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Model Expected Base Value</span>
                <span className="font-mono text-xs text-white font-bold">{formatPrice(prediction.baseValue)}</span>
              </div>

              <div className="space-y-2.5">
                {prediction.shapFactors.map((factor) => {
                  const isUp = factor.direction === 'up';
                  return (
                    <div
                      key={factor.feature}
                      className="p-3.5 rounded-xl border border-purple-950/40 bg-[#141124]/60 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1.5 rounded-md mt-0.5 ${
                            isUp ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {isUp ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-200">{factor.feature}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{factor.description}</div>
                        </div>
                      </div>

                      <div
                        className={`font-mono text-xs font-bold shrink-0 ${
                          isUp ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isUp ? '+' : ''}{formatPrice(Math.abs(factor.impactValue))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-purple-950/40 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <HelpCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span>Base Value + Feature Contributions = Predicted Valuation (mathematically reconciled)</span>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full rounded-2xl border border-dashed border-purple-900/30 bg-[#0E0C17]/40 p-8 flex flex-col items-center justify-center text-center min-h-[380px]">
            <Info className="h-8 w-8 text-purple-400/60 mb-3" />
            <h3 className="text-sm font-medium text-slate-200 mb-1">TreeSHAP Engine Ready</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Execute live model inference to compute exact Shapley feature attributions and data-driven prediction intervals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
