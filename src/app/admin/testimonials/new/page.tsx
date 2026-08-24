import Link from "next/link";
import { createTestimonialAction } from "@/app/actions/testimonialActions";
import { ArrowLeft, Plus } from "@phosphor-icons/react/dist/ssr";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/testimonials"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Testimonials
        </Link>
      </div>

      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Client Feedback CMS
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Add Verified Client Testimonial
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Note per PRD: Only publish genuine feedback verified and supplied by company management.
          </p>
        </div>

        <form action={createTestimonialAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Client Representative Name *
              </label>
              <input
                type="text"
                name="clientName"
                required
                placeholder="e.g. R. K. Mohapatra"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                placeholder="e.g. Project Head / Lead Engineer"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Client Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                required
                placeholder="e.g. Industrial Infrastructure Corporation"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Rating (1 to 5 Stars)
              </label>
              <select
                name="rating"
                defaultValue="5"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              >
                <option value="5">5 Stars (Excellent Execution)</option>
                <option value="4">4 Stars (Good Performance)</option>
                <option value="3">3 Stars (Satisfactory)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Testimonial Statement *
            </label>
            <textarea
              name="testimonialText"
              required
              rows={4}
              placeholder="e.g. LT Engineering Works executed our structural steel erection package with high quality and zero safety violations..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              defaultChecked
              className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
            />
            <label htmlFor="isFeatured" className="text-xs font-heading font-bold uppercase text-slate-700">
              Display as Featured Feedback on Website
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin/testimonials"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Publish Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
