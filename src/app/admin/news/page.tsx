import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { NewsManagerTable } from "@/components/admin/NewsManagerTable";

export const revalidate = 0;

export default async function AdminNewsPage() {
  const news = await db.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Announcements & Updates CMS
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Company News & Milestones ({news.length})
          </h1>
        </div>

        <Link
          href="/admin/news/new"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" weight="bold" />
          <span>Create News Post</span>
        </Link>
      </div>

      {/* Interactive Table with 1-Tap Delete & Status Toggle */}
      <NewsManagerTable news={news} />
    </div>
  );
}
