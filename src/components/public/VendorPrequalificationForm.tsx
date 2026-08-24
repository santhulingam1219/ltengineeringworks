"use client";

import { useState } from "react";
import { 
  FileText, 
  Printer, 
  CheckCircle, 
  ShieldCheck, 
  Buildings, 
  DownloadSimple, 
  HardHat,
  ArrowRight,
  SealCheck
} from "@phosphor-icons/react";

export function VendorPrequalificationForm() {
  const [clientCompany, setClientCompany] = useState("");
  const [projectPackage, setProjectPackage] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [requiredTrades, setRequiredTrades] = useState<string[]>([
    "Structural Steel Fabrication & Erection",
    "High-Pressure Process Piping",
  ]);
  const [isGenerated, setIsGenerated] = useState(false);

  const tradeOptions = [
    "Structural Steel Fabrication & Erection",
    "High-Pressure Process Piping",
    "Heavy Equipment Positioning & Alignment",
    "Plant Turnaround & Shutdown Maintenance (24/7)",
    "Skilled Trade Manpower Supply",
    "Industrial Civil Foundations",
  ];

  const handleToggleTrade = (trade: string) => {
    setRequiredTrades((prev) =>
      prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCompany.trim()) {
      alert("Please enter the Client / EPC Enterprise Name");
      return;
    }
    setIsGenerated(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-0 print:border-0 print:shadow-none">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <SealCheck className="w-4 h-4 text-emerald-400" weight="fill" />
            Corporate Vendor Onboarding
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Vendor Prequalification Dossier Generator
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-xs self-start md:self-auto flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" weight="fill" />
          <span>GSTIN & EPFO Verified</span>
        </span>
      </div>

      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-heading font-bold uppercase text-slate-900">
                Principal EPC / Client Organization <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="e.g. Tata Steel / IOCL / JSW / Adani / L&T"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-xs text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-heading font-bold uppercase text-slate-900">
                Project Name / Tender Requisition
              </label>
              <input
                type="text"
                value={projectPackage}
                onChange={(e) => setProjectPackage(e.target.value)}
                placeholder="e.g. Paradeep Refinery Expansion Package #4"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-xs text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-heading font-bold uppercase text-slate-900">
                Procurement Officer / Contact Name
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Lead Commercial Manager"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-xs text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-heading font-bold uppercase text-slate-900">
                Official Commercial Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="e.g. procurement@tatasteel.com"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-xs text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-heading font-bold uppercase text-slate-900">
              Select Prequalification Disciplines Required
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tradeOptions.map((trade) => {
                const isSelected = requiredTrades.includes(trade);
                return (
                  <button
                    key={trade}
                    type="button"
                    onClick={() => handleToggleTrade(trade)}
                    className={`p-3 rounded-xs border text-left text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-slate-950 font-semibold"
                        : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{trade}</span>
                    <span
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "bg-amber-500 border-amber-500 text-slate-950 font-bold"
                          : "border-slate-300 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Generate Vendor Registration Pack</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 sm:p-10 space-y-8">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
            <button
              type="button"
              onClick={() => setIsGenerated(false)}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              ← Edit Input Parameters
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Prequalification PDF</span>
            </button>
          </div>

          {/* Dossier Document Sheet */}
          <div className="border border-slate-300 p-4 sm:p-8 rounded-xs space-y-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">
                  Tailored Vendor Registration Profile
                </span>
                <h4 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-950">
                  LT Engineering Works
                </h4>
                <p className="text-xs font-mono text-slate-600">
                  Prepared For: <strong className="text-slate-900">{clientCompany}</strong> {projectPackage && `(${projectPackage})`}
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs space-y-1">
                <div>GSTIN: <strong className="text-slate-950 font-bold">21AAFFL7905E1ZO</strong></div>
                <div className="text-emerald-700 font-bold">✓ Statutory Active & Verified</div>
              </div>
            </div>

            {/* Statutory Compliance Table */}
            <div className="space-y-2">
              <h5 className="text-xs font-heading font-bold uppercase text-slate-900">
                1. Statutory & Legal Identification
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">GSTIN Registration:</span>
                  <strong className="text-slate-900">21AAFFL7905E1ZO</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">EPFO Establishment:</span>
                  <strong className="text-slate-900">OR/BAM/EPF/21-XXXXX</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">ESIC Medical Pass:</span>
                  <strong className="text-slate-900">51000-XXXXX-000-0606</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">Group Personal Accident:</span>
                  <strong className="text-slate-900">₹10 Lakhs / Worker Cover</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">Partner:</span>
                  <strong className="text-slate-900">Lingam Duryodhana</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <span className="text-slate-500 text-[10px] block">Manager:</span>
                  <strong className="text-slate-900">Lingam Tarakeswar Rao</strong>
                </div>
              </div>
            </div>

            {/* Approved Disciplines */}
            <div className="space-y-2">
              <h5 className="text-xs font-heading font-bold uppercase text-slate-900">
                2. Selected Execution Capabilities for {clientCompany}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requiredTrades.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans text-slate-800 p-2 bg-slate-50 border border-slate-200 rounded-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Hotlines */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Registered Yard & Head Office:</span>
                <p className="text-slate-800 leading-relaxed">
                  Ground Floor, Plot No. 1/298, Khata No. 23/430,<br />
                  Sandhakuda City, Paradeep, Dist. Jagatsinghpur, Odisha – 754142
                </p>
              </div>
              <div className="text-right sm:text-right space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase">Official Contacts:</span>
                <div>Hotline: <strong className="text-slate-900">+91 7073877299</strong></div>
                <div>Email: <strong className="text-slate-900">ltengineeringworks7020@gmail.com</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
