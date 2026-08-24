import { db } from "@/lib/db";
import Link from "next/link";
import { 
  Buildings, 
  HardHat, 
  Users, 
  EnvelopeSimple, 
  ArrowRight, 
  Plus, 
  ClockCounterClockwise,
  CheckCircle,
  FileText
} from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/utils";
import { AnalyticsVisualizer } from "@/components/admin/AnalyticsVisualizer";
import { AdminAppInstallBanner } from "@/components/admin/AdminAppInstallBanner";

export const revalidate = 0; // Dynamic real-time dashboard

export default async function AdminDashboardPage() {
  const [
    totalProjectsCount,
    ongoingProjectsCount,
    activeVacanciesCount,
    newApplicationsCount,
    newProjectEnquiriesCount,
    newContactEnquiriesCount,
    recentApplications,
    recentProjectEnquiries,
    recentActivityLogs,
  ] = await Promise.all([
    db.project.count({ where: { deletedAt: null } }),
    db.project.count({ where: { status: "ongoing", deletedAt: null } }),
    db.vacancy.count({ where: { status: "published", deletedAt: null } }),
    db.application.count({ where: { status: "new", deletedAt: null } }),
    db.projectEnquiry.count({ where: { status: "new", deletedAt: null } }),
    db.contactEnquiry.count({ where: { status: "new", deletedAt: null } }),
    db.application.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.projectEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const kpis = [
    {
      title: "Total Projects",
      value: "30+",
      subvalue: `${ongoingProjectsCount} Ongoing Work Fronts`,
      icon: Buildings,
      href: "/admin/projects",
      color: "amber",
    },
    {
      title: "Active Vacancies",
      value: String(activeVacanciesCount),
      subvalue: "Recruitment Openings",
      icon: HardHat,
      href: "/admin/vacancies",
      color: "blue",
    },
    {
      title: "New Job Applications",
      value: String(newApplicationsCount),
      subvalue: "Pending Review",
      icon: Users,
      href: "/admin/applications",
      color: "green",
    },
    {
      title: "New Project Leads",
      value: String(newProjectEnquiriesCount),
      subvalue: "Client Quotations",
      icon: EnvelopeSimple,
      href: "/admin/enquiries",
      color: "purple",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Mobile PWA App Installation Helper */}
      <AdminAppInstallBanner />

      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-7 rounded-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 min-w-0">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Overview Dashboard
          </span>
          <h1 className="text-xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight leading-snug">
            LT Engineering Works Command Center
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Sandhakuda City, Paradeep operations, recruitment pipelines, and enquiry tracking.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 sm:pt-0">
          <Link
            href="/admin/vacancies/new"
            className="flex-1 sm:flex-none justify-center px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" weight="bold" />
            <span>Add Vacancy</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex-1 sm:flex-none justify-center px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-sm border border-slate-700 flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" weight="bold" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-heading font-bold text-slate-500 uppercase tracking-wider truncate mr-1">
                  {kpi.title}
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" weight="bold" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight font-mono-code">
                  {kpi.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                  {kpi.subvalue}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Visualizer */}
      <AnalyticsVisualizer
        data={{
          totalProjects: totalProjectsCount,
          completedProjects: totalProjectsCount - ongoingProjectsCount,
          ongoingProjects: ongoingProjectsCount,
          totalApplications: newApplicationsCount,
          totalVacancies: activeVacanciesCount,
          totalEnquiries: newProjectEnquiriesCount,
          totalManpowerReqs: newContactEnquiriesCount,
        }}
      />

      {/* Recent Applications & Enquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        
        {/* Recent Job Applications */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <h2 className="font-heading font-bold text-slate-900 uppercase text-sm truncate">
                  Recent Job Applications
                </h2>
                <p className="text-[11px] text-slate-500 font-sans truncate">
                  Candidate applications received from site
                </p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-heading font-bold text-blue-700 hover:underline uppercase tracking-wider flex items-center gap-1 flex-shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentApplications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 font-mono">
                  No applications received yet.
                </div>
              ) : (
                recentApplications.map((app) => (
                  <div key={app.id} className="p-3.5 sm:p-4 flex items-center justify-between text-xs hover:bg-slate-50 gap-3">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="font-heading font-bold text-slate-900 text-sm truncate">
                        {app.fullName}
                      </div>
                      <div className="font-mono text-slate-500 flex items-center gap-1.5 text-[11px] truncate">
                        <span className="text-amber-700 font-semibold truncate">{app.positionAppliedFor}</span>
                        <span>•</span>
                        <span className="flex-shrink-0">{app.mobileNumber}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 rounded-xs uppercase">
                        {app.status}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {formatDate(app.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Project Enquiries */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <h2 className="font-heading font-bold text-slate-900 uppercase text-sm truncate">
                  Recent Project Enquiries
                </h2>
                <p className="text-[11px] text-slate-500 font-sans truncate">
                  Industrial client project requisitions
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-heading font-bold text-blue-700 hover:underline uppercase tracking-wider flex items-center gap-1 flex-shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentProjectEnquiries.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 font-mono">
                  No project enquiries received yet.
                </div>
              ) : (
                recentProjectEnquiries.map((enq) => (
                  <div key={enq.id} className="p-3.5 sm:p-4 flex items-center justify-between text-xs hover:bg-slate-50 gap-3">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="font-heading font-bold text-slate-900 text-sm truncate">
                        {enq.companyName}
                      </div>
                      <div className="font-mono text-slate-500 flex items-center gap-1.5 text-[11px] truncate">
                        <span className="truncate">{enq.contactPerson}</span>
                        <span>•</span>
                        <span className="truncate">{enq.requiredService || "General Scope"}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 text-blue-800 rounded-xs uppercase">
                        {enq.status}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {formatDate(enq.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Activity Logs Stream */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <ClockCounterClockwise className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <h2 className="font-heading font-bold text-slate-900 uppercase text-xs sm:text-sm truncate">
              Recent Administrative Activity Log
            </h2>
          </div>
          <Link
            href="/admin/activity-logs"
            className="text-xs font-heading font-bold text-slate-700 hover:text-amber-600 uppercase flex-shrink-0"
          >
            Full Trail →
          </Link>
        </div>

        <div className="space-y-2">
          {recentActivityLogs.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono">No activity logged yet.</p>
          ) : (
            recentActivityLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono py-2 border-b border-slate-100 last:border-0 gap-1 sm:gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-xs text-[10px] flex-shrink-0">
                    {log.action}
                  </span>
                  <span className="text-slate-900 truncate">{log.userEmail || "System"}</span>
                  <span className="text-slate-500 flex-shrink-0">[{log.module}]</span>
                </div>
                <span className="text-slate-400 text-[10px] sm:text-[11px] self-end sm:self-auto">{formatDate(log.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
