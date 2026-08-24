import Link from "next/link";
import { 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  HardHat,
  Buildings,
  Wrench,
  FilePdf,
  CheckCircle,
  Clock,
  Compass
} from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="w-full bg-[#080D1A] text-slate-300 border-t border-slate-800/90 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container - Exactly matching Header Width (1480px + xl:px-12) */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* 4-Column Main Industrial Footer Grid (Fully Spanning Left-to-Right) */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 border-b border-slate-800/80">
          
          {/* Column 1: Brand Profile & Statutory Verification (Span 4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-12 w-12 bg-white/95 rounded-sm p-1.5 flex items-center justify-center border border-amber-400/30 group-hover:border-amber-400 transition-all shadow-sm flex-shrink-0">
                <img
                  src="/images/logo.webp"
                  alt="LT Engineering Works"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight uppercase block leading-none group-hover:text-amber-400 transition-colors">
                  LT Engineering Works
                </span>
                <span className="text-[10px] font-mono text-amber-400 block mt-1 tracking-wider uppercase">
                  Mechanical • Civil • Water Projects
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Industrial project execution, heavy structural fabrication, precision equipment erection, process piping, and skilled industrial workforce contracting firm operating out of Paradeep Port, Odisha.
            </p>
            
            {/* Statutory Credential Seal Card */}
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-sm space-y-2 text-xs font-mono shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-amber-400" weight="fill" />
                  <span className="font-bold">GSTIN:</span>
                </div>
                <span className="font-mono font-black text-amber-400 tracking-wider">
                  21AAFFL7905E1ZO
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-0.5">
                <div>
                  Partner: <span className="text-slate-200 block font-sans font-semibold">Lingam Duryodhana</span>
                </div>
                <div>
                  Manager: <span className="text-slate-200 block font-sans font-semibold">Lingam Tarakeswar Rao</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Core Engineering Capabilities (Span 3 cols on Desktop) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2.5 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/services/structural-works" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <Buildings className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  <span>Heavy Structural Works & Erection</span>
                </Link>
              </li>
              <li>
                <Link href="/services/fabrication-works" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <Wrench className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  <span>Shop & On-Site Steel Fabrication</span>
                </Link>
              </li>
              <li>
                <Link href="/services/piping-works" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  <span>High-Pressure & Process Piping</span>
                </Link>
              </li>
              <li>
                <Link href="/services/mechanical-works" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  <span>Mechanical Shutdown Maintenance</span>
                </Link>
              </li>
              <li>
                <Link href="/services/civil-works" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 flex-shrink-0" />
                  <span>Industrial Equipment Foundations</span>
                </Link>
              </li>
              <li>
                <Link href="/manpower" className="text-amber-300 font-semibold hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <HardHat className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Skilled Industrial Manpower Supply</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Verification Portals (Span 2 cols on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              Quick Portals
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-amber-400 transition-colors block">
                  About LT Engineering
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-amber-400 transition-colors block">
                  Project Portfolio (30+)
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  <span>Job Vacancies</span>
                </Link>
              </li>
              <li>
                <Link href="/safety-quality" className="text-slate-400 hover:text-amber-400 transition-colors block">
                  HSE & Quality Protocols
                </Link>
              </li>
              <li>
                <Link href="/careers/track" className="text-amber-400 hover:text-amber-300 transition-colors block font-mono text-[11px]">
                  → Track Application
                </Link>
              </li>
              <li>
                <Link href="/track-enquiry" className="text-amber-400 hover:text-amber-300 transition-colors block font-mono text-[11px]">
                  → Track Requisition
                </Link>
              </li>
              <li>
                <Link href="/capability-statement" className="text-slate-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-mono text-[11px] pt-1">
                  <FilePdf className="w-3.5 h-3.5 text-amber-400" />
                  <span>Capability Statement</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Registered Office & 24/7 Dispatch Hotlines (Span 3 cols on Desktop, Right Anchor) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Paradeep Headquarters
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <address className="not-italic text-slate-300 leading-relaxed font-sans">
                  Ground Floor, Plot No. 1/298, Khata No. 23/430,<br />
                  Sandhakuda City, Paradeep,<br />
                  Dist. Jagatsinghpur, Odisha – 754142
                </address>
              </div>

              {/* 1-Tap Dial Phone Links & Email */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-sm space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" weight="bold" />
                  <a href="tel:+917073877299" className="hover:text-amber-400 text-slate-100 font-bold transition-colors">
                    +91 7073877299
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" weight="bold" />
                  <a href="tel:+919963008256" className="hover:text-amber-400 text-slate-100 font-bold transition-colors">
                    +91 9963008256
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                  <EnvelopeSimple className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <a href="mailto:ltengineeringworks7020@gmail.com" className="hover:text-amber-400 text-slate-300 text-[11px] truncate transition-colors">
                    ltengineeringworks7020@gmail.com
                  </a>
                </div>
              </div>

              {/* Live Operational Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-xs text-[10px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Site Operations: 24/7 Turnaround Ready</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Full-Span Copyright Bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono text-center sm:text-left">
          <div className="leading-relaxed">
            © {new Date().getFullYear()} <strong className="text-slate-400">LT Engineering Works</strong>. All rights reserved. Registered under GST Act, Odisha.
          </div>
          
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Engagement
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
