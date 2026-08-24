"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  EnvelopeSimple, 
  Users, 
  HardHat, 
  DotsThreeCircle, 
  Buildings, 
  Images, 
  FolderOpen, 
  Newspaper, 
  ChatCircleText, 
  GearSix, 
  UserGear, 
  ClockCounterClockwise, 
  Globe, 
  SignOut,
  X,
  UserCircle
} from "@phosphor-icons/react";
import { logoutAdminAction } from "@/app/admin/actions/authActions";

interface AdminMobileAppNavProps {
  userName?: string;
  userRole?: string;
}

export function AdminMobileAppNav({ userName = "Staff", userRole = "Admin" }: AdminMobileAppNavProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { name: "Overview", href: "/admin", icon: SquaresFour, exact: true },
    { name: "Enquiries", href: "/admin/enquiries", icon: EnvelopeSimple },
    { name: "Applicants", href: "/admin/applications", icon: Users },
    { name: "Vacancies", href: "/admin/vacancies", icon: HardHat },
  ];

  const drawerItems = [
    { name: "Projects", href: "/admin/projects", icon: Buildings, color: "text-blue-400" },
    { name: "Services", href: "/admin/services", icon: FolderOpen, color: "text-amber-400" },
    { name: "Media", href: "/admin/media", icon: Images, color: "text-purple-400" },
    { name: "News", href: "/admin/news", icon: Newspaper, color: "text-emerald-400" },
    { name: "Reviews", href: "/admin/testimonials", icon: ChatCircleText, color: "text-pink-400" },
    { name: "Settings", href: "/admin/settings", icon: GearSix, color: "text-slate-300" },
    { name: "Users", href: "/admin/users", icon: UserGear, color: "text-indigo-400" },
    { name: "Audit Logs", href: "/admin/activity-logs", icon: ClockCounterClockwise, color: "text-cyan-400" },
    { name: "Profile", href: "/admin/profile", icon: UserCircle, color: "text-amber-300" },
  ];

  return (
    <>
      {/* Mobile App Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1120] border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-lg">
        {mainTabs.map((tab) => {
          const isActive = tab.exact 
            ? pathname === tab.href 
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              prefetch={true}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xs min-w-[58px] transition-all active:scale-95 ${
                isActive
                  ? "text-amber-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className={`p-1 rounded-sm ${isActive ? "bg-amber-500/20" : ""}`}>
                <Icon className="w-5 h-5" weight={isActive ? "fill" : "regular"} />
              </div>
              <span className="text-[10px] font-heading uppercase tracking-tight mt-0.5 leading-none">
                {tab.name}
              </span>
            </Link>
          );
        })}

        {/* More Options Tab (App Drawer Trigger) */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xs min-w-[58px] transition-all active:scale-95 cursor-pointer ${
            drawerOpen ? "text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1 rounded-sm ${drawerOpen ? "bg-amber-500/20" : ""}`}>
            <DotsThreeCircle className="w-5 h-5" weight={drawerOpen ? "fill" : "regular"} />
          </div>
          <span className="text-[10px] font-heading uppercase tracking-tight mt-0.5 leading-none">
            More
          </span>
        </button>
      </div>

      {/* Mobile App Full Drawer / Bottom Sheet */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-[#0B1120] border-t border-slate-800 rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 space-y-5 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-sm border border-slate-700 flex items-center justify-center text-amber-400 font-bold font-mono text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-white uppercase leading-none">
                    {userName}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400 uppercase mt-1 block">
                    {userRole.replace("_", " ")} • LT Admin App
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xs bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Apps Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Modules & Operations
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {drawerItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all active:scale-95 text-center ${
                        isActive
                          ? "bg-amber-500/20 border-amber-500/50 text-white"
                          : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${item.color} mb-1.5`} weight="bold" />
                      <span className="text-[11px] font-heading font-bold uppercase tracking-tight leading-tight">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-800 space-y-2 font-mono text-xs">
              <Link
                href="/"
                target="_blank"
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-sm text-slate-300 transition-colors"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Open Public Website</span>
              </Link>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 p-2.5 bg-red-950/30 border border-red-900/40 hover:bg-red-950/50 rounded-sm text-red-300 font-bold transition-colors cursor-pointer"
                >
                  <SignOut className="w-4 h-4" />
                  <span>Log Out of Admin App</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
