import { CalendarBlank, CheckCircle, ShieldCheck, Trophy, Buildings, HardHat } from "@phosphor-icons/react/dist/ssr";

export function CompanyTimelineSection() {
  const milestones = [
    {
      year: "Phase I",
      badge: "Foundation & Yard Setup",
      title: "Establishment in Sandhakuda, Paradeep",
      desc: "Incorporation of LT Engineering Works, setting up our heavy structural fabrication yard, plate bending shop, and recruiting our core roster of certified fitters and 6G welders.",
      stats: "Initial Yard Operations • Sandhakuda City",
    },
    {
      year: "Phase II",
      badge: "Heavy Erection & Rigging",
      title: "Major Refinery & Port Pipeline Packages",
      desc: "Expansion into process utility piping networks, high-pressure steam lines with 100% radiography (RT) quality pass, and mechanical equipment positioning for port industrial corridors.",
      stats: "Zero-Lost Time Injury Milestone",
    },
    {
      year: "Phase III",
      badge: "Multi-Discipline Scale",
      title: "850+ MT Structural Technological Structures",
      desc: "Deployment of 250T crawler cranes for high-elevation pipe rack modules, heavy factory sheds, storage tanks, and conveyor galleries across Eastern India.",
      stats: "30+ Heavy Packages Delivered",
    },
    {
      year: "Present",
      badge: "Turnkey Excellence",
      title: "₹100 Cr+ Cumulative Execution & 24/7 Shutdowns",
      desc: "Recognized as a leading contractor in Odisha for turnkey mechanical, civil, structural, piping, and rapid 48-72h skilled workforce mobilization.",
      stats: "₹100 Cr+ Value Delivered • ISO Aligned",
    },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-sm border border-slate-800 p-5 sm:p-12 shadow-xl space-y-8 sm:space-y-10 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            Execution Track Record
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight">
            Corporate Growth & Milestone Roadmap
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Paradeep, Odisha & Eastern India Industrial Corridor
        </span>
      </div>

      {/* Timeline Steps Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, i) => (
          <div
            key={i}
            className="bg-slate-950/80 border border-slate-800 p-6 rounded-sm space-y-4 hover:border-amber-500/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black px-2.5 py-0.5 bg-amber-500 text-slate-950 rounded-xs uppercase">
                  {m.year}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-xs border border-slate-800">
                  {m.badge}
                </span>
              </div>

              <h3 className="text-base font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors leading-snug">
                {m.title}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {m.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" weight="fill" />
              <span>{m.stats}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
