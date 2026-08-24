"use client";

import { useActionState } from "react";
import { submitManpowerEnquiryAction, EnquirySubmissionResult } from "@/app/actions/enquiryActions";
import { CheckCircle, Warning, ArrowRight, HardHat } from "@phosphor-icons/react";

const initialState: EnquirySubmissionResult = {
  success: false,
};

export function ManpowerEnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitManpowerEnquiryAction, initialState);

  if (state.success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7" weight="bold" />
        </div>
        <h3 className="text-xl font-heading font-black text-emerald-800 uppercase tracking-tight">
          Manpower Requisition Received
        </h3>
        <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
          {state.message}
        </p>
        <div className="inline-block p-3 bg-white border border-emerald-300 rounded-sm text-xs font-mono font-bold text-slate-900">
          Requisition ID: <span className="text-emerald-700">{state.enquiryId}</span>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-sm text-xs font-mono text-red-700 flex items-center gap-2">
          <Warning className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Company / Contractor Name *
          </label>
          <input
            type="text"
            name="companyName"
            required
            placeholder="e.g. Reliance / IOCL Vendor"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Contact Person Name *
          </label>
          <input
            type="text"
            name="contactPerson"
            required
            placeholder="e.g. Site In-charge Name"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Contact Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="e.g. +91 9876543210"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="e.g. procurement@company.com"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Work Site Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Paradeep Port Area / Dhamra / Angul"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Total Workers / Headcount Needed
          </label>
          <input
            type="number"
            name="totalWorkersNeeded"
            placeholder="e.g. 50"
            min="1"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Required Trades & Breakdown *
        </label>
        <textarea
          name="requiredPositions"
          required
          rows={3}
          placeholder="e.g. 20x Structural Fitters, 15x Welder 6G, 10x Riggers, 2x Supervisors..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Estimated Project Duration
          </label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 3 Months Shutdown / 1 Year Project"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Accommodation & Food Arrangement
          </label>
          <input
            type="text"
            name="additionalRequirements"
            placeholder="e.g. Client provides camp accommodation / Contractor scope"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? "Submitting Requisition..." : "Submit Manpower Requisition"}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </form>
  );
}
