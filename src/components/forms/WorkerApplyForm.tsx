"use client";

import { useActionState } from "react";
import { submitWorkerApplicationAction, ApplicationResult } from "@/app/actions/applicationActions";
import { CheckCircle, Warning, ArrowRight, HardHat, FileText, Phone } from "@phosphor-icons/react";

const initialState: ApplicationResult = {
  success: false,
};

interface WorkerApplyFormProps {
  vacancyId?: string;
  defaultPosition?: string;
  onSuccess?: () => void;
}

export function WorkerApplyForm({ vacancyId, defaultPosition = "", onSuccess }: WorkerApplyFormProps) {
  const [state, formAction, isPending] = useActionState(submitWorkerApplicationAction, initialState);

  if (state.success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-8 h-8" weight="bold" />
        </div>

        <h3 className="text-xl font-heading font-black text-emerald-800 uppercase tracking-tight">
          Application Submitted Successfully
        </h3>

        <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
          Your application for <strong className="text-slate-900">{state.positionAppliedFor}</strong> has been registered with LT Engineering Works recruitment office.
        </p>

        <div className="inline-block p-4 bg-white border border-emerald-300 rounded-sm shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 block uppercase">
            Official Application Tracking ID
          </span>
          <span className="text-lg font-mono font-black text-slate-950 tracking-wider">
            {state.applicationId}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 font-mono">
          Please note down your Application ID. Our recruitment team will contact you on your registered mobile number.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-sm text-xs font-mono text-red-700 flex items-center gap-2">
          <Warning className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {vacancyId && <input type="hidden" name="vacancyId" value={vacancyId} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Position Applied For *
          </label>
          <input
            type="text"
            name="positionAppliedFor"
            required
            defaultValue={defaultPosition}
            placeholder="e.g. Structural Fabricator / Fitter"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name (As per ID / Aadhaar) *
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. Suresh Jena"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Primary Mobile Number (Calling / WhatsApp) *
          </label>
          <input
            type="tel"
            name="mobileNumber"
            required
            placeholder="e.g. 9876543210"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Alternate Mobile / Family Contact
          </label>
          <input
            type="tel"
            name="altMobileNumber"
            placeholder="e.g. 9988776655"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Total Years of Experience
          </label>
          <select
            name="yearsOfExperience"
            defaultValue="2-5 Years"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="Fresher / < 1 Year">Fresher / Less than 1 Year</option>
            <option value="1-2 Years">1 – 2 Years</option>
            <option value="2-5 Years">2 – 5 Years</option>
            <option value="5-8 Years">5 – 8 Years</option>
            <option value="8+ Years">8+ Years Experience</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Highest Qualification / Trade
          </label>
          <input
            type="text"
            name="qualification"
            placeholder="e.g. ITI Fitter / Diploma Mech / Metric"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Current Town / Native District
          </label>
          <input
            type="text"
            name="currentLocation"
            placeholder="e.g. Jagatsinghpur / Cuttack / Kendrapara"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            When can you join the site?
          </label>
          <select
            name="joiningAvailability"
            defaultValue="Immediate"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="Immediate">Immediate Joining (Within 24-48 Hours)</option>
            <option value="Within 7 Days">Within 7 Days</option>
            <option value="Within 15 Days">Within 15 Days</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Trade Skills & Previous Work Experience Details
        </label>
        <textarea
          name="skills"
          rows={3}
          placeholder="Mention previous companies worked with, types of projects (e.g., refinery piping, crane rigging, structural erection)..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? "Submitting Application..." : "Submit Job Application"}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </form>
  );
}
