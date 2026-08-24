import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityDownloadButton } from "@/components/public/CapabilityDownloadButton";
import { VendorPrequalificationForm } from "@/components/public/VendorPrequalificationForm";
import { 
  ShieldCheck, 
  Printer, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  Buildings, 
  HardHat, 
  Wrench, 
  CheckCircle,
  ClockCounterClockwise,
  ArrowRight
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Corporate Capability Statement & Datasheet | LT Engineering Works",
  description:
    "Official capability profile, statutory credentials, and technical scope of execution for LT Engineering Works in Paradeep, Odisha.",
};

export default function CapabilityStatementPage() {
  const capabilities = [
    {
      title: "Industrial Structural Works & Erection",
      desc: "Heavy factory sheds, industrial platforms, pipe racks, conveyor galleries, and high-elevation structural steel frameworks.",
    },
    {
      title: "Structural & Tank Steel Fabrication",
      desc: "Precision gas cutting, beveling, layout marking, fit-up, and shop floor assembly per approved engineering blueprints.",
    },
    {
      title: "Utility & Process Piping Networks",
      desc: "High-pressure utility, compressed air, cooling water, chemical, and slurry pipelines with hydro-testing.",
    },
    {
      title: "Mechanical Equipment & Machinery Erection",
      desc: "Rotary & static equipment installation, heavy pump skids, conveyors, gearboxes, and baseline laser alignment.",
    },
    {
      title: "Industrial Civil Foundations & Works",
      desc: "Heavy machine foundations, equipment pedestal RCC, concrete trenches, and retaining structures.",
    },
    {
      title: "Skilled & Semi-Skilled Manpower Mobilization",
      desc: "Site engineers, discipline supervisors, 6G welders, structural fabricators, pipe fitters, and heavy riggers.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Top Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-amber-600 flex items-center gap-1"
        >
          ← Back to Homepage
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Submit Enquiry
          </Link>
          <CapabilityDownloadButton />
        </div>
      </div>

      {/* Printable Paper Container */}
      <div className="max-w-4xl mx-auto border border-slate-300 rounded-xs p-8 sm:p-12 shadow-md space-y-8 bg-white print:border-0 print:shadow-none print:p-0">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" weight="fill" />
              Official Corporate Capability Statement
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-slate-950 uppercase">
              LT Engineering Works
            </h1>
            <p className="text-xs font-mono text-slate-700 uppercase font-semibold">
              Mechanical, Civil & Water Projects Etc.
            </p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-xs font-mono text-slate-500 block uppercase">Registration / GSTIN</span>
            <span className="text-base font-mono font-black text-slate-950 tracking-wider bg-slate-100 px-2.5 py-1 rounded-xs inline-block">
              21AAFFL7905E1ZO
            </span>
          </div>
        </div>

        {/* Corporate Profile Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 border-l-2 border-amber-500 pl-2">
            1. Corporate Summary & Positioning
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
            LT Engineering Works is an industrial project execution, structural fabrication, piping, and technical manpower mobilization firm headquartered in Sandhakuda City, Paradeep, Odisha. With execution capabilities across heavy engineering sectors, we deploy experienced site engineers, certified tradesmen, and safety supervisors for greenfield installations, plant expansions, and planned turnaround packages.
          </p>
        </div>

        {/* Core Capabilities Grid */}
        <div className="space-y-4">
          <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 border-l-2 border-amber-500 pl-2">
            2. Core Engineering Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" weight="bold" />
                  <h3 className="font-heading font-bold text-xs text-slate-900 uppercase">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed pl-6">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Office Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
          <div className="space-y-2 text-xs font-mono">
            <h3 className="font-heading font-bold uppercase text-slate-900 text-xs">
              Executive Management
            </h3>
            <div className="text-slate-700 space-y-1">
              <div>Partner: <strong className="text-slate-950">Lingam Duryodhana</strong></div>
              <div>Manager: <strong className="text-slate-950">Lingam Tarakeswar Rao</strong></div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <h3 className="font-heading font-bold uppercase text-slate-900 text-xs">
              Registered Head Office Coordinates
            </h3>
            <address className="not-italic text-slate-700 leading-relaxed">
              Ground Floor, Plot No. 1/298, Khata No. 23/430,<br />
              Sandhakuda City, Paradeep,<br />
              Dist. Jagatsinghpur, Odisha – 754142<br />
              Phones: +91 7073877299 / 9963008256<br />
              Email: ltengineeringworks7020@gmail.com
            </address>
          </div>
        </div>

        {/* Quality & Safety Statement */}
        <div className="p-4 bg-slate-900 text-white rounded-xs space-y-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
            <ShieldCheck className="w-4 h-4" weight="fill" />
            <span>Zero-Harm Safety & Quality Standard</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
            All site deployments adhere to mandatory daily Tool-Box Talks (TBT), strict 100% PPE compliance, hot work safety permits, and certified NDT weld quality inspection protocols.
          </p>
        </div>

      </div>

      {/* Interactive Vendor Prequalification Pack Generator (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mt-8 print:hidden">
        <VendorPrequalificationForm />
      </div>

    </div>
  );
}
