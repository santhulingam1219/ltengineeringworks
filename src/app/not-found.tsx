import Link from "next/link";
import { Warning, ArrowRight, Buildings } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0B1120] text-white flex flex-col items-center justify-center px-4 py-16 text-center space-y-6 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-md">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-sm flex items-center justify-center text-amber-400 mx-auto">
          <Warning className="w-9 h-9" weight="bold" />
        </div>

        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
          404 — Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
          Resource Unavailable
        </h1>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          The project, vacancy, or engineering page you requested does not exist or has been relocated by LT Engineering Works administration.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98]"
          >
            Return to Homepage
          </Link>
          <Link
            href="/projects"
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-sm border border-slate-700 transition-all"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
