import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProjectGalleryLightbox } from "@/components/public/ProjectGalleryLightbox";
import { 
  Buildings, 
  MapPin, 
  UsersThree, 
  Clock, 
  CalendarCheck, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle,
  FileText
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Project Scope & Execution`,
    description: project.description.substring(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { displayOrder: "asc" },
      },
    },
  });

  if (!project || !project.isPublished || project.deletedAt) {
    notFound();
  }

  let servicesList: string[] = [];
  try {
    if (project.servicesProvided) {
      servicesList = JSON.parse(project.servicesProvided);
    }
  } catch {
    servicesList = [];
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/projects" className="hover:underline">
              Project Portfolio
            </Link>
            <span>/</span>
            <span>{project.category.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xs uppercase ${
                project.status === "completed"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-blue-600 text-white"
              }`}
            >
              {project.status === "completed" ? "Completed Package" : "Ongoing Project"}
            </span>
            {project.industry && (
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-xs">
                {project.industry}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase text-white leading-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{project.location}</span>
            </div>
            {project.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Duration: {project.duration}</span>
              </div>
            )}
            {project.manpowerDeployed && (
              <div className="flex items-center gap-1.5">
                <UsersThree className="w-4 h-4 text-blue-400" />
                <span>{project.manpowerDeployed}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Scope & Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-6 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  Project Executive Summary
                </span>
                <p className="text-base text-slate-800 font-medium leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {project.scopeOfWork && (
                <div className="space-y-3">
                  <h2 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight">
                    Technical Scope of Work
                  </h2>
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans bg-slate-50 p-6 rounded-sm border border-slate-200">
                    {project.scopeOfWork}
                  </div>
                </div>
              )}

              {/* Services Rendered */}
              {servicesList.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-heading font-bold text-slate-900 uppercase">
                    Engineering Disciplines Deployed
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((srv, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xs text-xs font-mono font-semibold text-slate-800"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Lightbox Gallery */}
              <ProjectGalleryLightbox
                images={project.images}
                projectName={project.name}
              />
            </div>

            {/* Back to Catalog */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/projects"
                className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 flex items-center gap-1"
              >
                ← Back to Project Catalog
              </Link>
              <Link
                href="/contact"
                className="text-xs font-heading font-bold uppercase tracking-wider text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                Inquire for Similar Project Scope →
              </Link>
            </div>
          </div>

          {/* Right Column: Project Specifications Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white p-7 rounded-sm border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Contract Scope Parameters
                </span>
                <h3 className="text-lg font-heading font-bold text-white uppercase mt-1">
                  Project Data Sheet
                </h3>
              </div>

              <div className="space-y-3.5 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Discipline Category</span>
                  <span className="text-amber-400 font-bold text-sm">{project.category.name}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Execution Status</span>
                  <span className="text-white font-semibold capitalize">{project.status}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                  <span className="text-white">{project.location}</span>
                </div>

                {project.manpowerDeployed && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Workforce Deployed</span>
                    <span className="text-white">{project.manpowerDeployed}</span>
                  </div>
                )}

                {project.duration && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Project Duration</span>
                    <span className="text-white">{project.duration}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <Link
                  href={`/contact?project=${encodeURIComponent(project.name)}`}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                >
                  Discuss Similar Scope
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Link>
                <Link
                  href="/careers"
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-sm border border-slate-700 transition-all text-center block"
                >
                  View Open Vacancies
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
