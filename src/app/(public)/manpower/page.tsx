import type { Metadata } from "next";
import { ManpowerEnquiryForm } from "@/components/forms/ManpowerEnquiryForm";
import { ScopeEstimator } from "@/components/public/ScopeEstimator";
import { MobilizationSlaVisualizer } from "@/components/public/MobilizationSlaVisualizer";
import { MobilizationCalculator } from "@/components/public/MobilizationCalculator";
import { 
  HardHat, 
  UsersThree, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Buildings,
  ArrowRight
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industrial Manpower Solutions & Crew Mobilization | Paradeep, Odisha",
  description:
    "Deploy certified engineers, site supervisors, structural fabricators, pipe fitters, riggers, and kalassi. Fast, statutory-compliant workforce mobilization by LT Engineering Works.",
};

export default function ManpowerPage() {
  const trades = [
    {
      trade: "Project & Site Engineers",
      desc: "Degree/Diploma engineers experienced in structural erection, piping layouts, QA/QC, and daily site coordination.",
      availability: "Immediate / 7 Days",
    },
    {
      trade: "Site Supervisors & Foremen",
      desc: "Seasoned trade leads responsible for shift allocation, safety enforcement, tonnage tracking, and blueprint compliance.",
      availability: "Immediate Mobilization",
    },
    {
      trade: "Structural & Tank Fabricators",
      desc: "Skilled in marking, gas cutting, beveling, structural fit-ups, and shop floor assembly per technical drawings.",
      availability: "Large Crews Available",
    },
    {
      trade: "Pipe Fitters (CS / SS / Alloy)",
      desc: "Precision spool fit-up, flange alignment, isometric interpretation, and hydro-testing preparation.",
      availability: "Certified Tradesmen",
    },
    {
      trade: "Heavy Riggers & Kalassi",
      desc: "Specialized in high-elevation rigging, crane hitching, heavy machinery shifting, and equipment winching.",
      availability: "Trained & Safety Verified",
    },
    {
      trade: "Computer Operators & Inventory Staff",
      desc: "Site store inventory management, daily progress reporting (DPR), and material reconciliation support.",
      availability: "Site Ready",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Page Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <HardHat className="w-4 h-4 text-amber-400" />
            B2B Workforce Mobilization
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Skilled Industrial Manpower Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Supplying verified, safety-oriented, and trade-certified technical crews for heavy industrial projects, plant turnarounds, and expansion contracts across Odisha.
          </p>
        </div>
      </section>

      {/* Trades Grid & Requisition Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Trades Breakdown */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
              Available Workforce Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-slate-900 mt-1">
              Industrial Trades Ready for Deployment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 p-6 rounded-sm space-y-4 hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-amber-400 rounded-xs">
                      Trade #{i + 1}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                      {t.availability}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                    {t.trade}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {t.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" weight="fill" />
                  <span>Statutory ESI/PF & Safety Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workforce Site Photography Showcase Banner */}
        <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-[440px] shadow-xl flex items-end p-4 sm:p-8">
          <div
            className="absolute inset-0 bg-cover bg-center bg-[url('/images/manpower-crew-team-mobile.webp')] sm:bg-[url('/images/manpower-crew-team.webp')]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="relative z-10 space-y-2 max-w-xl text-white bg-slate-950/90 border border-slate-700/80 p-5 sm:p-6 rounded-sm shadow-2xl backdrop-blur-md">
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
              Verified Site Crew Roster
            </span>
            <h3 className="text-lg sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
              Safety-Oriented • Trade-Certified • Immediate Deployment
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Every worker mobilized under LT Engineering Works is verified with ESI/PF registration, trade competency testing, and full PPE issuance for rapid deployment on site.
            </p>
          </div>
        </div>

        {/* Interactive Scope & Crew Estimator */}
        <ScopeEstimator />

        {/* Rapid 48-72h Mobilization SLA Visualizer */}
        <MobilizationSlaVisualizer />

        {/* Turnaround & Crew Mobilization Planner Engine */}
        <MobilizationCalculator />

        {/* Requisition Form Card */}
        <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-sm shadow-md space-y-6">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
              Contractor Requisition Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-slate-900">
              Submit Manpower Requirement
            </h2>
            <p className="text-xs text-slate-600 font-sans">
              Specify your required headcounts, skill specifications, and work location. Our mobilization manager will review and confirm availability.
            </p>
          </div>

          <ManpowerEnquiryForm />
        </div>

      </section>

      {/* Worker Job Seeker Redirection CTA */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
              Are you an Industrial Worker seeking employment?
            </span>
            <h3 className="text-xl font-heading font-bold uppercase text-white mt-0.5">
              Explore Active Job Vacancies & Apply Directly
            </h3>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex-shrink-0"
          >
            <HardHat className="w-4 h-4" />
            Go to Careers Portal
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      </section>

    </div>
  );
}
