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

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans">
      {session && <AdminSidebar userRole={session.roleName} />}
      <div className="flex-1 flex flex-col min-w-0">
        {session && (
          <AdminHeader
            userName={session.fullName}
            userRole={session.roleName}
            userEmail={session.email}
          />
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>
        {session && (
          <AdminMobileAppNav
            userName={session.fullName}
            userRole={session.roleName}
          />
        )}
      </div>
    </div>
  );
}

