import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: any = {
    status: "published",
    deletedAt: null,
  };

  if (category) {
    where.category = { slug: category };
  }

  try {
    const vacancies = await db.vacancy.findMany({
      where,
      take: limit,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      success: true,
      count: vacancies.length,
      data: vacancies,
    });
  } catch (error) {
    console.error("API /api/vacancies error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch vacancies" }, { status: 500 });
  }
}
