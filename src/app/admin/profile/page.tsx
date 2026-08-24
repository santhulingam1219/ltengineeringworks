import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserCircle, ShieldCheck, Key, CheckCircle, Warning, Clock } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/utils";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const revalidate = 0;

export default async function AdminProfilePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { role: true },
  });

  if (!user) redirect("/admin/login");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Account Management
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Admin User Profile
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Profile Card */}
        <div className="md:col-span-5 bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-sm mx-auto flex items-center justify-center font-heading font-black text-2xl border border-slate-700">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold uppercase text-slate-900">
                {user.fullName}
              </h2>
              <span className="inline-block px-2.5 py-0.5 text-xs font-mono font-bold uppercase bg-amber-100 text-amber-800 rounded-xs mt-1">
                {user.role.displayName}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Email Address</span>
              <span className="text-slate-900 font-semibold">{user.email}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Account Created</span>
              <span className="text-slate-700">{formatDate(user.createdAt)}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Last Session Login</span>
              <span className="text-slate-700">{user.lastLoginAt ? formatDate(user.lastLoginAt) : "Current Session"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Password Change Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-heading font-bold uppercase text-slate-900">
              Change Account Password
            </h2>
          </div>

          <ChangePasswordForm userId={user.id} />
        </div>

      </div>
    </div>
  );
}
