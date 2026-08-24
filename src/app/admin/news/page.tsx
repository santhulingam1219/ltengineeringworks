import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Newspaper, Plus, Eye } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminNewsPage() {
  const news = await db.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Announcements & Updates CMS
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Company News & Milestones ({news.length})
          </h1>
        </div>

        <Link
          href="/admin/news/new"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" weight="bold" />
          Create News Post
        </Link>
      </div>

      {/* News Table */}
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Post Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Published Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {news.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                    No news posts created yet. Click &quot;Create News Post&quot; to publish one.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm max-w-sm">
                      {item.title}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">
                        Slug: /{item.slug}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200">
                        {item.category}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                      {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs ${
                          item.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right font-mono">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline font-bold"
                      >
                        Live Link
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
