"use client";

import { useState } from "react";
import { 
  FileText, 
  Printer, 
  CurrencyInr, 
  Clock, 
  ShieldCheck, 
  Buildings, 
  Wrench, 
  ArrowRight,
  CheckCircle,
  HardHat
} from "@phosphor-icons/react";

export function InstantQuotationCalculator() {
  const [projectType, setProjectType] = useState<string>("structural");
  const [urgency, setUrgency] = useState<string>("standard");
  const [tonnage, setTonnage] = useState<number>(200);
  const [pipingDia, setPipingDia] = useState<number>(3000);
  const [crewSize, setCrewSize] = useState<number>(25);

  // Cost modeling
  const urgencyMultiplier = urgency === "emergency" ? 1.25 : urgency === "urgent" ? 1.1 : 1.0;

  let baseExecutionCost = 0;
  if (projectType === "structural") {
    baseExecutionCost = tonnage * 18500;
  } else if (projectType === "piping") {
    baseExecutionCost = pipingDia * 420;
  } else if (projectType === "turnkey") {
    baseExecutionCost = tonnage * 17500 + pipingDia * 390;
  } else if (projectType === "shutdown") {
    baseExecutionCost = crewSize * 35000 * 1.5;
  } else {
    baseExecutionCost = crewSize * 28000;
  }

  const statutoryAllowance = Math.round(baseExecutionCost * 0.12);
  const equipmentAllowance = Math.round(baseExecutionCost * 0.15);
  const qaAllowance = 65000;

  const totalCommercialValue = Math.round((baseExecutionCost + statutoryAllowance + equipmentAllowance + qaAllowance) * urgencyMultiplier);

  const formatLakhs = (val: number) => {
    const inLakhs = val / 100000;
    if (inLakhs >= 100) {
      return `₹${(inLakhs / 100).toFixed(2)} Cr`;
    }
    return `₹${inLakhs.toFixed(2)} Lakhs`;
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-0 print:border-0 print:shadow-none">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-amber-400" />
            Commercial Scope Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Instant Commercial Scope & Tender Budgeting
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          ODISHA INDUSTRIAL CORRIDOR BENCHMARKS
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Nature Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Select Primary Scope Nature
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "structural", label: "Structural Steel Erection" },
                { id: "piping", label: "Process Piping Network" },
                { id: "turnkey", label: "Turnkey Civil + Mech" },
                { id: "shutdown", label: "Turnaround Shutdown (24/7)" },
                { id: "manpower", label: "Skilled Trade Supply" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProjectType(p.id)}
                  className={`p-3 rounded-xs border text-xs font-heading font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${
                    projectType === p.id
                      ? "bg-slate-900 text-amber-400 border-slate-900 shadow-xs"
                      : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Speed */}
          <div className="space-y-2">
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Mobilization SLA Timeline
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "standard", label: "Standard (30 Days)", tag: "1.0x Base" },
                { id: "urgent", label: "Accelerated (14 Days)", tag: "1.1x Fast" },
                { id: "emergency", label: "Emergency (48-72h)", tag: "1.25x Priority" },
              ].map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id)}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    urgency === u.id
                      ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs"
                      : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-heading uppercase">{u.label}</div>
                  <div className="text-[10px] font-mono mt-0.5 opacity-80">{u.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Slider based on project nature */}
          {projectType === "structural" || projectType === "turnkey" ? (
            <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
              <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
                <span>Estimated Structural Tonnage</span>
                <span className="font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                  {tonnage} MT
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="1200"
                step="25"
                value={tonnage}
                onChange={(e) => setTonnage(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          ) : null}

          {projectType === "piping" || projectType === "turnkey" ? (
            <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
              <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
                <span>Process Piping Volume</span>
                <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-200">
                  {pipingDia} Inch-Dia
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={pipingDia}
                onChange={(e) => setPipingDia(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          ) : null}

          {projectType === "shutdown" || projectType === "manpower" ? (
            <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-sm border border-slate-200">
              <div className="flex justify-between items-center text-xs font-heading font-bold uppercase text-slate-900">
                <span>Crew Headcount Deployment</span>
                <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  {crewSize} Personnel
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={crewSize}
                onChange={(e) => setCrewSize(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          ) : null}
        </div>

        {/* Commercial Quotation Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-7 rounded-sm border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                Tender Scope Sheet
              </span>
              <h4 className="text-lg font-heading font-bold uppercase text-white">
                Commercial Summary
              </h4>
            </div>
            <button
              type="button"
              onClick={handlePrintQuote}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xs transition-colors cursor-pointer print:hidden"
              title="Print Scope Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-4 bg-slate-950/80 rounded-sm border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Estimated Commercial Budget
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                ~ {formatLakhs(totalCommercialValue)}
              </div>
              <span className="text-[10px] text-emerald-400 block pt-1">
                ✓ Inclusive of Statutory ESI / PF & Safety Gear
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Base Execution Scope:</span>
                <span>{formatLakhs(baseExecutionCost)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Statutory Remittances (ESI/PF):</span>
                <span>{formatLakhs(statutoryAllowance)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">Equipment, Rigging & Tools:</span>
                <span>{formatLakhs(equipmentAllowance)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400">WPS/PQR & QA Inspection:</span>
                <span>₹65,000</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
              <span>GSTIN: 21AAFFL7905E1ZO • Registered in Paradeep</span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
              Formal Commercial Quotation and Bill of Quantities (BOQ) issued upon engineering drawings review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
