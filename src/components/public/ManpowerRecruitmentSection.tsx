"use client";

import Link from "next/link";
import { HardHat, UsersThree, CheckCircle, ArrowRight, ShieldCheck, Briefcase } from "@phosphor-icons/react";

export function ManpowerRecruitmentSection() {
  const trades = [
    { title: "Project Engineers", code: "ENG", desc: "Mechanical & Civil Site Engineers", count: "10+ Active" },
    { title: "Site Supervisors", code: "SUP", desc: "Execution & Safety Management", count: "25+ Active" },
    { title: "Pipe & Structural Fitters", code: "FIT", desc: "Precision Spool & Steel Fitters", count: "150+ Ready" },
    { title: "Certified Fabricators", code: "FAB", desc: "Heavy Structural & Tank Fabricators", count: "80+ Ready" },
    { title: "Foremen & Marshals", code: "FOR", desc: "Trade Crew Leads & Crane Marshals", count: "15+ Ready" },
    { title: "Riggers & Kalassi", code: "RIG", desc: "High-Elevation Heavy Rigging", count: "60+ Ready" },
    { title: "General Helpers", code: "HLP", desc: "Site Logistics & Material Movement", count: "200+ Ready" },
    { title: "Computer Operators", code: "OPS", desc: "Site Inventory & Documentation", count: "12+ Ready" },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Image Texture (Mobile & Desktop Variants) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none bg-[url('/images/manpower-deployment-mobile.webp')] sm:bg-[url('/images/manpower-crew-team.webp')]"
      />
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Client/Worker Pitch */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/40 rounded-xs text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <HardHat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Skilled Workforce Mobilization</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase leading-tight text-white">
              Industrial Manpower Deployment
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              LT Engineering Works supports large-scale industrial projects with verified, safety-trained, and trade-certified technical crews. We rapidly deploy trades to refineries, power plants, steel mills, and infrastructure sites across Paradeep and Eastern India.
            </p>

            {/* Compliance Bullet Points */}
            <div className="space-y-2 pt-1 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Statutory compliance, ESI & PF documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Pre-mobilization safety orientation & PPE check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Experienced supervisory leadership deployed on site</span>
              </div>
            </div>

            {/* Mobile Full-Width Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-4">
              <Link
                href="/manpower"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-xs transition-all shadow-md active:scale-95 text-center"
              >
                <span>Request Manpower Requisition</span>
                <ArrowRight className="w-3.5 h-3.5" weight="bold" />
              </Link>
              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-xs border border-slate-700 transition-all active:scale-95 text-center"
              >
                <HardHat className="w-4 h-4 text-amber-400" />
                <span>Explore Vacancies</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Density Responsive Trade Matrix */}
          <div className="lg:col-span-7">
            {/* Header for trades on mobile */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 sm:hidden">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <UsersThree className="w-4 h-4" />
                <span>Available Trade Roster</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">8 Certified Trades</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
              {trades.map((trade, i) => (
                <div
                  key={i}
                  className="bg-slate-950/85 border border-slate-800 p-3 sm:p-4 rounded-xs hover:border-amber-500/60 transition-all flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 group shadow-xs backdrop-blur-xs"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-[11px] sm:text-xs flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {trade.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors truncate">
                        {trade.title}
                      </h3>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2">
                      {trade.desc}
                    </p>
                    <span className="inline-block text-[9px] font-mono font-semibold text-emerald-400 mt-1 bg-emerald-950/50 px-1.5 py-0.2 rounded-xs border border-emerald-800/40">
                      {trade.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
