"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MagnifyingGlass, CalendarBlank, Newspaper, ArrowRight, Tag, X } from "@phosphor-icons/react";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | Date | null;
  authorName?: string | null;
  category?: string | null;
}

export function NewsFilterCatalog({ initialNews }: { initialNews: NewsItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialNews.forEach((n) => {
      if (n.category) set.add(n.category);
    });
    return ["all", ...Array.from(set)];
  }, [initialNews]);

  const filteredNews = useMemo(() => {
    return initialNews.filter((n) => {
      const matchesCategory =
        selectedCategory === "all" || n.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialNews, selectedCategory, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Controls Strip */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search news, milestones, or bulletins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-sm py-2.5 pl-10 pr-10 text-xs font-sans focus:outline-hidden focus:border-amber-500 transition-colors"
          />
          <MagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills (Swipeable on Mobile) */}
        <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider overflow-x-auto sm:flex-wrap pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xs border transition-all cursor-pointer flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? "All Bulletins" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center rounded-sm space-y-3">
          <Newspaper className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-heading font-bold text-slate-900 uppercase">
            No Bulletins Found
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            No updates matched your search query. Try searching for a different term or clear filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 p-6 rounded-sm hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/15 text-amber-800 border border-amber-500/30 rounded-xs uppercase">
                    {item.category || "Bulletin"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <CalendarBlank className="w-3.5 h-3.5" />
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Recent"}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-slate-900 group-hover:text-amber-600 transition-colors"
                >
                  Read Full Bulletin
                  <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </Link>
                {item.authorName && (
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                    By {item.authorName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
