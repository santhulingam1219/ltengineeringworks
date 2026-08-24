import Link from "next/link";
import { 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  ShieldCheck, 
  LockKey,
  ArrowRight,
  HardHat,
  Buildings,
  Wrench
} from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-[#0B1120] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile & Verified Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white/95 rounded-sm p-1 flex items-center justify-center border border-amber-400/30 shadow-sm flex-shrink-0">
                <img
                  src="/images/logo.webp"
                  alt="LT Engineering Works"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white tracking-tight uppercase block leading-none">
                  LT Engineering Works
                </span>
                <span className="text-[11px] font-mono text-amber-400 block mt-1">
                  Mechanical, Civil & Water Projects
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Industrial project execution, structural fabrication, heavy erection, piping works, and skilled manpower contracting company based in Paradeep, Odisha.
            </p>
            
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-sm space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-amber-500" weight="fill" />
                <span>GSTIN: <strong className="text-amber-400">21AAFFL7905E1ZO</strong></span>
              </div>
              <div className="text-[11px] text-slate-400">
                Partner: <strong className="text-slate-300">Lingam Duryodhana</strong>
              </div>
              <div className="text-[11px] text-slate-400">
                Manager: <strong className="text-slate-300">Lingam Tarakeswar Rao</strong>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Disciplines */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              Core Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/structural-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Buildings className="w-3.5 h-3.5 text-slate-500" />
                  Heavy Structural Works & Erection
                </Link>
              </li>
              <li>
                <Link href="/services/fabrication-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-slate-500" />
                  Shop & On-Site Steel Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services/piping-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  High-Pressure & Utility Piping
                </Link>
              </li>
              <li>
                <Link href="/services/mechanical-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  Mechanical Shutdown Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/civil-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  Industrial Foundations & Civil Works
                </Link>
              </li>
              <li>
                <Link href="/manpower" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-amber-500" />
                  Skilled Industrial Manpower Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Careers */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About LT Engineering Works
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition-colors">
                  Completed Projects (30+ Portfolio)
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold">
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  Current Job Vacancies (Recruitment)
                </Link>
              </li>
              <li>
                <Link href="/safety-quality" className="hover:text-amber-400 transition-colors">
                  Safety & Quality Control Protocols
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Post Client Project Enquiry
                </Link>
              </li>
              <li>
                <Link href="/careers/track" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono text-[11px] text-amber-400">
                  <span>→ Track Application Status</span>
                </Link>
              </li>
              <li>
                <Link href="/track-enquiry" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono text-[11px] text-slate-300">
                  <span>→ Track Enquiry / Requisition</span>
                </Link>
              </li>
              <li>
                <Link href="/capability-statement" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono text-[11px] text-amber-300">
                  <span>📄 Capability Statement (PDF / Print)</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 pt-2 font-mono text-[11px]">
                  <LockKey className="w-3.5 h-3.5" />
                  Authorized Staff Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Registered Office & Direct Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              Registered Office
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <address className="not-italic text-slate-300 leading-relaxed">
                  Ground Floor, Plot No. 1/298, Khata No. 23/430,<br />
                  Sandhakuda City, Paradeep,<br />
                  Dist. Jagatsinghpur, Odisha – 754142
                </address>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <a href="tel:7073877299" className="hover:text-amber-400 text-slate-200">
                    +91 7073877299
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <a href="tel:9963008256" className="hover:text-amber-400 text-slate-200">
                    +91 9963008256
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeSimple className="w-3.5 h-3.5 text-amber-500" />
                  <a href="mailto:ltengineeringworks7020@gmail.com" className="hover:text-amber-400 text-slate-300 text-[11px]">
                    ltengineeringworks7020@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} LT Engineering Works. All rights reserved. Registered under GST Act, Odisha.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Engagement
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400">
              <LockKey className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
