"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  HardHat, 
  CalendarCheck, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  GearSix,
  Crane
} from "@phosphor-icons/react";

interface TradeCount {
  fabricators: number;
  welders6g: number;
  fitters: number;
  riggers: number;
  supervisors: number;
}

export function MobilizationCalculator() {
  const [trades, setTrades] = useState<TradeCount>({
    fabricators: 8,
    welders6g: 6,
    fitters: 10,
    riggers: 4,
    supervisors: 2,
  });

  const [needCrane, setNeedCrane] = useState<boolean>(true);
  const [needWeldingBanks, setNeedWeldingBanks] = useState<boolean>(true);
  const [needDgSet, setNeedDgSet] = useState<boolean>(false);
  const [locationZone, setLocationZone] = useState<"paradeep" | "odisha" | "interstate">("paradeep");

  const totalHeadcount = trades.fabricators + trades.welders6g + trades.fitters + trades.riggers + trades.supervisors;

  // Turnaround calculations
  let baseHours = 48;
  if (totalHeadcount > 30) baseHours = 72;
  if (totalHeadcount > 60) baseHours = 120;
  if (locationZone === "odisha") baseHours += 24;
  if (locationZone === "interstate") baseHours += 48;

  const updateTrade = (key: keyof TradeCount, val: number) => {
    setTrades((prev) => ({ ...prev, [key]: Math.max(0, val) }));
  };

  const tradeBreakdown = [
    { key: "fabricators" as const, label: "Structural Fabricators", icon: HardHat, color: "text-amber-500" },
    { key: "welders6g" as const, label: "Certified 6G Welders (TIG/ARC)", icon: GearSix, color: "text-blue-500" },
    { key: "fitters" as const, label: "Pipe & Mechanical Fitters", icon: HardHat, color: "text-emerald-500" },
    { key: "riggers" as const, label: "Certified Heavy Riggers", icon: Crane, color: "text-purple-500" },
    { key: "supervisors" as const, label: "Site Supervisors / Foremen", icon: ShieldCheck, color: "text-rose-500" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-lg overflow-hidden space-y-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4 text-amber-400" />
            Dispatch Planning Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Turnaround & Crew Mobilization Planner
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Sandhakuda Yard Central Dispatch
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Work Front Location */}
          <div className="space-y-2">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Project Site Location
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "paradeep" as const, label: "Paradeep Zone", sub: "48-72h Direct" },
                { id: "odisha" as const, label: "Odisha State", sub: "+24h Transit" },
                { id: "interstate" as const, label: "Interstate EPC", sub: "+48h Transit" },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocationZone(loc.id)}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    locationZone === loc.id
                      ? "bg-slate-900 text-amber-400 border-slate-900 shadow-xs"
                      : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-heading uppercase font-bold">{loc.label}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{loc.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Headcounts */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
                Configure Crew Trade Breakdown
              </label>
              <span className="text-xs font-mono text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                Total: {totalHeadcount} Tradesmen
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tradeBreakdown.map((t) => (
                <div
                  key={t.key}
                  className="bg-[#F8FAFC] p-3 rounded-sm border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <t.icon className={`w-4 h-4 ${t.color} flex-shrink-0`} weight="bold" />
                    <span className="text-xs font-sans text-slate-800 font-medium">{t.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateTrade(t.key, trades[t.key] - 1)}
                      className="w-8 h-8 rounded-xs bg-slate-200 hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-mono text-sm flex items-center justify-center font-bold active:scale-95 transition-colors cursor-pointer"
                      aria-label={`Decrease ${t.label}`}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-bold text-slate-900">
                      {trades[t.key]}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateTrade(t.key, trades[t.key] + 1)}
                      className="w-8 h-8 rounded-xs bg-slate-200 hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-mono text-sm flex items-center justify-center font-bold active:scale-95 transition-colors cursor-pointer"
                      aria-label={`Increase ${t.label}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Provisioning Toggles */}
          <div className="space-y-2">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Machinery & Equipment Dispatch Packages
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="p-3 bg-slate-50 border border-slate-200 rounded-sm flex items-center gap-2.5 cursor-pointer text-xs font-sans text-slate-800">
                <input
                  type="checkbox"
                  checked={needCrane}
                  onChange={(e) => setNeedCrane(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded-xs"
                />
                <span>Hydraulic Mobile Crane (50T/250T)</span>
              </label>

              <label className="p-3 bg-slate-50 border border-slate-200 rounded-sm flex items-center gap-2.5 cursor-pointer text-xs font-sans text-slate-800">
                <input
                  type="checkbox"
                  checked={needWeldingBanks}
                  onChange={(e) => setNeedWeldingBanks(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded-xs"
                />
                <span>400A Inverter Welding Banks</span>
              </label>

              <label className="p-3 bg-slate-50 border border-slate-200 rounded-sm flex items-center gap-2.5 cursor-pointer text-xs font-sans text-slate-800">
                <input
                  type="checkbox"
                  checked={needDgSet}
                  onChange={(e) => setNeedDgSet(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded-xs"
                />
                <span>125 kVA Silent DG Set</span>
              </label>
            </div>
          </div>

        </div>

        {/* Dispatch Timeline Output Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-7 rounded-sm border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Calculated Mobilization SLA
            </span>
            <h4 className="text-xl font-heading font-black uppercase text-white mt-1">
              Estimated On-Site Arrival
            </h4>
          </div>

          <div className="space-y-4 font-mono">
            <div className="p-4 bg-slate-950/80 rounded-sm border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Target Turnaround Window
              </span>
              <div className="text-3xl font-black text-amber-400">
                {baseHours} Hours
              </div>
              <span className="text-[10px] text-emerald-400 block pt-1">
                ✓ Full Gate Pass & Medical Clearance Included
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Total Deployment Crew:</span>
                <strong className="text-white font-bold">{totalHeadcount} Personnel</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Supervisory Ratio:</span>
                <span>1 : {Math.round(totalHeadcount / Math.max(1, trades.supervisors))}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Statutory Roster Status:</span>
                <span className="text-emerald-400 font-bold">100% ESI / PF Verified</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Equipment Package:</span>
                <span>{[needCrane && "Crane", needWeldingBanks && "Welders", needDgSet && "DG Set"].filter(Boolean).join(", ") || "Trades Only"}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-3">
            <Link
              href={`/contact?reqWorkers=${totalHeadcount}&estHours=${baseHours}&loc=${locationZone}`}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Submit Mobilization Requisition</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
            <p className="text-[10px] text-slate-400 text-center font-mono">
              Direct dispatch coordination: +91 7073877299 / Sandhakuda Yard
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
