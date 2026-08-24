import { Clock, CheckCircle, ShieldCheck, HardHat, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

export function MobilizationSlaVisualizer() {
  const steps = [
    {
      step: "01",
      timeline: "Hour 0 – 12",
      title: "Intake & Crew Sizing",
      desc: "Requisition review by mobilization manager. Headcounts, trade classifications, and site location confirmed.",
      icon: Clock,
    },
    {
      step: "02",
      timeline: "Hour 12 – 24",
      title: "Trade & ESI/PF Screening",
      desc: "Skill competency testing (6G/ITI/Rigging), background verification, and statutory insurance compliance checks.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      timeline: "Hour 24 – 48",
      title: "HSE Orientation & PPE",
      desc: "Comprehensive safety induction, medical fitness certification, and issuance of full certified safety gear.",
      icon: HardHat,
    },
    {
      step: "04",
      timeline: "Hour 48 – 72",
      title: "Work Front Kickoff",
      desc: "Arrival at site with lead foreman, gate pass issuance, morning Tool-Box Talk (TBT), and execution kickoff.",
      icon: RocketLaunch,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-sm p-8 sm:p-10 shadow-md space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Rapid Response Guarantee
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-slate-900 tracking-tight mt-1">
            48 – 72 Hour Mobilization Turnaround
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xs border border-emerald-200 self-start md:self-auto">
          ✓ Verified Deployment Protocol
        </span>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-sm space-y-4 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-amber-400 rounded-xs">
                    Phase {s.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-bold">
                    {s.timeline}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" weight="bold" />
                </div>

                <h4 className="text-base font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                  {s.title}
                </h4>

                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" weight="fill" />
                <span>Verified SLA Step</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
