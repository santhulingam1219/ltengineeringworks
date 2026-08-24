import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const projects = await db.project.findMany({
    where: { deletedAt: null },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Project ID",
    "Project Name",
    "Category",
    "Status",
    "Location",
    "Manpower Deployed",
    "Duration",
    "Featured",
    "Published",
    "Created Date",
  ];

  const rows = projects.map((p) => [
    `"${p.id}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.category.name}"`,
    `"${p.status}"`,
    `"${p.location.replace(/"/g, '""')}"`,
    `"${p.manpowerDeployed || "N/A"}"`,
    `"${p.duration || "N/A"}"`,
    p.isFeatured ? "Yes" : "No",
    p.isPublished ? "Yes" : "No",
    `"${p.createdAt.toISOString().split("T")[0]}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lt_projects_portfolio_${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
