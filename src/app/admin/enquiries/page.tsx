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
      <div className="bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Commercial Leads & Inquiries Hub
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Client & Business Enquiries
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Real-time project leads, manpower requisitions, and customer messages.
          </p>
        </div>
      </div>

      {/* Interactive Enquiries Table with Review Drawer & Mobile Cards */}
      <EnquiriesTable
        tab={tab}
        projectEnquiries={projectEnquiries}
        manpowerEnquiries={manpowerEnquiries}
        contactEnquiries={contactEnquiries}
      />
    </div>
  );
}
