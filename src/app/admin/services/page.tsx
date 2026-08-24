import { db } from "@/lib/db";
import Link from "next/link";
import { FolderOpen, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Capabilities & Service Disciplines
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Engineering Services Catalog ({services.length})
          </h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Order</th>
                <th className="p-3.5">Service Name</th>
                <th className="p-3.5">Slug</th>
                <th className="p-3.5">Short Description</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Public Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-mono font-bold text-slate-500">
                    0{s.displayOrder}
                  </td>
                  <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                    {s.name}
                  </td>
                  <td className="p-3.5 font-mono text-slate-500">
                    /{s.slug}
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-sm truncate">
                    {s.shortDescription}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                      Published
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono">
                    <Link
                      href={`/services/${s.slug}`}
                      target="_blank"
                      className="text-blue-600 hover:underline font-bold"
                    >
                      View Live
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
