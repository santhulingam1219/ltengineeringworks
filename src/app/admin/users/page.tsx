import { db } from "@/lib/db";
import { UserGear, ShieldCheck, CheckCircle, EnvelopeSimple, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    where: { deletedAt: null },
    include: { role: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Access Control & RBAC
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Admin Staff Accounts ({users.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200">
          Roles: Super Admin • Content • Recruitment • Enquiry • Viewer
        </div>
      </div>

      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-amber-400 rounded-sm flex items-center justify-center font-heading font-black text-sm border border-slate-700">
                  {u.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-950 text-base leading-tight">
                    {u.fullName}
                  </h3>
                  <span className="inline-block px-2 py-0.2 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 rounded-xs uppercase mt-0.5">
                    {u.role.displayName}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                Active
              </span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <EnvelopeSimple className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-800 truncate">{u.email}</span>
              </div>
              {u.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{u.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Last login: {u.lastLoginAt ? formatDate(u.lastLoginAt) : "Never"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE (>= 768px) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Staff Name</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Phone Number</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Account Status</th>
                <th className="p-3.5">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                    {u.fullName}
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">
                    {u.email}
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">
                    {u.phone || "N/A"}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 rounded-xs uppercase">
                      {u.role.displayName}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                      Active
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {u.lastLoginAt ? formatDate(u.lastLoginAt) : "Never"}
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
