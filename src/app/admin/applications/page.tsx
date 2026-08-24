import { db } from "@/lib/db";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";

export const revalidate = 0;

export default async function AdminApplicationsPage() {
  const applications = await db.application.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      vacancy: true,
      notes: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Recruitment & Hiring Pipeline
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Worker Job Applications ({applications.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export/applications"
            download
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded-sm border border-slate-700 flex items-center gap-1.5 shadow-xs"
          >
            Export CSV Roster
          </a>
          <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-sm border border-slate-200">
            Pipeline: New → Under Review → Shortlisted → Selected
          </div>
        </div>
      </div>

      {/* Interactive Table with Review Drawer */}
      <ApplicationsTable applications={applications} />
    </div>
  );
}
