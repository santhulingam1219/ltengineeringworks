import { db } from "@/lib/db";
import Link from "next/link";
import { createProjectAction } from "@/app/actions/projectActions";
import { ArrowLeft, Plus } from "@phosphor-icons/react/dist/ssr";
import { ImagePickerInput } from "@/components/admin/ImagePickerInput";
import { MultiImagePickerInput } from "@/components/admin/MultiImagePickerInput";

export default async function NewProjectPage() {
  const categories = await db.projectCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project Catalog
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Add New Industrial Project
          </h1>
        </div>

        <form action={createProjectAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Industrial Structural Steel Fabrication & Erection Package"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Discipline Category *
              </label>
              <select
                name="categoryId"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Execution Status
              </label>
              <select
                name="status"
                defaultValue="completed"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              >
                <option value="completed">Completed Package</option>
                <option value="ongoing">Ongoing Work Front</option>
                <option value="upcoming">Upcoming Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue="Paradeep, Odisha"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Industry Domain
              </label>
              <input
                type="text"
                name="industry"
                placeholder="e.g. Petrochemical / Heavy Manufacturing"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Manpower Deployed
              </label>
              <input
                type="text"
                name="manpowerDeployed"
                placeholder="e.g. 80+ Skilled Fitters & Riggers"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Duration
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 6 Months"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Project Primary Cover Photo & Multi-Image Gallery */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-4">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
              Visual Presentation & Multi-Photo Gallery
            </span>
            <ImagePickerInput
              name="coverImageUrl"
              label="Primary Project Cover Photo (Featured Image)"
              category="project"
            />
            <div className="pt-3 border-t border-slate-200">
              <MultiImagePickerInput
                name="galleryImages"
                label="Project Photo Gallery (Multiple Uploads / Multi-Select from Supabase)"
                category="project"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Description *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Brief summary of the industrial project package executed..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Technical Scope of Work
            </label>
            <textarea
              name="scopeOfWork"
              rows={4}
              placeholder="Detail specific tonnage, piping dia, machinery specifications, inspection protocols..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
            />
            <label htmlFor="isFeatured" className="text-xs font-heading font-bold uppercase text-slate-700">
              Display as Featured Project on Homepage
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Save & Publish Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
