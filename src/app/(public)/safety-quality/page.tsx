import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { SafetyAuditChecksheet } from "@/components/public/SafetyAuditChecksheet";
import { SafetyInductionPortal } from "@/components/public/SafetyInductionPortal";
import { 
  ShieldCheck, 
  HardHat, 
  CheckCircle, 
  Warning, 
  Wrench, 
  Certificate,
  ArrowRight
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Safety & Quality Control Protocols",
  description:
    "LT Engineering Works adheres to rigorous industrial safety, PPE guidelines, hazard identification, and quality assurance standards across all project execution sites.",
};

export default function SafetyQualityPage() {
  const safetyProtocols = [
    {
      title: "100% PPE Enforcement",
      desc: "Mandatory industrial helmets, high-visibility safety jackets, steel-toe boots, safety goggles, and double-lanyard safety harnesses at height.",
    },
    {
      title: "Daily Tool-Box Talks (TBT)",
      desc: "Mandatory pre-shift briefings conducted by site supervisors to evaluate specific work front hazards, crane movement, and weather conditions.",
    },
    {
      title: "Job Hazard Analysis (JHA)",
      desc: "Systematic hazard evaluation prior to commencing critical lifts, hot work in hazardous zones, confined space entry, and hydro-testing.",
    },
    {
      title: "Rigging & Lifting Audits",
      desc: "Routine physical inspection and load-testing verification of all wire ropes, web slings, shackles, chain pulleys, and crane winches.",
    },
  ];

  const qualityProtocols = [
    {
      title: "Drawing & Isometric Conformance",
      desc: "Strict adherence to approved client structural and isometric fabrication drawings with documented fit-up inspection sign-offs.",
    },
    {
      title: "Welding & NDT Protocols",
      desc: "WPS/PQR compliant welding execution with full support for Radiography (RT), Ultrasonic (UT), Magnetic Particle (MPI), and Dye Penetrant (DPT) testing.",
    },
    {
      title: "Precision Dimensional Checks",
      desc: "Laser alignment, plumbness checks for structural columns, and flange squareness verification to minimize on-site erection rework.",
    },
    {
      title: "Pressure & Hydro Testing",
      desc: "Pneumatic and hydrostatic testing of fabricated pipe spools and manifolds to specified test pressures with calibrated pressure gauges.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Page Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Zero Compromise Culture
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Safety & Quality Standards
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Executing industrial works safely and delivering uncompromising quality on every structural, piping, and mechanical work front.
          </p>
        </div>
      </section>

      {/* Safety Commitment Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Safety Header */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-sm border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                HSE Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
                Workplace Safety Policy & Procedures
              </h2>
            </div>
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xs text-amber-400 font-mono text-xs font-bold uppercase tracking-wider self-start md:self-auto">
              Target: Zero Lost-Time Incidents (LTI)
            </div>
          </div>

          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            At LT Engineering Works, safety is non-negotiable. Every technician and supervisor mobilized to a project site undergoes thorough induction and daily monitoring. We believe that no job is so urgent that it cannot be executed safely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {safetyProtocols.map((p, i) => (
              <div key={i} className="bg-slate-950/80 p-5 rounded-sm border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-heading font-bold uppercase text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" weight="fill" />
                  <span>{p.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Site Safety & QA Photography Showcase (3-Card Visual Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tool-box talk */}
          <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-96 shadow-lg flex items-end p-4 sm:p-5 group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 bg-[url('/images/safety-toolbox-talk-mobile.webp')] sm:bg-[url('/images/safety-toolbox-talk.webp')]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="relative z-10 w-full space-y-1.5 bg-slate-950/80 border border-slate-700/80 p-3.5 rounded-sm shadow-xl backdrop-blur-md">
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
                Daily Site Safety Protocol
              </span>
              <h4 className="text-base font-heading font-black uppercase text-white tracking-tight leading-snug">
                Morning Tool-Box Talk (TBT)
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Mandatory pre-shift hazard assessment, PPE inspection, and work permit sign-off.
              </p>
            </div>
          </div>

          {/* Card 2: On-site Inspection in Paradeep */}
          <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-96 shadow-lg flex items-end p-4 sm:p-5 group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 bg-[url('/images/safety-inspection-odisha-mobile.webp')] sm:bg-[url('/images/safety-inspection-odisha.webp')]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="relative z-10 w-full space-y-1.5 bg-slate-950/80 border border-slate-700/80 p-3.5 rounded-sm shadow-xl backdrop-blur-md">
              <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
                On-Site QA/QC Audits
              </span>
              <h4 className="text-base font-heading font-black uppercase text-white tracking-tight leading-snug">
                Structural & Weld Inspection
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Certified safety engineers inspecting structural column welds and crane rigging in Paradeep.
              </p>
            </div>
          </div>

          {/* Card 3: Laser Alignment */}
          <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-96 shadow-lg flex items-end p-4 sm:p-5 group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('/images/laser-alignment-machine.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="relative z-10 w-full space-y-1.5 bg-slate-950/80 border border-slate-700/80 p-3.5 rounded-sm shadow-xl backdrop-blur-md">
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
                Precision Calibration
              </span>
              <h4 className="text-base font-heading font-black uppercase text-white tracking-tight leading-snug">
                Laser Rotary Shaft Alignment
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Calibrated optical alignment and dial indicator verification for heavy machinery.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Assurance Section */}
        <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
              QA / QC Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-slate-900">
              Quality Assurance & Inspection Standards
            </h2>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">
              Our quality assurance framework guarantees that all fabrication, piping assemblies, and equipment alignment adhere strictly to project specifications, client engineering codes, and third-party inspection standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualityProtocols.map((q, i) => (
              <div key={i} className="bg-[#F8FAFC] p-6 rounded-sm border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-heading font-bold uppercase text-sm">
                  <Certificate className="w-4 h-4 text-blue-600 flex-shrink-0" weight="bold" />
                  <span>{q.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Digital Safety Checksheet */}
        <SafetyAuditChecksheet />

        {/* Interactive Site Safety Induction & Readiness Assessment */}
        <SafetyInductionPortal />

        {/* Safety & Compliance FAQs */}
        <div>
          <FaqAccordion
            title="Site Safety & Compliance FAQs"
            items={[
              {
                question: "What is the mandatory PPE requirement for site mobilization?",
                answer: "Every personnel mobilized by LT Engineering Works is issued certified ISI-marked hard hats, steel-toe safety footwear, high-visibility reflective vests, safety goggles, and EN 361 certified full-body safety harnesses with twin shock-absorbing lanyards for work at heights.",
              },
              {
                question: "How are Tool-Box Talks (TBT) documented on site?",
                answer: "Site supervisors conduct mandatory 15-minute TBT sessions at the start of every shift. Attendance rosters, work-specific hazard identifications, and permit-to-work numbers are formally logged and submitted to the principal employer safety officer daily.",
              },
              {
                question: "What medical fitness protocols are maintained for workers?",
                answer: "All workforce members undergo pre-employment medical examinations, height-pass fitness certifications, and periodic health checkups per statutory factory and construction safety regulations.",
              },
            ]}
          />
        </div>

      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B1120] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-white">
              Looking for a Compliant Industrial Contractor?
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Connect with our management to discuss your site safety requirements and project scopes.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all active:scale-[0.98] flex-shrink-0"
          >
            Post Project Enquiry
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      </section>

    </div>
  );
}
