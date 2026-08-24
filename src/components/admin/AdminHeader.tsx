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
    <header className="bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
      {/* Mobile Branding / Desktop Operational Status */}
      <div className="flex items-center gap-3">
        <Link href="/admin" className="md:hidden flex items-center gap-2">
          <div className="h-8 w-8 bg-[#0B1120] rounded-sm p-1 flex items-center justify-center border border-amber-400/30">
            <img
              src="/images/logo.webp"
              alt="LT Admin"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-heading font-black text-sm text-slate-950 uppercase tracking-tight">
            LT Admin
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-600 font-medium">
            System Status: <strong className="text-slate-900">Operational</strong>
          </span>
        </div>
      </div>

      <Link href="/admin/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-heading font-bold text-slate-900 uppercase tracking-tight">
            {userName}
          </div>
          <div className="text-[10px] font-mono text-amber-600 font-semibold uppercase">
            {userRole.replace("_", " ")}
          </div>
        </div>

        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-900 rounded-sm flex items-center justify-center text-amber-400 font-bold font-mono text-xs sm:text-sm border border-slate-700 shadow-xs">
          {userName.charAt(0).toUpperCase()}
        </div>
      </Link>
    </header>
  );
}

