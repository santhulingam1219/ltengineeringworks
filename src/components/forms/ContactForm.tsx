"use client";

import { useActionState } from "react";
import { submitContactEnquiryAction, EnquirySubmissionResult } from "@/app/actions/enquiryActions";
import { CheckCircle, Warning, ArrowRight } from "@phosphor-icons/react";

const initialState: EnquirySubmissionResult = {
  success: false,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactEnquiryAction, initialState);

  if (state.success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7" weight="bold" />
        </div>
        <h3 className="text-xl font-heading font-black text-emerald-800 uppercase tracking-tight">
          Message Sent Successfully
        </h3>
        <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
          {state.message}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Anand Patra"
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
            placeholder="e.g. anand@example.com"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Company / Organization (Optional)
          </label>
          <input
            type="text"
            name="company"
            placeholder="e.g. Industrial Solutions"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Inquiry Category
          </label>
          <select
            name="category"
            defaultValue="general"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="general">General Business Inquiry</option>
            <option value="project">Project Execution Inquiry</option>
            <option value="manpower">Manpower Requirement</option>
            <option value="job">Worker Job Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="e.g. Inquiry regarding structural works"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Message / Requirement Details *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Please write your inquiry here..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? "Sending Message..." : "Send Message"}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </form>
  );
}
