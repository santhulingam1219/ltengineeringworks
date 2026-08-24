"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ChatCircleText, Plus, Star, Trash, Sparkle, SpinnerGap } from "@phosphor-icons/react";
import { deleteTestimonialAction, toggleTestimonialFeaturedAction } from "@/app/actions/testimonialActions";

interface TestimonialItem {
  id: string;
  clientName: string;
  designation?: string | null;
  companyName: string;
  testimonialText: string;
  rating: number;
  isFeatured: boolean;
  isPublished: boolean;
}

export function TestimonialsManager({ initialItems }: { initialItems: TestimonialItem[] }) {
  const [items, setItems] = useState<TestimonialItem[]>(initialItems);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteTestimonialAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete testimonial.");
      }
      setDeletingId(null);
    });
  };

  const handleToggleFeatured = async (id: string) => {
    setTogglingId(id);
    startTransition(async () => {
      const res = await toggleTestimonialFeaturedAction(id);
      if (res.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isFeatured: res.isFeatured! } : item))
        );
      }
      setTogglingId(null);
    });
  };

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-sm border border-slate-200 shadow-sm text-center space-y-3">
          <ChatCircleText className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-heading font-bold text-slate-900 uppercase">
            No Testimonials Published
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
            Client testimonials supplied directly by executive management can be managed and featured here.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase rounded-sm shadow-xs"
            >
              <Plus className="w-4 h-4" weight="bold" />
              <span>Add First Testimonial</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 border border-slate-200 rounded-sm bg-white shadow-xs space-y-3 flex flex-col justify-between hover:border-amber-500/80 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" weight="fill" />
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={togglingId === item.id}
                    onClick={() => handleToggleFeatured(item.id)}
                    className={`px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                      item.isFeatured
                        ? "bg-amber-500 text-slate-950 shadow-xs"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <Sparkle className="w-3 h-3" />
                    <span>{item.isFeatured ? "Featured On Site" : "Make Featured"}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 italic font-sans leading-relaxed">
                  &quot;{item.testimonialText}&quot;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-heading font-bold text-xs text-slate-900 uppercase truncate">
                    {item.clientName}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 truncate">
                    {item.designation ? `${item.designation}, ` : ""}{item.companyName}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={deletingId === item.id}
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer flex-shrink-0"
                  title="Delete Testimonial"
                >
                  {deletingId === item.id ? (
                    <SpinnerGap className="w-4 h-4 animate-spin text-red-600" />
                  ) : (
                    <Trash className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
