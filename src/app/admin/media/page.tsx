import { db } from "@/lib/db";
import { Images, Plus, Folder, FileText, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminMediaPage() {
  const mediaItems = await db.mediaLibrary.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Central Asset Management
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Media & Document Library ({mediaItems.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-200">
          Reusable Media: Project Photos, Service Graphics, Banners & Resumes
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        {mediaItems.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-sm space-y-3">
            <Images className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-heading font-bold text-slate-900 uppercase">
              Central Media Library
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
              All project photos and website imagery are centrally organized here for seamless multi-page reuse.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-sm overflow-hidden p-2 space-y-2">
                <div className="h-24 bg-slate-900 flex items-center justify-center text-slate-500">
                  <Images className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-mono text-slate-700 truncate">
                  {item.fileName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
