"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Buildings, 
  MapPin, 
  UsersThree, 
  Clock, 
  ArrowRight, 
  Tag, 
  MagnifyingGlass,
  Funnel
} from "@phosphor-icons/react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  status: string;
  location: string;
  industry?: string | null;
  description: string;
  manpowerDeployed?: string | null;
  duration?: string | null;
  isFeatured: boolean;
  coverImageUrl?: string | null;
  category: Category;
}

export function ProjectFilterCatalog({
  projects,
  categories,
}: {
  projects: ProjectItem[];
  categories: Category[];
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Status filter
      if (selectedStatus !== "all" && p.status !== selectedStatus) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && p.category.slug !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchCat = p.category.name.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchLoc && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [projects, selectedStatus, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
        
        {/* Top Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setSelectedStatus("all")}
              className={`px-3.5 py-2 rounded-sm border transition-all cursor-pointer ${
                selectedStatus === "all"
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              All Packages ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("completed")}
              className={`px-3.5 py-2 rounded-sm border transition-all cursor-pointer ${
                selectedStatus === "completed"
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              Completed (30+)
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("ongoing")}
              className={`px-3.5 py-2 rounded-sm border transition-all cursor-pointer ${
                selectedStatus === "ongoing"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              Ongoing Work Fronts
            </button>
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by keyword..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
          </div>

        </div>

        {/* Category Chips Bar (Smooth Horizontal Scroll on Mobile, Wrapped on Desktop) */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-mono overflow-x-auto sm:flex-wrap pb-1.5 scrollbar-none">
          <span className="text-slate-500 mr-1 flex items-center gap-1 flex-shrink-0">
            <Tag className="w-3.5 h-3.5" />
            Discipline:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 text-[11px] rounded-xs font-mono transition-colors cursor-pointer flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white font-bold"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3 py-1.5 text-[11px] rounded-xs font-mono transition-colors cursor-pointer flex-shrink-0 ${
                selectedCategory === c.slug
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center rounded-sm space-y-3">
          <Buildings className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-heading font-bold text-slate-900 uppercase">
            No Projects Match Your Filter
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Try resetting your search query or selecting a different engineering discipline.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedStatus("all");
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-heading font-bold uppercase rounded-sm mt-2 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const fallbackImages = [
              "/images/hero-steel-plant.webp",
              "/images/piping-erection-site.webp",
              "/images/heavy-rigging-crane.webp",
              "/images/tank-fabrication-yard.webp",
            ];
            
            let finalImg = fallbackImages[idx % fallbackImages.length];
            if (project.coverImageUrl && !project.coverImageUrl.includes(".png") && project.coverImageUrl.startsWith("/images/")) {
              finalImg = project.coverImageUrl;
            } else if (project.slug.includes("piping") || project.slug.includes("refinery")) {
              finalImg = "/images/piping-erection-site.webp";
            } else if (project.slug.includes("equipment") || project.slug.includes("alignment")) {
              finalImg = "/images/heavy-rigging-crane.webp";
            } else if (project.slug.includes("structural") || project.slug.includes("fabrication")) {
              finalImg = "/images/hero-steel-plant.webp";
            }

            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Project Image / Header */}
                  <div className="h-52 bg-slate-900 relative p-4 flex flex-col justify-between overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      style={{ backgroundImage: `url('${finalImg}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider shadow-sm ${
                          project.status === "completed"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {project.status === "completed" ? "Completed Package" : "Ongoing Scope"}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-white bg-slate-950/80 px-2 py-0.5 rounded-xs border border-slate-700/60 backdrop-blur-xs">
                        {project.category.name}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-sm bg-slate-950/80 border border-amber-400/50 flex items-center justify-center text-amber-400 backdrop-blur-xs shadow-sm">
                        <Buildings className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
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

              {/* Action */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5"
                >
                  View Full Project Scope
                  <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </Link>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
