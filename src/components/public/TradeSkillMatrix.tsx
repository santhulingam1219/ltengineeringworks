"use client";

import { useState } from "react";
import Link from "next/link";
import { HardHat, Certificate, CheckCircle, ArrowRight, Wrench, ShieldCheck, FileText } from "@phosphor-icons/react";

interface TradeRequirement {
  id: string;
  name: string;
  code: string;
  experience: string;
  minQualification: string;
  mandatoryCertifications: string[];
  keyCompetencies: string[];
  perks: string[];
}

const tradeRequirements: TradeRequirement[] = [
  {
    id: "welders",
    name: "6G / TIG & Arc Welders",
    code: "WLD-6G",
    experience: "3+ Years in Heavy Industry",
    minQualification: "ITI Welder / Trade Apprenticeship",
    mandatoryCertifications: [
      "ASME Section IX / IBR 6G Position Qualification",
      "Valid Welder Performance Qualification Record (WPQR)",
      "Safety Induction & Hot Work Permit Card",
    ],
    keyCompetencies: [
      "100% Radiography Quality (RT) Welding",
      "Carbon Steel (CS) & SS-316L Pipe Spool Jointing",
      "Root pass TIG welding with Arc filler run",
    ],
    perks: ["Site Accommodation", "Overtime Allowance", "PF & ESI Provided"],
  },
  {
    id: "fitters",
    name: "Pipe & Structural Fitters",
    code: "FIT-01",
    experience: "2+ Years in Plant/Piping Works",
    minQualification: "ITI Fitter / NCTVT Certification",
    mandatoryCertifications: [
      "Trade Competency Certificate",
      "Height Pass & Confined Space Safety Card",
    ],
    keyCompetencies: [
      "Isometric Blueprint & P&ID Interpretation",
      "Spool Pre-Fabrication & Flange Squareness Fit-up",
      "Bevel Grinding, Plasma Cutting & Hydro-Test Prep",
    ],
    perks: ["Safety PPE Issued", "Free Site Transport", "Fooding Allowance"],
  },
  {
    id: "fabricators",
    name: "Heavy Structural Fabricators",
    code: "FAB-02",
    experience: "4+ Years in Structural Yards",
    minQualification: "ITI Fabrication / Trade Experience",
    mandatoryCertifications: [
      "Structural Fabrication Competency Pass",
      "Overhead Crane Operation / Slinging Safety",
    ],
    keyCompetencies: [
      "Heavy I-Beam, Box Girder & Truss Layout",
      "Gas/Plasma Profile Cutting & Plate Bending",
      "Base Plate & Column Verticality Alignment",
    ],
    perks: ["Tool Kit Provided", "Accommodation", "Statutory Insurance"],
  },
  {
    id: "riggers",
    name: "Riggers & Kalassi Crew",
    code: "RIG-03",
    experience: "2+ Years in Heavy Lifts",
    minQualification: "Trade Verification & Physical Fitness",
    mandatoryCertifications: [
      "Certified Rigger & Signalman Card",
      "Medical Fitness & Eye Vision Test Certificate",
    ],
    keyCompetencies: [
      "Crane Hitching, Shackle Sizing & Sling Selection",
      "High-Elevation Truss & Vessel Tagline Control",
      "Winches, Chain Pulleys & Heavy Shifting",
    ],
    perks: ["Full Body Harness", "Accommodation", "Prompt Monthly Pay"],
  },
  {
    id: "engineers",
    name: "Site Engineers & Supervisors",
    code: "ENG-04",
    experience: "3-5 Years in Mechanical/Civil Projects",
    minQualification: "Diploma / B.Tech in Mechanical or Civil",
    mandatoryCertifications: [
      "Safety Supervisor Card (IOSH / NEBOSH preferred)",
      "Primavera / MS Excel Site DPR Reporting",
    ],
    keyCompetencies: [
      "Daily Progress Reporting & Manpower Management",
      "Client Quality Inspection (RFI / NDT Coordination)",
      "Daily Tool-Box Talk (TBT) & HSE Enforcement",
    ],
    perks: ["Executive Site Allowance", "Company Transportation", "Performance Bonus"],
  },
];

export function TradeSkillMatrix() {
  const [selectedTrade, setSelectedTrade] = useState<string>("welders");

  const trade = tradeRequirements.find((t) => t.id === selectedTrade) || tradeRequirements[0];

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Worker Verification Standards
          </span>
          <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight">
            Trade Skill & Qualification Matrix
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Statutory ESI / PF Compliant Hiring
        </span>
      </div>

      {/* Trade Selector Tabs (Swipeable on Mobile) */}
      <div className="bg-[#0B1120] border-b border-slate-800 p-2.5 flex items-center gap-2 overflow-x-auto sm:flex-wrap pb-2.5 scrollbar-none">
        {tradeRequirements.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTrade(t.id)}
            className={`px-3.5 sm:px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex-shrink-0 ${
              selectedTrade === t.id
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Selected Trade Specifications Panel */}
      <div className="p-6 sm:p-8 space-y-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-amber-400 rounded-xs uppercase mr-2">
              Code: {trade.code}
            </span>
            <h4 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight inline-block mt-1 sm:mt-0">
              {trade.name}
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
            <span>Exp: <strong className="text-slate-900">{trade.experience}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Certifications */}
          <div className="bg-[#F8FAFC] border border-slate-200 p-5 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-slate-900 border-b border-slate-200 pb-2">
              <Certificate className="w-4 h-4 text-blue-600" weight="bold" />
              <span>Mandatory Certifications & Tickets</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-sans">
              {trade.mandatoryCertifications.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" weight="fill" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Key Competencies */}
          <div className="bg-[#F8FAFC] border border-slate-200 p-5 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-slate-900 border-b border-slate-200 pb-2">
              <Wrench className="w-4 h-4 text-amber-600" weight="bold" />
              <span>Practical Work Front Capabilities</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-sans">
              {trade.keyCompetencies.map((k, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" weight="fill" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Benefits & Application Strip */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-600">
            <span className="font-bold text-slate-900">Standard Worker Benefits:</span>
            {trade.perks.map((p, i) => (
              <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs">
                ✓ {p}
              </span>
            ))}
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            Apply for {trade.name}
            <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
