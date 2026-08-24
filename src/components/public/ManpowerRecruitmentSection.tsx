import Link from "next/link";
import { HardHat, UsersThree, CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function ManpowerRecruitmentSection() {
  const trades = [
    { title: "Project Engineers", code: "ENG", desc: "Mechanical & Civil Site Engineers" },
    { title: "Site Supervisors", code: "SUP", desc: "Execution & Safety Management" },
    { title: "Pipe & Structural Fitters", code: "FIT", desc: "Precision Spool & Steel Fitters" },
    { title: "Certified Fabricators", code: "FAB", desc: "Heavy Structural & Tank Fabricators" },
    { title: "Foremen & Marshals", code: "FOR", desc: "Trade Crew Leads & Crane Marshals" },
    { title: "Riggers & Kalassi", code: "RIG", desc: "High-Elevation Heavy Rigging" },
    { title: "General Helpers", code: "HLP", desc: "Site Logistics & Material Movement" },
    { title: "Computer Operators", code: "OPS", desc: "Site Inventory & Progress Documentation" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Image Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35 pointer-events-none"
        style={{ backgroundImage: `url('/images/manpower-crew-team.webp')` }}
      />
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Client/Worker Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <HardHat className="w-4 h-4" />
              Skilled Workforce Mobilization
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase leading-tight text-white">
              Industrial Manpower Deployment
            </h2>

            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              LT Engineering Works supports large-scale industrial projects with verified, safety-trained, and trade-certified technical crews. We rapidly deploy trades to refineries, power plants, steel mills, and infrastructure sites across Paradeep and Eastern India.
            </p>

            <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Statutory compliance, ESI & PF documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Pre-mobilization safety orientation and PPE compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>Experienced supervisory leadership deployed on site</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/manpower"
                className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98]"
              >
                Request Manpower Requisition
                <ArrowRight className="w-3.5 h-3.5" weight="bold" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-sm border border-slate-700 transition-all active:scale-[0.98]"
              >
                <HardHat className="w-4 h-4 text-amber-400" />
                Explore Vacancies for Workers
              </Link>
            </div>
          </div>

          {/* Right Column: Grid of Industrial Trades */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trades.map((trade, i) => (
              <div
                key={i}
                className="bg-slate-950/80 border border-slate-800 p-4 rounded-sm hover:border-amber-500/60 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {trade.code}
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                    {trade.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    {trade.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
