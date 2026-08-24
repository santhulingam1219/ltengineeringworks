import { getSession } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If on login page, render children directly without sidebar
  // In Next.js App Router, the middleware handles route redirection,
  // but if session is missing on admin pages, redirect to login
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
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
