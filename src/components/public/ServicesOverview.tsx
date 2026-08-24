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
      image: "/images/hero-steel-plant.webp",
      tag: "Structural",
    },
    {
      name: "Fabrication Works",
      slug: "fabrication-works",
      desc: "Precision shop and on-site fabrication for heavy steel structures, storage tanks, chutes, and process ducts.",
      icon: Wrench,
      image: "/images/fabrication-workshop.webp",
      tag: "Heavy Steel",
    },
    {
      name: "Erection Works",
      slug: "erection-works",
      desc: "Systematic heavy crane rigging, high-elevation structural erection, and modular assembly adhering to strict tolerances.",
      icon: Crane,
      image: "/images/heavy-rigging-crane.webp",
      tag: "Rigging",
    },
    {
      name: "Piping Works",
      slug: "piping-works",
      desc: "High-pressure utility & process piping, spool fabrication, hydro-testing, and plant turnaround tie-in works.",
      icon: CirclesThreePlus,
      image: "/images/piping-erection-site.webp",
      tag: "Process Piping",
    },
    {
      name: "Mechanical Works",
      slug: "mechanical-works",
      desc: "Overhauls, alignment of rotating and static machinery, conveyors, pumps, and plant turnaround maintenance.",
      icon: GearSix,
      image: "/images/laser-alignment-machine.webp",
      tag: "Maintenance",
    },
    {
      name: "Civil Works",
      slug: "civil-works",
      desc: "Industrial equipment foundations, RCC structures, trenches, heavy-duty paving, and plant civil infrastructure.",
      icon: Wall,
      image: "/images/industrial-civil-foundation.webp",
      tag: "Infrastructure",
    },
    {
      name: "Equipment Works",
      slug: "equipment-works",
      desc: "Installation, positioning, levelling, grouting, and coupling alignment for heavy industrial machinery.",
      icon: Cpu,
      image: "/images/turbine-machinery-erection.webp",
      tag: "Machinery",
    },
    {
      name: "Skilled Manpower Solutions",
      slug: "skilled-manpower",
      desc: "Rapid mobilization of certified industrial engineers, supervisors, fitters, fabricators, riggers, and kalassi.",
      icon: UsersThree,
      image: "/images/manpower-crew-team.webp",
      tag: "Deployment",
    },
    {
      name: "Other Engineering Works",
      slug: "other-engineering-works",
      desc: "Customized technical solutions, shutdown packages, and emergency industrial maintenance contracts.",
      icon: ShieldCheck,
      image: "/images/plant-maintenance-shutdown.webp",
      tag: "Turnkey",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-slate-200 gap-4">
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
              <ScrollReveal key={index} delay={index * 50} direction="up" className="h-full">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-sm card-industrial-glow transition-all group flex flex-col justify-between h-full overflow-hidden">
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                      
                      {/* Floating Badge & Icon */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <div className="w-10 h-10 bg-slate-950/90 border border-amber-500/50 rounded-sm flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                          <Icon className="w-5 h-5" weight="bold" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900/90 text-amber-400 border border-amber-400/30 rounded-xs uppercase tracking-wider backdrop-blur-xs">
                          {service.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-200/80">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-800 group-hover:text-amber-600 transition-colors"
                      >
                        <span>View Technical Details</span>
                        <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                      </Link>
                    </div>
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
