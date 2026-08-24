"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteVacancyAction, toggleVacancyStatusAction } from "@/app/actions/vacancyActions";
import { 
  HardHat, 
  MapPin, 
  Users, 
  Briefcase, 
  ArrowSquareOut, 
  Trash, 
  PencilSimple, 
  Warning 
} from "@phosphor-icons/react";

interface VacancyItem {
  id: string;
  jobId: string;
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  openingsCount: number;
  experienceMinYears: number;
  status: string;
  isFeatured: boolean;
  category?: {
    name: string;
  } | null;
  _count: {
    applications: number;
  };
}

export function VacanciesManagerTable({ vacancies }: { vacancies: VacancyItem[] }) {
  const [vacancyList, setVacancyList] = useState(vacancies);
  const [deleteTarget, setDeleteTarget] = useState<VacancyItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteVacancyAction(deleteTarget.id);
      if (res.success) {
        setVacancyList((prev) => prev.filter((v) => v.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(res.error || "Failed to archive vacancy");
      }
    } catch (e) {
      alert("Error archiving vacancy");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (v: VacancyItem) => {
    setIsToggling(v.id);
    const nextStatus = v.status === "published" ? "closed" : "published";
    try {
      const res = await toggleVacancyStatusAction(v.id, nextStatus);
      if (res.success) {
        setVacancyList((prev) =>
          prev.map((item) => (item.id === v.id ? { ...item, status: nextStatus } : item))
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
        {vacancyList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No vacancies created yet.
          </div>
        ) : (
          vacancyList.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-xs border border-slate-200">
                      {v.jobId}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-50 px-1.5 py-0.2 rounded-xs">
                      {v.category?.name || "General"}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-950 text-base leading-snug mt-1">
                    {v.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    {v.employmentType} • {v.experienceMinYears}+ Years Exp
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isToggling === v.id}
                  onClick={() => handleToggleStatus(v)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border cursor-pointer transition-colors flex-shrink-0 ${
                    v.status === "published"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {v.status}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs font-mono">
                <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs">
                  {v.openingsCount} Openings
                </span>
                <span className="text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-xs">
                  {v._count.applications} Applicants
                </span>
                <span className="text-slate-500 text-[11px] truncate max-w-[120px]">
                  {v.location}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <Link
                  href={`/admin/vacancies/${v.id}`}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 shadow-xs active:scale-95"
                >
                  <PencilSimple className="w-3.5 h-3.5" />
                  Edit
                </Link>
                <Link
                  href={`/careers/${v.slug}`}
                  target="_blank"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 active:scale-95"
                >
                  <ArrowSquareOut className="w-3.5 h-3.5" />
                  Live
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(v)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                  title="Archive Vacancy"
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
                <th className="p-3.5">Job ID</th>
                <th className="p-3.5">Trade Position</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Openings</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Applicants</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vacancyList.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 font-mono">
                    No vacancies created yet.
                  </td>
                </tr>
              ) : (
                vacancyList.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {v.jobId}
                    </td>

                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                      {v.title}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">
                        {v.employmentType}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {v.category?.name || "General"}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-emerald-700">
                      {v.openingsCount} Openings
                    </td>

                    <td className="p-3.5 font-mono text-slate-600">
                      {v.location}
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {v.experienceMinYears}+ Years
                    </td>

                    <td className="p-3.5 font-mono font-bold text-blue-700">
                      {v._count.applications} Applicants
                    </td>

                    <td className="p-3.5">
                      <button
                        type="button"
                        disabled={isToggling === v.id}
                        onClick={() => handleToggleStatus(v)}
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border cursor-pointer transition-colors ${
                          v.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {v.status}
                      </button>
                    </td>

                    <td className="p-3.5 text-right font-mono flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/vacancies/${v.id}`}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs font-bold text-[11px] transition-all flex items-center gap-1"
                      >
                        <PencilSimple className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>
                      <Link
                        href={`/careers/${v.slug}`}
                        target="_blank"
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Public Page"
                      >
                        <ArrowSquareOut className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(v)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Archive Vacancy"
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
                  Archive Trade Vacancy?
                </h3>
                <p className="text-xs text-slate-500 font-mono">This will remove the job opening from the public careers page.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 text-xs font-mono text-slate-700">
              <strong>Position:</strong> {deleteTarget.title} ({deleteTarget.jobId})
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
                {isDeleting ? "Archiving..." : "Yes, Archive Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
