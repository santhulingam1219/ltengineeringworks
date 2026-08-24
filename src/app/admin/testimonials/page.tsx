import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Verified Client Feedback CMS
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Testimonials & Client Endorsements ({testimonials.length})
          </h1>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" weight="bold" />
          <span>Add Client Feedback</span>
        </Link>
      </div>

      {/* Interactive Testimonials Manager */}
      <TestimonialsManager initialItems={testimonials} />
    </div>
  );
}
