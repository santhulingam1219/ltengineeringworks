import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { HardHat, Plus, Users, MapPin, Briefcase, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminVacanciesPage() {
  const vacancies = await db.vacancy.findMany({
    where: { deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: {
      category: true,
      _count: {
        select: { applications: true },
      },
    },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Recruitment Openings & Manpower CMS
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Trade Vacancies ({vacancies.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/admin/export/vacancies"
            download
            className="flex-1 sm:flex-none text-center px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-sm border border-slate-700 shadow-sm transition-all"
          >
            Export CSV
          </a>
          <Link
            href="/admin/vacancies/new"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" weight="bold" />
            <span>Add Vacancy</span>
          </Link>
        </div>
      </div>

      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {vacancies.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No vacancies created yet. Click &quot;Add Vacancy&quot; to create one.
          </div>
        ) : (
          vacancies.map((v) => (
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

                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs flex-shrink-0 ${
                    v.status === "published"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-100 text-slate-700 border border-slate-300"
                  }`}
                >
                  {v.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs font-mono">
                <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs">
                  {v.openingsCount} Openings
                </span>
                <span className="text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-xs">
                  {v._count.applications} Applicants
                </span>
                <span className="text-slate-500 text-[11px]">
                  {v.location}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <Link
                  href={`/admin/vacancies/${v.id}`}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 shadow-xs active:scale-95"
                >
                  Edit Trade Vacancy
                </Link>
                <Link
                  href={`/careers/${v.slug}`}
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
                <th className="p-3.5">Job ID</th>
                <th className="p-3.5">Trade Position</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Openings</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Applications</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vacancies.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 font-mono">
                    No vacancies created yet.
                  </td>
                </tr>
              ) : (
                vacancies.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
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
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs ${
                          v.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right font-mono flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/vacancies/${v.id}`}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs font-bold text-[11px] transition-all"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/careers/${v.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline font-bold"
                      >
                        Live Link
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
