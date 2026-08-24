import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export function ProjectEnquiryCTA() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#0B1120] text-white border-b border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 rounded-xs sm:rounded-sm shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Direct Engineering Consultation</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight uppercase text-white leading-tight">
              Have an Industrial Project or Manpower Requirement?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Submit your project drawings, BOQ, or manpower requisition. Our senior engineering management will review your scope and provide a structured technical proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 w-full lg:w-auto flex-shrink-0">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xs transition-all shadow-md active:scale-95 text-center"
            >
              <span>Post Project Enquiry</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>

            <a
              href="tel:7073877299"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-xs border border-slate-700 transition-all active:scale-95 text-center"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: +91 7073877299</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
