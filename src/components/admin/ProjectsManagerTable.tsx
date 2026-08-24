"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProjectAction, toggleFeaturedProjectAction } from "@/app/actions/projectActions";
import { 
  Buildings, 
  MapPin, 
  UsersThree, 
  Images, 
  ArrowSquareOut, 
  Trash, 
  Star,
  PencilSimple,
  Warning,
  X,
  Check
} from "@phosphor-icons/react";

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  location: string;
  status: string;
  isFeatured: boolean;
  manpowerDeployed?: string | null;
  category: {
    name: string;
  };
  images: any[];
}

export function ProjectsManagerTable({ projects }: { projects: ProjectItem[] }) {
  const [projectList, setProjectList] = useState(projects);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteProjectAction(deleteTarget.id);
      if (res.success) {
        setProjectList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(res.error || "Failed to archive project");
      }
    } catch (e) {
      alert("Error archiving project");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleFeatured = async (p: ProjectItem) => {
    setIsToggling(p.id);
    const nextState = !p.isFeatured;
    try {
      const res = await toggleFeaturedProjectAction(p.id, nextState);
      if (res.success) {
        setProjectList((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, isFeatured: nextState } : item))
        );
      }
    } finally {
      setIsToggling(null);
    }
  };

  return (
    <>
      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {projectList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No projects found.
          </div>
        ) : (
          projectList.map((p) => (
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
                    <button
                      type="button"
                      disabled={isToggling === p.id}
                      onClick={() => handleToggleFeatured(p)}
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs uppercase border cursor-pointer transition-colors ${
                        p.isFeatured
                          ? "text-amber-900 bg-amber-100 border-amber-300"
                          : "text-slate-500 bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.isFeatured ? "★ Featured" : "☆ Set Featured"}
                    </button>
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
                  <PencilSimple className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <Link
                  href={`/projects/${p.slug}`}
                  target="_blank"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 active:scale-95"
                >
                  <ArrowSquareOut className="w-3.5 h-3.5" />
                  Live
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(p)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                  title="Archive Project"
                >
                  <Trash className="w-4 h-4" />
                </button>
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
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Manpower</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Photos</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projectList.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm max-w-xs">
                      {p.name}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">
                        /{p.slug}
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

                    <td className="p-3.5 font-mono">
                      <button
                        type="button"
                        disabled={isToggling === p.id}
                        onClick={() => handleToggleFeatured(p)}
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase border cursor-pointer transition-colors ${
                          p.isFeatured
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p.isFeatured ? "★ Featured" : "☆ Set"}
                      </button>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {p.images.length} Photos
                    </td>

                    <td className="p-3.5 text-right font-mono flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs font-bold text-[11px] transition-all flex items-center gap-1"
                      >
                        <PencilSimple className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Public Page"
                      >
                        <ArrowSquareOut className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(p)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Archive Project"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-sm border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Warning className="w-5 h-5" weight="bold" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 text-lg uppercase">
                  Archive Project?
                </h3>
                <p className="text-xs text-slate-500 font-mono">This will remove it from the public portfolio.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 text-xs font-mono text-slate-700">
              <strong>Project:</strong> {deleteTarget.name}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-heading font-bold uppercase rounded-xs cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Archiving..." : "Yes, Archive Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
