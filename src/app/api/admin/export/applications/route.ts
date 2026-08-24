import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const applications = await db.application.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Application ID",
    "Full Name",
    "Position Applied",
    "Mobile Number",
    "Alt Mobile",
    "Email",
    "Experience",
    "Qualification",
    "Current Location",
    "Availability",
    "Status",
    "Date Applied",
  ];

  const csvRows = [headers.join(",")];

  for (const app of applications) {
    const row = [
      `"${app.applicationId}"`,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${app.positionAppliedFor.replace(/"/g, '""')}"`,
      `"${app.mobileNumber}"`,
      `"${app.altMobileNumber || ""}"`,
      `"${app.email || ""}"`,
      `"${app.yearsOfExperience || ""}"`,
      `"${app.qualification || ""}"`,
      `"${app.currentLocation || ""}"`,
      `"${app.joiningAvailability || ""}"`,
      `"${app.status}"`,
      `"${app.createdAt.toISOString()}"`,
    ];
    csvRows.push(row.join(","));
  }

  const csvContent = csvRows.join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="LT_Applications_${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
