import Link from "next/link";
import { createNewsPostAction } from "@/app/actions/newsActions";
import { ArrowLeft, Plus } from "@phosphor-icons/react/dist/ssr";
import { ImagePickerInput } from "@/components/admin/ImagePickerInput";

export default function NewNewsPostPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/news"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News Catalog
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Company Communications CMS
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Create News / Announcement Post
          </h1>
        </div>

        <form action={createNewsPostAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. LT Engineering Works Commences Structural Package at Paradeep Site"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                News Category
              </label>
              <select
                name="category"
                defaultValue="Company Update"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              >
                <option value="Company Update">Company Update</option>
                <option value="Project Milestone">Project Milestone</option>
                <option value="Recruitment Drive">Recruitment Drive</option>
                <option value="Safety Achievement">Safety Achievement</option>
                <option value="Notice">Official Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Publication Status
              </label>
              <select
                name="status"
                defaultValue="published"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              >
                <option value="published">Published Immediately</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          {/* Featured Image Selector */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
              Announcement Banner Image
            </span>
            <ImagePickerInput
              name="featuredImageUrl"
              label="Featured Post Image (Auto-Converts to WebP)"
              category="news"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Short Excerpt / Summary
            </label>
            <input
              type="text"
              name="excerpt"
              placeholder="Brief 1-2 sentence preview for cards..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Post Content *
            </label>
            <textarea
              name="content"
              required
              rows={8}
              placeholder="Write the full announcement or update text here..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Publish News Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
