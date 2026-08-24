import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = {
    isPublished: true,
    deletedAt: null,
  };

  if (status && status !== "all") {
    where.status = status;
  }

  if (category) {
    where.category = { slug: category };
  }

  try {
    const projects = await db.project.findMany({
      where,
      take: limit,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          select: { id: true, imageUrl: true, caption: true, displayOrder: true, isCover: true },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("API /api/projects error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}
