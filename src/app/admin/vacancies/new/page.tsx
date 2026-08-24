import { db } from "@/lib/db";
import Link from "next/link";
import { createVacancyAction } from "@/app/actions/vacancyActions";
import { ArrowLeft, Plus } from "@phosphor-icons/react/dist/ssr";

export default async function NewVacancyPage() {
  const categories = await db.jobCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/vacancies"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vacancies Catalog
        </Link>
      </div>

      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Recruitment Publisher
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Create Trade Vacancy
          </h1>
        </div>

        <form action={createVacancyAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Trade Position Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Structural Fabricator / Pipe Fitter 6G"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Trade Category *
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
                Number of Openings *
              </label>
              <input
                type="number"
                name="openingsCount"
                required
                defaultValue="20"
                min="1"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Site Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue="Paradeep Port Area, Odisha"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Minimum Experience (Years)
              </label>
              <input
                type="number"
                name="experienceMinYears"
                defaultValue="2"
                min="0"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="e.g. ITI Fitter / Trade Tested"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Salary Display Text
              </label>
              <input
                type="text"
                name="salaryDisplay"
                placeholder="e.g. ₹24,000 - ₹32,000 / Month + Overtime"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Required Trade Skills (Comma Separated)
              </label>
              <input
                type="text"
                name="skillsRequired"
                placeholder="e.g. Blueprint Reading, Gas Cutting, Beveling, Tack Welding"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Job Description *
            </label>
            <textarea
              name="jobDescription"
              required
              rows={3}
              placeholder="Detailed description of the site scope, working conditions, and daily requirements..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Trade Responsibilities
            </label>
            <textarea
              name="responsibilities"
              rows={3}
              placeholder="1. Execution per engineering drawings...&#10;2. Daily safety adherence..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="accommodationProvided"
                name="accommodationProvided"
                defaultChecked
                className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
              />
              <label htmlFor="accommodationProvided" className="text-xs font-heading font-bold uppercase text-slate-700">
                Accommodation Provided
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transportProvided"
                name="transportProvided"
                defaultChecked
                className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
              />
              <label htmlFor="transportProvided" className="text-xs font-heading font-bold uppercase text-slate-700">
                Site Transport Provided
              </label>
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
                Feature on Homepage
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin/vacancies"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Publish Vacancy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
