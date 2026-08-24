"use client";

import { useActionState } from "react";
import { trackApplicationAction, ApplicationTrackingResult } from "@/app/actions/trackActions";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { 
  MagnifyingGlass, 
  HardHat, 
  CheckCircle, 
  Clock, 
  Warning, 
  ArrowLeft,
  Phone,
  ShieldCheck
} from "@phosphor-icons/react";

const initialState: ApplicationTrackingResult = {
  found: false,
};

export default function ApplicationTrackPage() {
  const [state, formAction, isPending] = useActionState(trackApplicationAction, initialState);

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return 1;
      case "under_review":
        return 2;
      case "shortlisted":
        return 3;
      case "selected":
      case "joined":
        return 4;
      case "rejected":
        return -1;
      default:
        return 1;
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[80vh] text-slate-900">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/careers" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Careers
            </Link>
            <span>/</span>
            <span>Applicant Tracker</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Track Application Status
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Enter your Application ID (e.g. <span className="font-mono text-amber-400 font-bold">LT-2026-000001</span>) or registered Mobile Number to check real-time recruitment status.
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
                Application Reference ID or Mobile Number *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="query"
                  required
                  placeholder="e.g. LT-2026-000001 or 9876543210"
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

        {/* Tracking Results Card */}
        {state.found && state.application && (
          <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden space-y-6 p-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  Application Record Found
                </span>
                <h3 className="text-xl font-heading font-black text-slate-900 uppercase">
                  {state.application.fullName}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-900 text-amber-400 rounded-xs uppercase">
                  ID: {state.application.applicationId}
                </span>
              </div>
            </div>

            {/* Application Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-sm border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Trade Position</span>
                <span className="text-slate-900 font-bold text-sm">{state.application.positionAppliedFor}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Submission Date</span>
                <span className="text-slate-800">{formatDate(state.application.createdAt)}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Current Status</span>
                <span className="text-amber-700 font-bold uppercase text-sm">{state.application.status}</span>
              </div>
            </div>

            {/* 4-Step Recruitment Status Stepper */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 block">
                Recruitment Progress Pipeline
              </span>

              {state.application.status === "rejected" ? (
                <div className="p-4 bg-red-50 border border-red-200 text-xs font-mono text-red-700 rounded-sm">
                  Application not shortlisted for the current work front. Your profile remains active in our database for future requirements.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { step: 1, label: "Application Received", desc: "Registered in system" },
                    { step: 2, label: "Under Review", desc: "HR trade evaluation" },
                    { step: 3, label: "Shortlisted", desc: "Trade test scheduled" },
                    { step: 4, label: "Selected / Mobilized", desc: "Site deployment ready" },
                  ].map((s) => {
                    const currentStep = getStatusStep(state.application!.status);
                    const isCompleted = currentStep >= s.step;
                    const isCurrent = currentStep === s.step;

                    return (
                      <div
                        key={s.step}
                        className={`p-3 rounded-sm border text-xs ${
                          isCurrent
                            ? "bg-amber-500/15 border-amber-500 text-slate-950 font-bold"
                            : isCompleted
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : "bg-slate-50 border-slate-200 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px]">
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" weight="fill" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>Step 0{s.step}</span>
                        </div>
                        <div className="font-heading uppercase text-xs">{s.label}</div>
                        <div className="text-[10px] font-sans font-normal opacity-80">{s.desc}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Helpline Notice */}
            <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>Have questions about your trade test?</span>
              <a
                href="tel:7073877299"
                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Recruitment: +91 7073877299
              </a>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
