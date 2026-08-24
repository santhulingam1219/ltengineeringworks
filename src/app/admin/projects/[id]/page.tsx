import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { updateProjectAction } from "@/app/actions/projectActions";
import { ArrowLeft, Buildings } from "@phosphor-icons/react/dist/ssr";
import { ImagePickerInput } from "@/components/admin/ImagePickerInput";

export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  const [project, categories] = await Promise.all([
    db.project.findUnique({
      where: { id },
      include: { 
        category: true,
        images: true,
      },
    }),
    db.projectCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
            Project Scope Editor
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
            Edit Project: {project.name}
          </h1>
        </div>

        <form action={updateProjectAction} className="space-y-6">
          <input type="hidden" name="id" value={project.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={project.name}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Discipline Category *
              </label>
              <select
                name="categoryId"
                defaultValue={project.categoryId}
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
                Project Status *
              </label>
              <select
                name="status"
                defaultValue={project.status}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              >
                <option value="completed">Completed Package</option>
                <option value="ongoing">Ongoing Work Front</option>
                <option value="upcoming">Upcoming Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Site Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={project.location}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                name="industry"
                defaultValue={project.industry || ""}
                placeholder="e.g. Petrochemical, Refinery, Heavy Infrastructure"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Peak Manpower Deployed
              </label>
              <input
                type="text"
                name="manpowerDeployed"
                defaultValue={project.manpowerDeployed || ""}
                placeholder="e.g. 45+ Technicians & Riggers"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                Execution Duration
              </label>
              <input
                type="text"
                name="duration"
                defaultValue={project.duration || ""}
                placeholder="e.g. 6 Months"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Project Cover Image Selector */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
              Project Cover & Gallery Photography
            </span>
            <ImagePickerInput
              name="coverImageUrl"
              label="Primary Project Cover Photo (Featured on Website & Card)"
              defaultValue={project.coverImageUrl || ""}
              category="project"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Brief Project Summary *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={project.description}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Technical Scope of Work
            </label>
            <textarea
              name="scopeOfWork"
              rows={5}
              defaultValue={project.scopeOfWork || ""}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              defaultChecked={project.isFeatured}
              className="w-4 h-4 text-amber-500 rounded-xs border-slate-300 focus:ring-amber-500"
            />
            <label htmlFor="isFeatured" className="text-xs font-heading font-bold uppercase text-slate-700">
              Highlight as Featured Project on Homepage & Portfolio
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
              Save Project Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
