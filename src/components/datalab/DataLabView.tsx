'use client';

import React from 'react';
import { 
  FlaskConical, 
  Cpu, 
  GitBranch, 
  CheckCircle2, 
  Layers, 
  BarChart2, 
  Database,
  Sliders
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const featureImportanceData = [
  { feature: 'Built-up Area (SqFt)', weight: 34.2 },
  { feature: 'Micro-Market Tier', weight: 26.8 },
  { feature: 'Proximity to Metro (km)', weight: 14.5 },
  { feature: 'Historical Sub-market Yield', weight: 11.3 },
  { feature: 'Property Age (Years)', weight: 8.1 },
  { feature: 'Bedroom Count', weight: 5.1 },
];

const modelsRegistry = [
  {
    name: 'LightGBM-Dubai-v1.4',
    type: 'Gradient Boosted Trees',
    r2: '0.912',
    mae: 'AED 42,100',
    rmse: 'AED 61,400',
    status: 'Active Production',
    latency: '18ms',
  },
  {
    name: 'CatBoost-Hedonic-v1.1',
    type: 'Categorical Gradient Boosting',
    r2: '0.898',
    mae: 'AED 47,800',
    rmse: 'AED 68,200',
    status: 'Shadow Mode',
    latency: '32ms',
  },
  {
    name: 'XGBoost-YieldRegressor-v2.0',
    type: 'Extreme Gradient Boosting',
    r2: '0.884',
    mae: 'AED 51,200',
    rmse: 'AED 74,900',
    status: 'Staging Validation',
    latency: '24ms',
  },
];

export const DataLabView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Pipeline Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Training Dataset Scope</span>
            <Database className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">418,290 Deeds</div>
          <p className="text-[11px] text-slate-400 mt-1">Verified DLD historical transactions</p>
        </div>

        <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Feature Pipeline</span>
            <Sliders className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">28 Engineered</div>
          <p className="text-[11px] text-slate-400 mt-1">Target encoded with $m$-estimate smoothing</p>
        </div>

        <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Inference Latency</span>
            <Cpu className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">18 ms</div>
          <p className="text-[11px] text-slate-400 mt-1">Quantized ONNX runtime execution</p>
        </div>
      </div>

      {/* Feature Importance & Model Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global SHAP Feature Weights */}
        <div className="lg:col-span-6 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Global Feature Importance (TreeSHAP)</h2>
              <p className="text-xs text-slate-400 mt-1">Relative gain contribution across all tree splits</p>
            </div>
            <span className="text-[11px] font-mono text-amber-400">% Contribution</span>
          </div>

          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureImportanceData}
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#231F33" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="feature" type="category" stroke="#94A3B8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#120F1F',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F1F5F9',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Importance Weight']}
                />
                <Bar dataKey="weight" fill="#A855F7" radius={[0, 6, 6, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Architecture & Governance */}
        <div className="lg:col-span-6 rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-4 w-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">Active Model Architecture Spec</h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-purple-900/30 bg-[#141124] flex justify-between">
                <span className="text-slate-400">Objective Function</span>
                <span className="text-purple-300">regression_l1 (MAE Robust)</span>
              </div>
              <div className="p-3.5 rounded-xl border border-purple-900/30 bg-[#141124] flex justify-between">
                <span className="text-slate-400">Boosting Type</span>
                <span className="text-slate-200">GBDT (Gradient Boosted)</span>
              </div>
              <div className="p-3.5 rounded-xl border border-purple-900/30 bg-[#141124] flex justify-between">
                <span className="text-slate-400">Max Depth / Leaves</span>
                <span className="text-slate-200">8 / 63 leaves</span>
              </div>
              <div className="p-3.5 rounded-xl border border-purple-900/30 bg-[#141124] flex justify-between">
                <span className="text-slate-400">Cross-Validation</span>
                <span className="text-slate-200">5-Fold Purged GroupTimeSeries</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-900/20 flex items-center justify-between text-xs text-slate-400">
            <span>Validation Strategy: Zero Lookahead Bias</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Passed Drift Tests
            </span>
          </div>
        </div>
      </div>

      {/* Model Registry Table */}
      <div className="rounded-2xl border border-purple-900/20 bg-[#0E0C17]/90 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-white">Production Model Registry</h2>
          </div>
          <span className="text-xs font-mono text-purple-400">MLOps Version 1.4.0</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/30 text-slate-400 font-mono">
                <th className="pb-3">Model Tag</th>
                <th className="pb-3">Architecture</th>
                <th className="pb-3">Validation R²</th>
                <th className="pb-3">MAE</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3 text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/40 font-mono">
              {modelsRegistry.map((mod) => (
                <tr key={mod.name} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-3.5 font-bold text-white">{mod.name}</td>
                  <td className="py-3.5 text-slate-400 font-sans">{mod.type}</td>
                  <td className="py-3.5 text-emerald-400 font-bold">{mod.r2}</td>
                  <td className="py-3.5 text-slate-300">{mod.mae}</td>
                  <td className="py-3.5 text-slate-400">{mod.latency}</td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold border ${
                        mod.status === 'Active Production'
                          ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400'
                          : mod.status === 'Shadow Mode'
                          ? 'bg-purple-950/50 border-purple-500/30 text-purple-300'
                          : 'bg-amber-950/50 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {mod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
