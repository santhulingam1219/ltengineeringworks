import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProjectFilterCatalog } from "@/components/public/ProjectFilterCatalog";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Project Portfolio & Completed Industrial Works (30+ Projects)",
  description:
    "Explore LT Engineering Works portfolio of 30+ completed and ongoing heavy industrial structural fabrication, piping, erection, and mechanical projects in Paradeep, Odisha.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    db.project.findMany({
      where: {
        isPublished: true,
        deletedAt: null,
      },
      orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
      include: {
        category: true,
      },
    }),
    db.projectCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Verified 30+ Completed Portfolio
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Industrial Project Portfolio
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Proven execution across structural steel fabrication, high-elevation erection, high-pressure utility piping, and equipment installations in Paradeep and Eastern India.
          </p>
        </div>
      </section>

      {/* Interactive Filterable Projects Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectFilterCatalog
          projects={projects}
          categories={categories}
        />
      </section>

    </div>
  );
}
