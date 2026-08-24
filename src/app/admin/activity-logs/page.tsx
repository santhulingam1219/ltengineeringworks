import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ClockCounterClockwise, ShieldCheck, User, Funnel } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ module?: string }>;
}

export default async function AdminActivityLogsPage({ searchParams }: Props) {
  const { module: activeModule } = await searchParams;

  const where: any = {};
  if (activeModule && activeModule !== "all") {
    where.module = activeModule;
  }

  const logs = await db.activityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const modules = ["all", "auth", "users", "projects", "vacancies", "applications", "enquiries", "settings"];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Security, Compliance & Audit Trail (PRD Section 30)
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Administrative Activity Audit Log ({logs.length})
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" weight="fill" />
          <span>Immutable Audit Trail Active</span>
        </div>
      </div>

      {/* Module Filter Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono">
        <span className="text-slate-500 mr-1 flex items-center gap-1 font-bold">
          <Funnel className="w-3.5 h-3.5" />
          Filter:
        </span>
        {modules.map((m) => (
          <Link
            key={m}
            href={`/admin/activity-logs${m === "all" ? "" : `?module=${m}`}`}
            className={`px-2.5 py-1 rounded-xs uppercase font-bold text-[11px] transition-all ${
              (activeModule === m || (!activeModule && m === "all"))
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {m}
          </Link>
        ))}
      </div>

      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {logs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No activity recorded for this filter.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-2 text-xs font-mono"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-900 font-bold rounded-xs border border-slate-200">
                  {log.action}
                </span>
                <span className="text-[10px] text-slate-400">
                  {formatDate(log.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.2 rounded-xs border border-amber-200 text-[10px]">
                  {log.module}
                </span>
                <span className="text-slate-800 text-[11px] truncate flex-1">
                  {log.userEmail || "System Admin"}
                </span>
              </div>

              {log.metadata && (
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-xs text-[11px] text-slate-600 font-sans break-words leading-relaxed">
                  {log.metadata}
                </div>
              )}
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
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Admin Email</th>
                <th className="p-3.5">Target Record ID</th>
                <th className="p-3.5">Metadata / Event Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    No activity recorded for this filter.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 text-[11px]">
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-900 font-bold rounded-xs border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-amber-700 uppercase">
                      {log.module}
                    </td>
                    <td className="p-3.5 text-slate-800">
                      {log.userEmail || "System Admin"}
                    </td>
                    <td className="p-3.5 text-slate-500 truncate max-w-[140px]">
                      {log.recordId || "N/A"}
                    </td>
                    <td className="p-3.5 text-slate-600 truncate max-w-xs font-sans">
                      {log.metadata || "Standard operation"}
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
