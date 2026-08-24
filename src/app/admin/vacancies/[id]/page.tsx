import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { updateVacancyAction } from "@/app/actions/vacancyActions";
import { ArrowLeft, HardHat } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditVacancyPage({ params }: Props) {
  const { id } = await params;

  const [vacancy, categories] = await Promise.all([
    db.vacancy.findUnique({
      where: { id },
      include: { category: true },
    }),
    db.jobCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  if (!vacancy) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/vacancies"
          className="text-xs font-heading font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vacancy Catalog
        </Link>
      </div>

      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Vacancy Editor • {vacancy.jobId}
          </span>
          <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Edit Vacancy: {vacancy.title}
          </h1>
        </div>

        <form action={updateVacancyAction} className="space-y-6">
          <input type="hidden" name="id" value={vacancy.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={vacancy.title}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Trade Category *
              </label>
              <select
                name="categoryId"
                defaultValue={vacancy.categoryId || ""}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
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
                Publication Status *
              </label>
              <select
                name="status"
                defaultValue={vacancy.status}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              >
                <option value="published">Published (Active on website)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="closed">Closed / Filled</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Openings Count
              </label>
              <input
                type="number"
                name="openingsCount"
                defaultValue={vacancy.openingsCount}
                min={1}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Min. Experience (Years)
              </label>
              <input
                type="number"
                name="experienceMinYears"
                defaultValue={vacancy.experienceMinYears}
                min={0}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Site Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={vacancy.location}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Salary Display / Wages
              </label>
              <input
                type="text"
                name="salaryDisplay"
                defaultValue={vacancy.salaryDisplay || ""}
                placeholder="e.g. ₹25,000 - ₹35,000 / Month + Overtime"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
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
              rows={4}
              defaultValue={vacancy.jobDescription}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="accommodationProvided"
                defaultChecked={vacancy.accommodationProvided}
                className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
              />
              Free Accommodation Provided
            </label>

            <label className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="transportProvided"
                defaultChecked={vacancy.transportProvided}
                className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
              />
              Site Transportation Provided
            </label>

            <label className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={vacancy.isFeatured}
                className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
              />
              Featured Priority Role
            </label>
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
              Save Vacancy Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
