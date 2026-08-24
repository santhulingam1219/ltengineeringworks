import { db } from "@/lib/db";
import Link from "next/link";
import { ChatCircleText, Plus, Star } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Verified Client Feedback CMS
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Testimonials ({testimonials.length})
          </h1>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" weight="bold" />
          Add Client Feedback
        </Link>
      </div>

      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm">
        {testimonials.length === 0 ? (
          <div className="space-y-3 py-6 text-center">
            <ChatCircleText className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-heading font-bold text-slate-900 uppercase">
              No Testimonials Published
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
              Client testimonials supplied directly by executive management can be managed and featured here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="p-6 border border-slate-200 rounded-sm bg-slate-50 space-y-3 text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" weight="fill" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic font-sans leading-relaxed">
                  &quot;{item.testimonialText}&quot;
                </p>
                <div className="pt-2 border-t border-slate-200/80">
                  <div className="font-heading font-bold text-xs text-slate-900 uppercase">
                    {item.clientName}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {item.designation ? `${item.designation}, ` : ""}{item.companyName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
