import type { Metadata } from "next";
import { db } from "@/lib/db";
import { NewsFilterCatalog } from "@/components/public/NewsFilterCatalog";
import { Newspaper } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Company News, Project Milestones & Notices | LT Engineering Works",
  description:
    "Latest announcements, recruitment drives, site mobilization milestones, and industrial notices from LT Engineering Works in Paradeep, Odisha.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const news = await db.newsPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      publishedAt: true,
      category: true,
      author: {
        select: {
          fullName: true,
        },
      },
    },
  });

  const formattedNews = news.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.excerpt || item.content.substring(0, 150) + "...",
    publishedAt: item.publishedAt,
    authorName: item.author?.fullName || "Site Operations Lead",
    category: item.category || "General Notice",
  }));

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Newspaper className="w-4 h-4 text-amber-400" />
            Official Communications Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            News & Industrial Updates
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Stay informed on our site execution milestones, urgent manpower mobilization campaigns, and engineering project developments.
          </p>
        </div>
      </section>

      {/* Dynamic News Filter Catalog */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsFilterCatalog initialNews={formattedNews} />
      </section>
    </div>
  );
}
