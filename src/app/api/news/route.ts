import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const news = await db.newsPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error("API /api/news error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 });
  }
}
