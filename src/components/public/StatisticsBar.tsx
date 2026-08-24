import { ShieldCheck, Info } from "@phosphor-icons/react/dist/ssr";

interface StatsProps {
  completedProjects?: string;
  turnover?: string;
  workforceCount?: string;
}

export function StatisticsBar({
  completedProjects = "30+",
  turnover = "₹100 Cr+",
  workforceCount = "1,000+",
}: StatsProps) {
  const stats = [
    {
      value: completedProjects,
      label: "Completed Projects",
      detail: "Mechanical, Civil & Piping Packages",
    },
    {
      value: turnover,
      label: "Company Turnover*",
      detail: "Industrial project contracts executed",
      hasDisclaimer: true,
    },
    {
      value: "09",
      label: "Engineering Disciplines",
      detail: "Structural, Piping, Erection & More",
    },
    {
      value: workforceCount,
      label: "Workforce Deployed",
      detail: "Skilled Fitters, Welders & Riggers",
    },
  ];

  return (
    <div className="bg-[#0F172A] border-b border-slate-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="border-l-2 border-amber-500 pl-4 sm:pl-6 py-2 space-y-1 bg-slate-900/40 rounded-r-xs"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-amber-400 font-mono-code">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-sans leading-tight">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Statistical Note Required by PRD */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified company record from Sandhakuda City, Paradeep operations.</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>*All statistical metrics are maintained and verified via company administrative records.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
