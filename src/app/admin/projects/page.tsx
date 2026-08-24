import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { ProjectsManagerTable } from "@/components/admin/ProjectsManagerTable";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    where: { deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    include: {
      category: true,
      images: true,
    },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Project Catalog & Portfolio CMS
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Projects Portfolio ({projects.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/admin/export/projects"
            download
            className="flex-1 sm:flex-none text-center px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-sm border border-slate-700 shadow-sm transition-all"
          >
            Export CSV
          </a>
          <Link
            href="/admin/projects/new"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" weight="bold" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Interactive Table with 1-Tap Delete & Featured Toggle */}
      <ProjectsManagerTable projects={projects} />
    </div>
  );
}
