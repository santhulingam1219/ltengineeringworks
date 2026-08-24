import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Newspaper, CalendarBlank, ArrowLeft, ShareNetwork, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.newsPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "News Post Not Found" };
  }

  return {
    title: `${post.title} | LT Engineering Works`,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.newsPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/news" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All News & Updates
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CalendarBlank className="w-4 h-4 text-amber-500" />
              {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
            </span>
            <span>•</span>
            <span className="text-amber-400 uppercase font-semibold">{post.category}</span>
          </div>
        </div>
      </section>

      {/* Post Article Body */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-sm shadow-sm space-y-8">
          {post.excerpt && (
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed border-l-4 border-amber-500 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          <div className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed whitespace-pre-line space-y-4">
            {post.content}
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/news"
              className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 flex items-center gap-1.5"
            >
              ← Back to All News & Announcements
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-heading font-bold uppercase rounded-sm transition-all"
            >
              Contact Press & Operations
            </Link>
          </div>
        </div>
      </article>

    </div>
  );
}
