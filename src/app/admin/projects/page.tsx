import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Buildings, Plus, MapPin, Eye, CheckCircle, UsersThree, Images, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

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

      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {projects.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No projects found. Click &quot;Add Project&quot; to create one.
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-xs border border-slate-200">
                      {p.category.name}
                    </span>
                    {p.isFeatured && (
                      <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded-xs uppercase">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-slate-950 text-base leading-snug mt-1">
                    {p.name}
                  </h3>
                </div>

                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs flex-shrink-0 ${
                    p.status === "completed"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-blue-100 text-blue-900 border border-blue-300"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 border-t border-slate-100 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="truncate">{p.location}</span>
                </div>
                {p.manpowerDeployed && (
                  <div className="flex items-center gap-1">
                    <UsersThree className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{p.manpowerDeployed}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-slate-500">
                  <Images className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span>{p.images.length} Photos</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 shadow-xs active:scale-95"
                >
                  Edit Project Scope
                </Link>
                <Link
                  href={`/projects/${p.slug}`}
                  target="_blank"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 active:scale-95"
                >
                  <ArrowSquareOut className="w-3.5 h-3.5" />
                  Live View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE (>= 768px) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Project Name</th>
                <th className="p-3.5">Discipline Category</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Manpower Deployed</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Photos</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                    No projects found. Click &quot;Add New Project&quot; to create one.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm max-w-xs">
                      {p.name}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">
                        Slug: /{p.slug}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200">
                        {p.category.name}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {p.location}
                    </td>

                    <td className="p-3.5 font-mono text-slate-600">
                      {p.manpowerDeployed || "N/A"}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs ${
                          p.status === "completed"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {p.isFeatured ? (
                        <span className="text-emerald-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {p.images.length} Photos
                    </td>

                    <td className="p-3.5 text-right font-mono flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs font-bold text-[11px] transition-all"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline font-bold"
                      >
                        Public View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
