"use client";

import Link from "next/link";
import { 
  Buildings, 
  Wrench, 
  Crane, 
  CirclesThreePlus, 
  GearSix, 
  Wall, 
  Cpu, 
  UsersThree, 
  ShieldCheck,
  ArrowRight
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export function ServicesOverview() {
  const services = [
    {
      name: "Structural Works",
      slug: "structural-works",
      desc: "Heavy industrial structural fabrication, column erection, high-elevation truss alignments, and industrial shed structures.",
      icon: Buildings,
      tag: "Structural",
    },
    {
      name: "Fabrication Works",
      slug: "fabrication-works",
      desc: "Precision shop and on-site fabrication for heavy steel structures, storage tanks, chutes, and process ducts.",
      icon: Wrench,
      tag: "Heavy Steel",
    },
    {
      name: "Erection Works",
      slug: "erection-works",
      desc: "Systematic heavy crane rigging, high-elevation structural erection, and modular assembly adhering to strict tolerances.",
      icon: Crane,
      tag: "Rigging",
    },
    {
      name: "Piping Works",
      slug: "piping-works",
      desc: "High-pressure utility & process piping, spool fabrication, hydro-testing, and plant turnaround tie-in works.",
      icon: CirclesThreePlus,
      tag: "Process Piping",
    },
    {
      name: "Mechanical Works",
      slug: "mechanical-works",
      desc: "Overhauls, alignment of rotating and static machinery, conveyors, pumps, and plant turnaround maintenance.",
      icon: GearSix,
      tag: "Maintenance",
    },
    {
      name: "Civil Works",
      slug: "civil-works",
      desc: "Industrial equipment foundations, RCC structures, trenches, heavy-duty paving, and plant civil infrastructure.",
      icon: Wall,
      tag: "Infrastructure",
    },
    {
      name: "Equipment Works",
      slug: "equipment-works",
      desc: "Installation, positioning, levelling, grouting, and coupling alignment for heavy industrial machinery.",
      icon: Cpu,
      tag: "Machinery",
    },
    {
      name: "Skilled Manpower Solutions",
      slug: "skilled-manpower",
      desc: "Rapid mobilization of certified industrial engineers, supervisors, fitters, fabricators, riggers, and kalassi.",
      icon: UsersThree,
      tag: "Deployment",
    },
    {
      name: "Other Engineering Works",
      slug: "other-engineering-works",
      desc: "Customized technical solutions, shutdown packages, and emergency industrial maintenance contracts.",
      icon: ShieldCheck,
      tag: "Turnkey",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Comprehensive Technical Scope
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-slate-900">
                Core Engineering Capabilities
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-blue-700 hover:text-blue-800 uppercase tracking-wider group"
            >
              <span>Explore All 9 Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 60} direction="up" className="h-full">
                <div className="bg-[#F8FAFC] border border-slate-200 p-7 rounded-sm card-industrial-glow transition-all group flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-slate-900 rounded-sm flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                        <Icon className="w-6 h-6" weight="bold" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-xs uppercase tracking-wider">
                        {service.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-slate-800 group-hover:text-amber-600 transition-colors"
                    >
                      <span>View Technical Details</span>
                      <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                    </Link>
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
