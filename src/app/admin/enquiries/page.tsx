import { db } from "@/lib/db";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const { tab = "project" } = await searchParams;

  const [projectEnquiries, manpowerEnquiries, contactEnquiries] = await Promise.all([
    db.projectEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    }),
    db.manpowerEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    }),
    db.contactEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Commercial Leads & Inquiries Hub
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Client & Business Enquiries
          </h1>
        </div>

        {/* Tab Navigation & Export */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider">
          <a
            href="/admin/enquiries?tab=project"
            className={`px-3.5 py-2 rounded-sm border transition-all ${
              tab === "project"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            Project Leads ({projectEnquiries.length})
          </a>
          <a
            href="/admin/enquiries?tab=manpower"
            className={`px-3.5 py-2 rounded-sm border transition-all ${
              tab === "manpower"
                ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            Manpower Requisitions ({manpowerEnquiries.length})
          </a>
          <a
            href="/admin/enquiries?tab=contact"
            className={`px-3.5 py-2 rounded-sm border transition-all ${
              tab === "contact"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            General Messages ({contactEnquiries.length})
          </a>

          <a
            href={`/api/admin/export/enquiries?type=${tab === "manpower" ? "manpower" : "project"}`}
            download
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-sm border border-slate-700 ml-2"
          >
            Export CSV
          </a>
        </div>
      </div>

      {/* Interactive Enquiries Table with Review Drawer */}
      <EnquiriesTable
        tab={tab}
        projectEnquiries={projectEnquiries}
        manpowerEnquiries={manpowerEnquiries}
        contactEnquiries={contactEnquiries}
      />
    </div>
  );
}
