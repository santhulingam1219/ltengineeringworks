import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { HardHat, Plus, Users, MapPin, Briefcase } from "@phosphor-icons/react/dist/ssr";

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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Recruitment Openings & Manpower CMS
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Trade Vacancies ({vacancies.length})
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/admin/export/vacancies"
            download
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-sm border border-slate-700 shadow-sm transition-all"
          >
            Export CSV
          </a>
          <Link
            href="/admin/vacancies/new"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" weight="bold" />
            Create Trade Vacancy
          </Link>
        </div>
      </div>

      {/* Vacancies Table */}
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
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
