import { db } from "@/lib/db";
import { ServicesTable } from "@/components/admin/ServicesTable";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Capabilities & Service Disciplines
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Engineering Services Catalog ({services.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200 self-start sm:self-auto">
          In-Place Scope & Photo Editor Active
        </div>
      </div>

      {/* Services Table with In-Place Modal Editor */}
      <ServicesTable initialServices={services} />
    </div>
  );
}
