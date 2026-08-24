"use client";

import { useActionState } from "react";
import { trackEnquiryAction, EnquiryTrackingResult } from "@/app/actions/trackActions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { 
  MagnifyingGlass, 
  Buildings, 
  CheckCircle, 
  Clock, 
  Warning, 
  ArrowLeft,
  Phone,
  EnvelopeSimple,
  HardHat
} from "@phosphor-icons/react";

const initialState: EnquiryTrackingResult = {
  found: false,
};

export default function EnquiryTrackPage() {
  const [state, formAction, isPending] = useActionState(trackEnquiryAction, initialState);

  return (
    <div className="bg-[#F8FAFC] min-h-[80vh] text-slate-900">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <span>/</span>
            <span>Commercial Requisition Tracker</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Track Project Enquiry / Manpower Requisition
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Look up status updates for your commercial quotation request or trade requisition using your Reference ID (e.g. <span className="font-mono text-amber-400 font-bold">LT-PE-2026-0001</span> or <span className="font-mono text-amber-400 font-bold">LT-ME-2026-0001</span>).
          </p>
        </div>
      </section>

      {/* Lookup Form & Results */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Card */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-4">
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Enquiry Reference ID or Registered Phone Number *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="query"
                  required
                  placeholder="e.g. LT-PE-2026-0001 or 9876543210"
                  className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-sm text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <MagnifyingGlass className="w-4 h-4" weight="bold" />
                  {isPending ? "Checking..." : "Track Status"}
                </button>
              </div>
            </div>

            {state.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-xs font-mono text-red-700 flex items-center gap-2">
                <Warning className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{state.error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Results Card */}
        {state.found && state.enquiry && (
          <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-6 p-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {state.enquiryType === "project" ? "Project Lead Scope" : "Manpower Requisition Scope"}
                </span>
                <h3 className="text-xl font-heading font-black text-slate-900 uppercase">
                  {state.enquiry.companyName}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-900 text-amber-400 rounded-xs uppercase">
                  {state.enquiry.enquiryId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-sm border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Contact Person</span>
                <span className="text-slate-900 font-bold text-sm">{state.enquiry.contactPerson}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Submission Date</span>
                <span className="text-slate-800">{formatDate(state.enquiry.createdAt)}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Processing Status</span>
                <span className="text-emerald-700 font-bold uppercase text-sm">{state.enquiry.status}</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm text-xs font-sans text-amber-950 space-y-1">
              <span className="font-heading font-bold uppercase block text-[11px] text-amber-900">
                Scope / Trades Requested:
              </span>
              <p className="font-mono text-slate-800">{state.enquiry.scopeOrTrade}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>Need urgent commercial quotation turnaround?</span>
              <a
                href="tel:7073877299"
                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Project Desk: +91 7073877299
              </a>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
