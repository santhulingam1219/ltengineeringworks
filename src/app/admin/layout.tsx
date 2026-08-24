import { getSession } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminMobileAppNav } from "@/components/admin/AdminMobileAppNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If unauthenticated (e.g. login page), render full-bleed without dashboard layout padding
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F1F5F9] flex font-sans">
      {/* 100% Fixed & Stationary Desktop Sidebar */}
      <AdminSidebar userRole={session.roleName} />

      {/* Right Content Viewport with independent smooth scrolling */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminHeader
          userName={session.fullName}
          userRole={session.roleName}
          userEmail={session.email}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto scroll-smooth">
          {children}
        </main>
        <AdminMobileAppNav
          userName={session.fullName}
          userRole={session.roleName}
        />
      </div>
    </div>
  );
}
