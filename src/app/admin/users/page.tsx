import { db } from "@/lib/db";
import { UserGear, ShieldCheck, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    where: { deletedAt: null },
    include: { role: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Access Control & RBAC
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Admin Staff Accounts ({users.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200">
          Roles: Super Admin • Content Manager • Recruitment Manager • Enquiry Manager • Viewer
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
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
