"use client";

import { useActionState } from "react";
import { submitProjectEnquiryAction, EnquirySubmissionResult } from "@/app/actions/enquiryActions";
import { CheckCircle, Warning, ArrowRight, ShieldCheck, FileText } from "@phosphor-icons/react";

const initialState: EnquirySubmissionResult = {
  success: false,
};

export function ProjectEnquiryForm({ initialService = "" }: { initialService?: string }) {
  const [state, formAction, isPending] = useActionState(submitProjectEnquiryAction, initialState);

  if (state.success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7" weight="bold" />
        </div>
        <h3 className="text-xl font-heading font-black text-emerald-800 uppercase tracking-tight">
          Project Enquiry Submitted Successfully
        </h3>
        <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
          {state.message}
        </p>
        <div className="inline-block p-3 bg-white border border-emerald-300 rounded-sm text-xs font-mono font-bold text-slate-900">
          Enquiry Tracking ID: <span className="text-emerald-700">{state.enquiryId}</span>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">
          Our engineering team will review your specifications and contact you shortly.
        </p>
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
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            required
            placeholder="e.g. Acme Petrochemicals Ltd."
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
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Designation / Role
          </label>
          <input
            type="text"
            name="designation"
            placeholder="e.g. Project Manager / Lead Engineer"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Mobile Number *
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
            placeholder="e.g. rajesh@company.com"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Project Location
          </label>
          <input
            type="text"
            name="projectLocation"
            placeholder="e.g. Paradeep / Angul / Jajpur"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Required Service Discipline
          </label>
          <select
            name="requiredService"
            defaultValue={initialService || "Structural Works"}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="Structural Works">Structural Works</option>
            <option value="Fabrication Works">Fabrication Works</option>
            <option value="Erection Works">Erection Works</option>
            <option value="Piping Works">Piping Works</option>
            <option value="Mechanical Works">Mechanical Works</option>
            <option value="Civil Works">Civil Works</option>
            <option value="Equipment Works">Equipment Works</option>
            <option value="Skilled Manpower">Skilled Manpower Supply</option>
            <option value="Complete Project Execution">Complete Turnkey Package</option>
            <option value="Other">Other Specialized Engineering</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Estimated Workforce / Tonnage
          </label>
          <input
            type="text"
            name="estimatedWorkforce"
            placeholder="e.g. 50 workers or 300 MT steel"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Project Scope Description & Details *
        </label>
        <textarea
          name="projectDescription"
          required
          rows={4}
          placeholder="Please describe the scope of work, project duration, site requirements, or specific technical criteria..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? "Submitting Scope..." : "Submit Project Enquiry"}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </form>
  );
}
