"use client";

import Link from "next/link";
import { Buildings, MapPin, UsersThree, Clock, ArrowRight } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  industry?: string | null;
  status: string;
  description: string;
  manpowerDeployed?: string | null;
  duration?: string | null;
  coverImageUrl?: string | null;
}

export function FeaturedProjects({ projects = [] }: { projects?: ProjectItem[] }) {
  // Default projects if database is empty
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: "1",
      slug: "industrial-structural-fabrication-erection-paradeep",
      name: "Industrial Structural Fabrication & Erection Package",
      location: "Sandhakuda / Paradeep, Odisha",
      industry: "Heavy Industrial & Manufacturing",
      status: "completed",
      description: "Complete execution of heavy structural steel fabrication and erection for an industrial manufacturing facility in the Paradeep industrial corridor.",
      manpowerDeployed: "85+ Skilled Technicians",
      duration: "10 Months",
    },
    {
      id: "2",
      slug: "refinery-utility-piping-turnaround-execution",
      name: "Refinery Utility & High-Pressure Piping Works",
      location: "Paradeep Port Zone, Odisha",
      industry: "Refinery & Petrochemicals",
      status: "completed",
      description: "Critical utility piping routing, spool fabrication, and tie-in execution during scheduled plant turnaround with zero safety non-conformances.",
      manpowerDeployed: "60+ Certified Fitters",
      duration: "4.5 Months",
    },
    {
      id: "3",
      slug: "heavy-equipment-positioning-alignment",
      name: "Heavy Equipment Erection & Precision Alignment",
      location: "Jagatsinghpur District, Odisha",
      industry: "Power & Heavy Engineering",
      status: "ongoing",
      description: "Ongoing precision positioning, uncrating, foundation prep, levelling, and laser coupling alignment for heavy rotary machinery.",
      manpowerDeployed: "45+ Specialists",
      duration: "7 Months",
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-slate-900">
                Featured Industrial Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-blue-700 hover:text-blue-800 uppercase tracking-wider group"
            >
              <span>View Complete 30+ Project Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((project, idx) => {
            const fallbackImages = [
              "/images/hero-steel-plant.webp",
              "/images/piping-erection-site.webp",
              "/images/heavy-rigging-crane.webp",
              "/images/tank-fabrication-yard.webp",
            ];
            
            // Validate if coverImageUrl is a valid existing path, otherwise fallback
            let finalImage = fallbackImages[idx % fallbackImages.length];
            if (project.coverImageUrl && !project.coverImageUrl.includes(".png") && project.coverImageUrl.startsWith("/images/")) {
              finalImage = project.coverImageUrl;
            } else if (project.slug.includes("piping") || project.slug.includes("refinery")) {
              finalImage = "/images/piping-erection-site.webp";
            } else if (project.slug.includes("equipment") || project.slug.includes("alignment")) {
              finalImage = "/images/heavy-rigging-crane.webp";
            } else if (project.slug.includes("structural") || project.slug.includes("fabrication")) {
              finalImage = "/images/hero-steel-plant.webp";
            }

            return (
              <ScrollReveal key={project.id} delay={idx * 120} direction="up" className="h-full">
                <div className="bg-white border border-slate-200 rounded-sm overflow-hidden card-industrial-glow transition-all flex flex-col justify-between h-full group">
                  <div>
                    {/* Project Header Banner with Real Industrial Photography */}
                    <div className="h-52 bg-slate-900 relative p-4 flex flex-col justify-between overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{ backgroundImage: `url('${finalImage}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/30" />
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500 text-slate-950 rounded-xs uppercase tracking-wider shadow-sm">
                          {project.status === "completed" ? "Completed Package" : "Ongoing Scope"}
                        </span>
                        {project.industry && (
                          <span className="text-[10px] font-mono font-semibold text-white bg-slate-950/80 px-2 py-0.5 rounded-xs border border-slate-700/60 backdrop-blur-xs">
                            {project.industry}
                          </span>
                        )}
                      </div>

                      <div className="relative z-10">
                        <div className="w-8 h-8 rounded-sm bg-slate-950/80 border border-amber-400/50 flex items-center justify-center text-amber-400 backdrop-blur-xs shadow-sm">
                          <Buildings className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors leading-snug">
                        {project.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>

                        {project.manpowerDeployed && (
                          <div className="flex items-center gap-2">
                            <UsersThree className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span>{project.manpowerDeployed}</span>
                          </div>
                        )}

                        {project.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            <span>Duration: {project.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full py-2.5 px-4 bg-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>View Full Project Scope</span>
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
