"use client";

import { useState } from "react";
import { ShieldCheck, CheckSquare, Square, HardHat, Sparkle, WarningCircle } from "@phosphor-icons/react";

interface AuditItem {
  id: string;
  category: string;
  protocol: string;
  frequency: string;
  mandatory: boolean;
}

const auditChecklist: AuditItem[] = [
  {
    id: "tbt",
    category: "Daily Briefing",
    protocol: "Daily Morning Tool-Box Talk (TBT) conducted with 100% crew headcount attendance.",
    frequency: "Every Shift (Daily 07:30 AM)",
    mandatory: true,
  },
  {
    id: "ppe",
    category: "Personal Protective Equipment",
    protocol: "Mandatory IS-certified PPE inspection (Hard Hat, 6-Point Harness, Safety Goggles, Steel Toe Boots).",
    frequency: "Continuous / Pre-Entry",
    mandatory: true,
  },
  {
    id: "hotwork",
    category: "Permit to Work (PTW)",
    protocol: "Hot Work & Confined Space Safety Permit signed by client HSE Officer & Site In-Charge.",
    frequency: "Per Work Front Shift",
    mandatory: true,
  },
  {
    id: "rigging",
    category: "Heavy Lifting & Rigging",
    protocol: "Visual inspection of wire slings, D-shackles, crane load indicators, and outrigger pads.",
    frequency: "Prior to Every Lift",
    mandatory: true,
  },
  {
    id: "scaffold",
    category: "Working at Height",
    protocol: "Scaffold structure inspected, toe-boards fitted, and verified with Green Tag clearance.",
    frequency: "Daily Inspection",
    mandatory: true,
  },
  {
    id: "fire",
    category: "Fire Prevention",
    protocol: "Fire extinguishers (CO2/DCP) and fire blankets stationed within 5m of welding arcs.",
    frequency: "Active Hot Work",
    mandatory: true,
  },
];

export function SafetyAuditChecksheet() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    tbt: true,
    ppe: true,
    hotwork: true,
    rigging: true,
    scaffold: true,
    fire: true,
  });

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount = auditChecklist.length;
  const passedCount = Object.values(checkedItems).filter(Boolean).length;
  const complianceScore = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="bg-slate-900 text-white rounded-sm border border-slate-800 p-8 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Interactive Digital Standard
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight mt-1">
            Pre-Task HSE Work Front Checksheet
          </h3>
        </div>
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xs self-start md:self-auto">
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block uppercase">Protocol Readiness</span>
            <span className="text-base font-bold text-emerald-400">{complianceScore}% Compliance</span>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-400" weight="fill" />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {auditChecklist.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-sm border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isChecked
                  ? "bg-slate-950/90 border-emerald-500/50 hover:border-emerald-400"
                  : "bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-60"
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" weight="fill" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" weight="bold" />
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900 text-amber-400 rounded-xs uppercase">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.frequency}
                  </span>
                </div>

                <p className="text-xs font-sans text-slate-200 leading-relaxed">
                  {item.protocol}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-3">
        <div className="flex items-center gap-2">
          <HardHat className="w-4 h-4 text-amber-400" />
          <span>Zero-Lost Time Injury (LTI) Target across all Odisha Work Sites</span>
        </div>
        <span className="text-slate-300 font-semibold">
          Standard: ISO 45001 / OHSAS 18001 Aligned
        </span>
      </div>
    </div>
  );
}
