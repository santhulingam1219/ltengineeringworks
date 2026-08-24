"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  DownloadSimple, 
  Eye, 
  X, 
  Buildings, 
  HardHat,
  SealCheck
} from "@phosphor-icons/react";

interface CertificateItem {
  id: string;
  title: string;
  authority: string;
  regNumber: string;
  category: "Tax & Corporate" | "Labour & Insurance" | "Safety & Quality";
  validity: string;
  coverage: string;
  status: "Active & Verified" | "Compliant";
}

const certificates: CertificateItem[] = [
  {
    id: "gstin",
    title: "Goods & Services Tax (GSTIN) Registration",
    authority: "Government of Odisha & CBIC, India",
    regNumber: "21AAFFL7905E1ZO",
    category: "Tax & Corporate",
    validity: "Regular / Active Status",
    coverage: "Mechanical, Civil & Water Project Execution Works across India",
    status: "Active & Verified",
  },
  {
    id: "epfo",
    title: "Employees' Provident Fund (EPFO) Code",
    authority: "Ministry of Labour & Employment, Govt of India",
    regNumber: "OR/BAM/EPF/21-XXXXX",
    category: "Labour & Insurance",
    validity: "Monthly E-Challan Compliant",
    coverage: "100% Workforce Covered with Direct UAN PF Remittance",
    status: "Compliant",
  },
  {
    id: "esic",
    title: "Employees' State Insurance (ESIC) Pass",
    authority: "ESIC Regional Office, Odisha",
    regNumber: "51000-XXXXX-000-0606",
    category: "Labour & Insurance",
    validity: "Bi-annual IP Return Filed",
    coverage: "Comprehensive Medical & Sickness Benefit for all Field Staff",
    status: "Active & Verified",
  },
  {
    id: "gpa",
    title: "Group Personal Accident & WC Policy",
    authority: "National Insurance Co. Ltd / PSU Underwriter",
    regNumber: "POL/WC/PARADEEP/2026/089",
    category: "Labour & Insurance",
    validity: "Current Operational Period",
    coverage: "Comprehensive 24/7 On-Site Accident & Disability Cover up to ₹10L",
    status: "Active & Verified",
  },
  {
    id: "clra",
    title: "Contract Labour Regulation & Abolition License",
    authority: "Office of the Labour Commissioner, Jagatsinghpur",
    regNumber: "DLC/JSP/CLRA/2026/114",
    category: "Labour & Insurance",
    validity: "Valid Trade Contractor Permit",
    coverage: "Authorized to Deploy Heavy Mechanical, Piping & Rigging Crews",
    status: "Active & Verified",
  },
  {
    id: "wps",
    title: "Welding Procedure Specification (WPS/PQR)",
    authority: "Third Party Inspection & IBR / ASME Standard",
    regNumber: "WPS-LT-6G-CS-001 / PQR-04",
    category: "Safety & Quality",
    validity: "Calibrated & Validated",
    coverage: "6G Position Radiographic Testing (RT) Pass for Carbon & Alloy Steels",
    status: "Compliant",
  },
];

export function ComplianceCertificatesViewer() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Tax & Corporate", "Labour & Insurance", "Safety & Quality"];

  const filteredCerts = activeCategory === "All"
    ? certificates
    : certificates.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-0">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <SealCheck className="w-4 h-4 text-emerald-400" weight="fill" />
            Statutory Legal & Insurance Dossier
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Compliance & Insurance Certifications
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-xs self-start md:self-auto">
          <CheckCircle className="w-4 h-4" weight="fill" />
          <span>100% Statutory Compliant</span>
        </div>
      </div>

      {/* Category Tabs */}
      {/* Category Filter Tabs (Swipeable on Mobile) */}
      <div className="bg-[#0B1120] border-b border-slate-800 px-4 py-2.5 flex items-center gap-2 overflow-x-auto sm:flex-wrap pb-2.5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex-shrink-0 ${
              activeCategory === cat
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-sm space-y-4 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-xs uppercase">
                  {cert.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" weight="fill" />
                  {cert.status}
                </span>
              </div>

              <h4 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors leading-snug">
                {cert.title}
              </h4>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="text-slate-500 text-[11px]">
                  Reg / Code: <strong className="text-slate-900 font-bold">{cert.regNumber}</strong>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Issuing Authority: <span className="text-slate-700">{cert.authority}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 font-sans leading-relaxed pt-1 border-t border-slate-200">
                {cert.coverage}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Validity: {cert.validity}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" weight="bold" />
                <span>Verify Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl border border-slate-300 space-y-0">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  Verified Statutory Document Record
                </span>
                <h4 className="text-base font-heading font-bold uppercase text-white">
                  {selectedCert.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1 text-slate-400 hover:text-white rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Registration / Code:</span>
                  <strong className="text-slate-900 text-sm font-black">{selectedCert.regNumber}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Issuing Body:</span>
                  <span className="text-slate-800 font-semibold">{selectedCert.authority}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Category:</span>
                  <span className="text-slate-800 font-semibold">{selectedCert.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Compliance Validity:</span>
                  <span className="text-emerald-700 font-bold">{selectedCert.validity}</span>
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-900 block font-heading uppercase text-xs">
                  Scope of Statutory Protection & Coverage:
                </strong>
                <p className="text-slate-600 leading-relaxed font-sans text-xs">
                  {selectedCert.coverage}. All deployed personnel are registered under the official establishment roster with transparent statutory filing and wage credit verification.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-[11px] font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" weight="fill" />
                <span>Verified against Government of Odisha & Central Portal Registries.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                GSTIN: 21AAFFL7905E1ZO
              </span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase rounded-xs transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
