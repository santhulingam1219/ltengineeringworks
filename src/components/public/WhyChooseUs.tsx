"use client";

import { 
  ShieldCheck, 
  Clock, 
  UsersThree, 
  Wrench, 
  MapPin, 
  Handshake 
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export function WhyChooseUs() {
  const points = [
    {
      title: "Paradeep Strategic Location",
      desc: "Headquartered directly in Sandhakuda City, Paradeep, enabling rapid site mobilization and equipment readiness across Odisha's industrial belt.",
      icon: MapPin,
    },
    {
      title: "Verified 30+ Project Track Record",
      desc: "Proven execution across mechanical overhauls, high-pressure piping, structural erection, and civil foundations for leading plant contractors.",
      icon: ShieldCheck,
    },
    {
      title: "Direct Trade Competency",
      desc: "In-house crews of certified fitters, fabricators, riggers, and seasoned supervisors, eliminating unreliable third-party labor middle-men.",
      icon: UsersThree,
    },
    {
      title: "Timeline & Turnaround Focus",
      desc: "Disciplined scheduling, daily shift tracking, and proactive bottleneck management to complete turnaround shutdowns on or ahead of schedule.",
      icon: Clock,
    },
    {
      title: "Zero-Compromise Safety Culture",
      desc: "Strict adherence to PPE compliance, Daily Tool-Box Talks (TBT), job hazard analysis (JHA), and height safety tie-off standards.",
      icon: Wrench,
    },
    {
      title: "Transparent Contract Execution",
      desc: "GSTIN registered, statutory compliant, clear commercial terms, and accountable executive management directly accessible on site.",
      icon: Handshake,
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              Why LT Engineering Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-slate-900">
              Engineered for Reliability & Site Execution
            </h2>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">
              Industrial clients choose us when deadlines are rigid, technical scopes demand precision, and safety standards cannot be compromised.
            </p>
          </div>
        </ScrollReveal>

        {/* 6-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={index} delay={index * 80} direction="up" className="h-full">
                <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm card-industrial-glow transition-all group space-y-4 h-full flex flex-col justify-start">
                  <div className="w-12 h-12 bg-slate-900 rounded-sm flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                    <Icon className="w-6 h-6" weight="bold" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
