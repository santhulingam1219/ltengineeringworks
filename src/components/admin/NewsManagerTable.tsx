"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { deleteNewsPostAction, toggleNewsStatusAction } from "@/app/actions/newsActions";
import { 
  Newspaper, 
  ArrowSquareOut, 
  Trash, 
  Warning 
} from "@phosphor-icons/react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  createdAt: Date;
  publishedAt?: Date | null;
}

export function NewsManagerTable({ news }: { news: NewsItem[] }) {
  const [newsList, setNewsList] = useState(news);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteNewsPostAction(deleteTarget.id);
      if (res.success) {
        setNewsList((prev) => prev.filter((n) => n.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(res.error || "Failed to delete news post");
      }
    } catch (e) {
      alert("Error deleting news post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (item: NewsItem) => {
    setIsToggling(item.id);
    const nextStatus = item.status === "published" ? "draft" : "published";
    try {
      const res = await toggleNewsStatusAction(item.id, nextStatus);
      if (res.success) {
        setNewsList((prev) =>
          prev.map((n) => (n.id === item.id ? { ...n, status: nextStatus } : n))
        );
      }
    } finally {
      setIsToggling(null);
    }
  };

  return (
    <>
      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {newsList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No news posts created yet.
          </div>
        ) : (
          newsList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-xs border border-slate-200">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-slate-950 text-base leading-snug mt-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    Published: {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isToggling === item.id}
                  onClick={() => handleToggleStatus(item)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border cursor-pointer transition-colors flex-shrink-0 ${
                    item.status === "published"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {item.status}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 truncate max-w-[180px]">/{item.slug}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/news/${item.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xs flex items-center gap-1 active:scale-95"
                  >
                    <ArrowSquareOut className="w-3.5 h-3.5" />
                    <span>View Post</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                    title="Delete News Post"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE (>= 768px) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
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
              {newsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                    No news posts created yet.
                  </td>
                </tr>
              ) : (
                newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm max-w-sm">
                      {item.title}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">
                        /{item.slug}
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
                      <button
                        type="button"
                        disabled={isToggling === item.id}
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border cursor-pointer transition-colors ${
                          item.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>

                    <td className="p-3.5 text-right font-mono flex items-center justify-end gap-2">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs font-bold text-[11px] transition-all flex items-center gap-1"
                      >
                        <ArrowSquareOut className="w-3.5 h-3.5" />
                        <span>Live Post</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-sm border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Warning className="w-5 h-5" weight="bold" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 text-lg uppercase">
                  Delete News Post?
                </h3>
                <p className="text-xs text-slate-500 font-mono">This action cannot be undone.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 text-xs font-mono text-slate-700">
              <strong>Post:</strong> {deleteTarget.title}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-heading font-bold uppercase rounded-xs cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
