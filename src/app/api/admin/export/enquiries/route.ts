import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "project";

  if (type === "project") {
    const leads = await db.projectEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Enquiry ID",
      "Company Name",
      "Contact Person",
      "Phone",
      "Email",
      "Required Service",
      "Project Location",
      "Status",
      "Received Date",
    ];

    const csvRows = [headers.join(",")];
    for (const l of leads) {
      csvRows.push([
        `"${l.enquiryId}"`,
        `"${l.companyName.replace(/"/g, '""')}"`,
        `"${l.contactPerson.replace(/"/g, '""')}"`,
        `"${l.phone}"`,
        `"${l.email || ""}"`,
        `"${l.requiredService || ""}"`,
        `"${l.projectLocation || ""}"`,
        `"${l.status}"`,
        `"${l.createdAt.toISOString()}"`,
      ].join(","));
    }

    return new NextResponse(csvRows.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="LT_Project_Leads_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } else {
    const reqs = await db.manpowerEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Requisition ID",
      "Company Name",
      "Contact Person",
      "Phone",
      "Email",
      "Required Trades",
      "Total Workers Needed",
      "Status",
      "Received Date",
    ];

    const csvRows = [headers.join(",")];
    for (const r of reqs) {
      csvRows.push([
        `"${r.enquiryId}"`,
        `"${r.companyName.replace(/"/g, '""')}"`,
        `"${r.contactPerson.replace(/"/g, '""')}"`,
        `"${r.phone}"`,
        `"${r.email || ""}"`,
        `"${r.requiredPositions.replace(/"/g, '""')}"`,
        `"${r.totalWorkersNeeded || ""}"`,
        `"${r.status}"`,
        `"${r.createdAt.toISOString()}"`,
      ].join(","));
    }

    return new NextResponse(csvRows.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="LT_Manpower_Requisitions_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }
}
