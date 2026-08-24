import { db } from "@/lib/db";
import { MediaManager } from "@/components/admin/MediaManager";

export const revalidate = 0;

export default async function AdminMediaPage() {
  const mediaItems = await db.mediaLibrary.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Central Digital Asset Management
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Media & Gallery Library ({mediaItems.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200 self-start sm:self-auto">
          Auto-WebP Engine Active • Synced in Supabase
        </div>
      </div>

      {/* Interactive Media Manager */}
      <MediaManager initialItems={mediaItems} />
    </div>
  );
}
