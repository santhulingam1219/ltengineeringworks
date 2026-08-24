"use client";

import { ShieldCheck, Info } from "@phosphor-icons/react";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";
import { ScrollReveal } from "@/components/public/ScrollReveal";

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
      counter: <AnimatedCounter target={30} suffix="+" />,
      label: "Completed Projects",
      detail: "Mechanical, Civil & Piping Packages",
    },
    {
      counter: (
        <span>
          ₹<AnimatedCounter target={100} /> Cr+
        </span>
      ),
      label: "Company Turnover*",
      detail: "Industrial project contracts executed",
      hasDisclaimer: true,
    },
    {
      counter: <AnimatedCounter target={9} padZero />,
      label: "Engineering Disciplines",
      detail: "Structural, Piping, Erection & More",
    },
    {
      counter: <AnimatedCounter target={1000} suffix="+" />,
      label: "Workforce Deployed",
      detail: "Skilled Fitters, Welders & Riggers",
    },
  ];

  return (
    <div className="bg-[#0F172A] border-b border-slate-800 text-white py-12 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="up">
              <div className="border-l-2 border-amber-500 pl-4 sm:pl-6 py-2 space-y-1.5 bg-slate-900/50 hover:bg-slate-900/80 transition-colors rounded-r-sm">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-amber-400 font-mono-code flex items-center">
                  {stat.counter}
                </div>
                <div className="text-xs sm:text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 font-sans leading-tight">
                  {stat.detail}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Statistical Note Required by PRD */}
        <ScrollReveal delay={350} direction="none">
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified company record from Sandhakuda City, Paradeep operations.</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>*All statistical metrics are maintained and verified via company administrative records.</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
