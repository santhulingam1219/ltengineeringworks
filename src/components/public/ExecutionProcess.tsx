"use client";

import { 
  FileText, 
  Compass, 
  UsersThree, 
  Wrench, 
  GearSix, 
  Crane, 
  ShieldCheck, 
  CheckCircle,
  ArrowRight
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export function ExecutionProcess() {
  const steps = [
    {
      number: "01",
      title: "Project Requirement",
      desc: "Receipt of technical specifications, BOQ, and site scopes from client/contractor.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Planning & Coordination",
      desc: "Schedule formulation, engineering review, equipment readiness, and methodology alignment.",
      icon: Compass,
    },
    {
      number: "03",
      title: "Manpower Deployment",
      desc: "Mobilization of verified fitters, fabricators, riggers, and site supervisors.",
      icon: UsersThree,
    },
    {
      number: "04",
      title: "Fabrication / Prep",
      desc: "Shop floor marking, cutting, spool fabrication, and structural preparation.",
      icon: Wrench,
    },
    {
      number: "05",
      title: "Site Execution",
      desc: "On-site mechanical, civil, and piping works under direct engineering supervision.",
      icon: GearSix,
    },
    {
      number: "06",
      title: "Erection / Installation",
      desc: "Heavy crane rigging, alignment, torque tightening, and modular installations.",
      icon: Crane,
    },
    {
      number: "07",
      title: "Quality & Safety Checks",
      desc: "NDT inspection, hydro-testing, dimensional alignment, and safety audits.",
      icon: ShieldCheck,
    },
    {
      number: "08",
      title: "Project Completion",
      desc: "Final client inspection, documentation handover, and successful commissioning.",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Animated Gradient Pulse */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-timeline-pulse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                Standard Operating Procedure
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white">
                Project Execution Lifecycle
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md font-sans leading-relaxed">
              Our disciplined 8-stage industrial project workflow guarantees strict timeline adherence, quality compliance, and zero-compromise safety.
            </p>
          </div>
        </ScrollReveal>

        {/* 8-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={index} delay={index * 70} direction="up" className="h-full">
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-sm space-y-4 card-industrial-glow-dark transition-all group relative h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-xs">
                        <Icon className="w-5 h-5" weight="bold" />
                      </div>
                      <span className="text-2xl font-heading font-black text-slate-600 group-hover:text-amber-400 transition-colors font-mono-code">
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full h-0.5 bg-slate-800 group-hover:bg-amber-500/60 transition-colors" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
