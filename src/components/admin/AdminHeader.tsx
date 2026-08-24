import Link from "next/link";
import { UserCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

interface AdminHeaderProps {
  userName?: string;
  userRole?: string;
  userEmail?: string;
}

export function AdminHeader({
  userName = "Staff Member",
  userRole = "Administrator",
  userEmail = "admin@ltengineeringworks.com",
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-mono text-slate-600 font-medium">
          System Status: <strong className="text-slate-900">Operational</strong>
        </span>
      </div>

      <Link href="/admin/profile" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
        <div className="text-right">
          <div className="text-xs font-heading font-bold text-slate-900 uppercase tracking-tight">
            {userName}
          </div>
          <div className="text-[10px] font-mono text-amber-600 font-semibold uppercase">
            {userRole.replace("_", " ")}
          </div>
        </div>

        <div className="w-9 h-9 bg-slate-900 rounded-sm flex items-center justify-center text-amber-400 font-bold font-mono text-sm border border-slate-700">
          {userName.charAt(0).toUpperCase()}
        </div>
      </Link>
    </header>
  );
}
