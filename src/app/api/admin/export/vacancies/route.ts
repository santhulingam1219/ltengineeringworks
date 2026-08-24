import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const vacancies = await db.vacancy.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Vacancy ID",
    "Job Title",
    "Category",
    "Openings Count",
    "Experience Required",
    "Location",
    "Salary Display",
    "Accommodation",
    "Transport",
    "Status",
    "Applications Received",
    "Published Date",
  ];

  const rows = vacancies.map((v) => [
    `"${v.jobId}"`,
    `"${v.title.replace(/"/g, '""')}"`,
    `"${v.category?.name || "General"}"`,
    v.openingsCount,
    `"${v.experienceMinYears}${v.experienceMaxYears ? `-${v.experienceMaxYears}` : "+"} Years"`,
    `"${v.location.replace(/"/g, '""')}"`,
    `"${v.salaryDisplay || "Negotiable"}"`,
    v.accommodationProvided ? "Yes" : "No",
    v.transportProvided ? "Yes" : "No",
    `"${v.status}"`,
    v._count.applications,
    `"${v.createdAt.toISOString().split("T")[0]}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lt_vacancies_export_${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
