"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  HardHat, 
  UsersThree, 
  Clock, 
  Wrench, 
  ArrowRight, 
  CheckCircle,
  ShieldCheck
} from "@phosphor-icons/react";

export function ScopeEstimator() {
  const [discipline, setDiscipline] = useState("structural");
  const [scale, setScale] = useState(150); // e.g. Tonnage MT or Inch-Meters
  const [durationMonths, setDurationMonths] = useState(4);
  const [shifts, setShifts] = useState(1);

  // Estimator calculation model based on industrial project heuristics
  const calculateEstimates = () => {
    if (discipline === "structural") {
      const fabricators = Math.max(4, Math.round((scale / (durationMonths * 25)) * 3 * shifts));
      const fitters = Math.max(4, Math.round(fabricators * 1.2));
      const riggers = Math.max(2, Math.round(fabricators * 0.6));
      const supervisors = Math.max(1, Math.round((fabricators + fitters) / 15));
      const helpers = Math.max(4, Math.round(fabricators * 1.5));
      const totalCrew = fabricators + fitters + riggers + supervisors + helpers;

      return {
        unit: "Metric Tons (MT)",
        label: "Estimated Structural Steel Tonnage",
        trades: [
          { name: "Structural Fabricators", count: fabricators },
          { name: "Structural Fitters", count: fitters },
          { name: "Heavy Riggers / Kalassi", count: riggers },
          { name: "Site Supervisors", count: supervisors },
          { name: "Semi-Skilled Helpers", count: helpers },
        ],
        totalCrew,
        recommendedSafety: "Dedicated Site Safety Officer + Tool-Box Talks Required",
      };
    } else if (discipline === "piping") {
      const pipeFitters = Math.max(4, Math.round((scale / (durationMonths * 20)) * 2.5 * shifts));
      const welders6G = Math.max(3, Math.round(pipeFitters * 0.8));
      const riggers = Math.max(2, Math.round(pipeFitters * 0.4));
      const supervisors = Math.max(1, Math.round(pipeFitters / 10));
      const helpers = Math.max(3, Math.round(pipeFitters * 1.2));
      const totalCrew = pipeFitters + welders6G + riggers + supervisors + helpers;

      return {
        unit: "Inch-Dia Joints / Spool Pkg",
        label: "Piping Scope Volume",
        trades: [
          { name: "CS / SS Pipe Fitters", count: pipeFitters },
          { name: "6G GTAW+SMAW Welders", count: welders6G },
          { name: "Riggers / Spool Handlers", count: riggers },
          { name: "QA/QC Piping Inspector", count: supervisors },
          { name: "Site Helpers", count: helpers },
        ],
        totalCrew,
        recommendedSafety: "Hot Work Permitting & Radiography NDT Protocols",
      };
    } else {
      const millwrights = Math.max(4, Math.round((scale / 10) * shifts));
      const heavyRiggers = Math.max(4, Math.round(millwrights * 1.2));
      const craneOperators = Math.max(1, Math.round(millwrights / 4));
      const supervisors = Math.max(1, Math.round(millwrights / 8));
      const helpers = Math.max(4, Math.round(millwrights * 1.5));
      const totalCrew = millwrights + heavyRiggers + craneOperators + supervisors + helpers;

      return {
        unit: "Heavy Equipment Units",
        label: "Machinery Units / Pump Packages",
        trades: [
          { name: "Mechanical Millwrights", count: millwrights },
          { name: "Master Riggers / Kalassi", count: heavyRiggers },
          { name: "Heavy Equipment Lead", count: supervisors },
          { name: "Crane Rigging Helpers", count: helpers },
        ],
        totalCrew,
        recommendedSafety: "Heavy Lift Plan & Tandem Rigging Approval Mandatory",
      };
    }
  };

  const estimate = calculateEstimates();

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden">
      
      {/* Widget Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            Engineering Intelligence Tool
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Industrial Project Scope & Crew Estimator
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Configure your technical work scope to instantly estimate trade workforce mobilization requirements.
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Estimated Site Workforce</span>
          <span className="text-3xl font-heading font-black text-amber-400 font-mono-code">
            {estimate.totalCrew} Technicians
          </span>
        </div>
      </div>

      {/* Calculator Body Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Discipline Selector */}
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Select Project Discipline
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "structural", label: "Structural Steel" },
                { id: "piping", label: "Utility / Process Piping" },
                { id: "equipment", label: "Equipment Erection" },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDiscipline(d.id)}
                  className={`p-3 text-xs font-heading font-bold uppercase rounded-sm border transition-all text-center ${
                    discipline === d.id
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
                2. {estimate.label}
              </label>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                {scale} {estimate.unit}
              </span>
            </div>
            <input
              type="range"
              min={discipline === "equipment" ? 5 : 20}
              max={discipline === "equipment" ? 100 : 1000}
              step={discipline === "equipment" ? 5 : 10}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Duration & Shifts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
                  Target Duration
                </label>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {durationMonths} Months
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={18}
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Daily Shifts
              </label>
              <select
                value={shifts}
                onChange={(e) => setShifts(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value={1}>Single Shift (8–10 Hrs/Day)</option>
                <option value={2}>Double Shift (20–24 Hrs/Day)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Breakdown Output Column */}
        <div className="lg:col-span-6 bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-4">
          <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
            Recommended Workforce Deployment Roster
          </span>

          <div className="space-y-2">
            {estimate.trades.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 last:border-0"
              >
                <span className="font-heading font-bold text-slate-800 uppercase">{t.name}</span>
                <span className="font-mono font-bold text-slate-950 bg-white px-2.5 py-0.5 rounded-xs border border-slate-200">
                  {t.count} Personnel
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="text-[11px] font-mono text-emerald-800 flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" weight="fill" />
              <span>{estimate.recommendedSafety}</span>
            </div>
          </div>

          <div className="pt-3">
            <Link
              href={`/contact?service=${encodeURIComponent(discipline)}&scope=${scale}`}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              Submit Requisition with this Scope
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
