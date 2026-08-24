"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  Buildings, 
  HardHat, 
  Users, 
  EnvelopeSimple, 
  Images, 
  Newspaper, 
  ChatCircleText, 
  GearSix, 
  ClockCounterClockwise, 
  UserGear,
  Globe,
  SignOut,
  FolderOpen
} from "@phosphor-icons/react";
import { logoutAdminAction } from "@/app/admin/actions/authActions";

export function AdminSidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Command Center", href: "/admin", icon: SquaresFour },
    { name: "Project Catalog", href: "/admin/projects", icon: Buildings },
    { name: "Trade Vacancies", href: "/admin/vacancies", icon: HardHat },
    { name: "Job Applications", href: "/admin/applications", icon: Users },
    { name: "Enquiries & Leads", href: "/admin/enquiries", icon: EnvelopeSimple },
    { name: "Media Library", href: "/admin/media", icon: Images },
    { name: "Services CMS", href: "/admin/services", icon: FolderOpen },
    { name: "News & Updates", href: "/admin/news", icon: Newspaper },
    { name: "Testimonials", href: "/admin/testimonials", icon: ChatCircleText },
    { name: "Site Settings", href: "/admin/settings", icon: GearSix },
    { name: "User Accounts", href: "/admin/users", icon: UserGear },
    { name: "Activity Logs", href: "/admin/activity-logs", icon: ClockCounterClockwise },
  ];

  return (
    <aside className="w-64 bg-[#0B1120] text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white/95 rounded-sm p-1 flex items-center justify-center border border-amber-400/30 shadow-sm flex-shrink-0">
            <img
              src="/images/logo.webp"
              alt="LT Engineering Works"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="font-heading font-black text-sm text-white tracking-tight uppercase block leading-none">
              LT Engineering
            </span>
            <span className="text-[10px] font-mono text-amber-400 block mt-1 tracking-wider">
              Admin Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} weight="bold" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-sm transition-colors"
        >
          <Globe className="w-4 h-4 text-amber-400" />
          <span>View Live Website</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-sm transition-colors cursor-pointer"
          >
            <SignOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
