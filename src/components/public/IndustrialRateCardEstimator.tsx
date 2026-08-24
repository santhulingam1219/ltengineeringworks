"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  CurrencyInr, 
  ArrowRight, 
  CheckCircle, 
  Wrench, 
  Buildings, 
  HardHat,
  ArrowsClockwise
} from "@phosphor-icons/react";

export function IndustrialRateCardEstimator() {
  const [steelTonnage, setSteelTonnage] = useState<number>(150);
  const [pipingInchDia, setPipingInchDia] = useState<number>(2500);
  const [equipmentUnits, setEquipmentUnits] = useState<number>(4);
  const [manpowerCrewSize, setManpowerCrewSize] = useState<number>(20);
  const [includeTesting, setIncludeTesting] = useState<boolean>(true);

  // Benchmarks based on industrial market averages in Paradeep / Eastern India
  const steelRatePerMt = 18500; // Fabrication + erection rate per MT
  const pipingRatePerInchDia = 420; // Fit-up, welding & hydro-test prep
  const equipmentRatePerUnit = 45000; // Alignment, leveling, sole plate & grouting
  const manpowerMonthlyPerHead = 28000; // All-inclusive statutory wage + ESI + PF + PPE
  const testingAllowance = includeTesting ? 85000 : 0; // NDT / RT / DPI QA package

  const estSteel = steelTonnage * steelRatePerMt;
  const estPiping = pipingInchDia * pipingRatePerInchDia;
  const estEquipment = equipmentUnits * equipmentRatePerUnit;
  const estManpowerMonth = manpowerCrewSize * manpowerMonthlyPerHead;

  const totalEstimate = estSteel + estPiping + estEquipment + estManpowerMonth + testingAllowance;
  const totalMin = Math.round(totalEstimate * 0.9);
  const totalMax = Math.round(totalEstimate * 1.15);

  const formatLakhs = (val: number) => {
    const inLakhs = val / 100000;
    if (inLakhs >= 100) {
      return `₹${(inLakhs / 100).toFixed(2)} Cr`;
    }
    return `₹${inLakhs.toFixed(2)} Lakhs`;
  };

  const enquiryUrl = `/contact?estimatedTonnage=${steelTonnage}&estimatedPiping=${pipingInchDia}&estimatedWorkers=${manpowerCrewSize}&estBudget=${encodeURIComponent(formatLakhs(totalEstimate))}`;

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-lg overflow-hidden space-y-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-amber-400" />
            Budgeting & Scope Sizing Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Industrial Rate Card & Scope Estimator
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Standard Paradeep / Odisha Work Front Benchmarks
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Steel Tonnage Slider */}
          <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
            <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
              <span className="flex items-center gap-1.5">
                <Buildings className="w-4 h-4 text-amber-600" />
                Structural Steel Fabrication & Erection
              </span>
              <span className="font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                {steelTonnage} MT
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={steelTonnage}
              onChange={(e) => setSteelTonnage(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 MT</span>
              <span>Subtotal: ~{formatLakhs(estSteel)}</span>
              <span>1,000 MT</span>
            </div>
          </div>

          {/* Piping Inch-Dia Slider */}
          <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
            <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
              <span className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                Process & Utility Piping Spools
              </span>
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-200">
                {pipingInchDia} Inch-Dia
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="250"
              value={pipingInchDia}
              onChange={(e) => setPipingInchDia(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 ID</span>
              <span>Subtotal: ~{formatLakhs(estPiping)}</span>
              <span>10,000 ID</span>
            </div>
          </div>

          {/* Manpower Crew Size */}
          <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
            <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
              <span className="flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-emerald-600" />
                Skilled Workforce Crew (Monthly Deployment)
              </span>
              <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                {manpowerCrewSize} Personnel
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={manpowerCrewSize}
              onChange={(e) => setManpowerCrewSize(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 Heads</span>
              <span>Subtotal / Month: ~{formatLakhs(estManpowerMonth)}</span>
              <span>150 Heads</span>
            </div>
          </div>

          {/* Testing Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-sm">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-slate-800">
              <input
                type="checkbox"
                checked={includeTesting}
                onChange={(e) => setIncludeTesting(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded-xs"
              />
              <span>Include Radiography (RT), DPI & Calibrated Hydro-Testing Package</span>
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {includeTesting ? "+ ₹85k QA" : "Excluded"}
            </span>
          </div>

        </div>

        {/* Output Budget Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-7 rounded-sm border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Indicative Execution Budget
            </span>
            <h4 className="text-xl font-heading font-black uppercase text-white mt-1">
              Estimated Scope Value
            </h4>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-4 bg-slate-950/80 rounded-sm border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Estimated Commercial Range (±10%)
              </span>
              <div className="text-xl sm:text-3xl font-black text-amber-400">
                {formatLakhs(totalMin)} – {formatLakhs(totalMax)}
              </div>
              <span className="text-[10px] text-slate-400 block pt-1">
                Based on Turnkey Rates & ESI/PF Statutory Inclusion
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Structural Steel ({steelTonnage} MT):</span>
                <span>{formatLakhs(estSteel)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Process Piping ({pipingInchDia} ID):</span>
                <span>{formatLakhs(estPiping)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Workforce ({manpowerCrewSize} Heads / Mo):</span>
                <span>{formatLakhs(estManpowerMonth)}</span>
              </div>
              {includeTesting && (
                <div className="flex justify-between border-b border-slate-800/80 pb-1 text-amber-300/80">
                  <span>QA NDT & Hydro-Testing:</span>
                  <span>₹85,000</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <Link
              href={enquiryUrl}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Submit Scope for Formal BOQ Quote</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
            <p className="text-[10px] text-slate-400 text-center font-mono">
              Final quotation finalized upon site survey & GFC drawings review.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
