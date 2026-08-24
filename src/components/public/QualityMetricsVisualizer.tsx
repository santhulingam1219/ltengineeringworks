"use client";

import { 
  ShieldCheck, 
  CheckCircle, 
  TrendUp, 
  Medal, 
  Gauge, 
  Lightning,
  Sparkle
} from "@phosphor-icons/react";

export function QualityMetricsVisualizer() {
  const metrics = [
    {
      label: "Zero Lost Time Injury (LTIFR)",
      value: "0.00",
      unit: "Incidents",
      desc: "Zero-harm site execution across Paradeep refineries & steel plants",
      badge: "HSE Compliant",
      color: "emerald",
    },
    {
      label: "NDT / Radiography First-Pass Acceptance",
      value: "99.4%",
      unit: "Pass Rate",
      desc: "ASME Sec IX certified 6G welders and multi-layer TIG passes",
      badge: "Quality Verified",
      color: "amber",
    },
    {
      label: "Heavy Structural Steel Erected",
      value: "850+",
      unit: "Metric Tons",
      desc: "Delivered pipe racks, factory platforms & conveyor galleries",
      badge: "EPC Execution",
      color: "blue",
    },
    {
      label: "Turnaround Deployment SLA",
      value: "48–72",
      unit: "Hours",
      desc: "Rapid trade crew dispatch to plant shutdowns in Odisha corridor",
      badge: "Fast Dispatch",
      color: "amber",
    },
  ];

  return (
    <section className="bg-slate-950 border-y border-slate-800 py-16 text-white relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Medal className="w-4 h-4 text-amber-400" weight="fill" />
              Verified Execution Track Record
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white">
              Zero-Harm Safety & Quality Benchmarks
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md leading-relaxed">
            Statutory rigor, qualified 6G tradesmen, and daily Tool-Box Talks (TBT) powering high-integrity plant turnarounds in Paradeep.
          </p>
        </div>

        {/* 4-Card Benchmark Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-slate-900/90 border border-slate-800 p-6 rounded-sm space-y-4 hover:border-amber-500/60 transition-all group backdrop-blur-xs relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-amber-400 border border-slate-700 rounded-xs">
                  {m.badge}
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-400" weight="fill" />
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-white group-hover:text-amber-400 transition-colors">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{m.unit}</span>
                </div>
                <h3 className="text-xs font-heading font-bold text-slate-200 uppercase tracking-tight">
                  {m.label}
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans border-t border-slate-800/80 pt-3">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
