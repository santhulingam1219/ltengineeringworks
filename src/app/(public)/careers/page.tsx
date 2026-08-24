import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { TradeSkillMatrix } from "@/components/public/TradeSkillMatrix";
import { 
  HardHat, 
  MapPin, 
  Briefcase, 
  Users, 
  ArrowRight, 
  CurrencyInr, 
  House, 
  ShieldCheck, 
  CheckCircle,
  Clock
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Current Job Vacancies & Manpower Recruitment | Paradeep, Odisha",
  description:
    "Explore open industrial jobs in Paradeep, Odisha. Urgent openings for fabricators, fitters, supervisors, riggers, and engineering technicians with accommodation and transport provided.",
};

export const revalidate = 30;

interface Props {
  searchParams: Promise<{ category?: string; query?: string }>;
}

export default async function CareersPage({ searchParams }: Props) {
  const { category, query } = await searchParams;

  const where: any = {
    status: "published",
    deletedAt: null,
  };

  if (category) {
    where.category = { slug: category };
  }

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { location: { contains: query } },
      { skillsRequired: { contains: query } },
    ];
  }

  const [vacancies, categories] = await Promise.all([
    db.vacancy.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
      },
    }),
    db.jobCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <HardHat className="w-4 h-4 text-amber-400" />
            Recruitment Drive • Paradeep Projects
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Current Job Opportunities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Explore active industrial trade requirements and project-based employment opportunities with LT Engineering Works in Paradeep, Odisha.
          </p>
        </div>
      </section>

      {/* Main List Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider">
            <Link
              href="/careers"
              className={`px-3.5 py-2 rounded-sm border transition-all ${
                !category
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              All Openings ({vacancies.length})
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/careers?category=${c.slug}`}
                className={`px-3.5 py-2 rounded-sm border transition-all ${
                  category === c.slug
                    ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-500">
            Accommodation & Transport provided for outstation workers
          </div>
        </div>

        {/* Vacancies List */}
        {vacancies.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 text-center rounded-sm space-y-3">
            <HardHat className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-slate-900 uppercase">
              No Open Vacancies in this Category
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              There are currently no active openings matching your criteria. Please check back soon or submit a general application.
            </p>
            <Link
              href="/careers"
              className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-heading font-bold uppercase rounded-sm mt-2"
            >
              View All Openings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacancies.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-slate-200 p-6 rounded-sm hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/15 text-amber-800 border border-amber-500/30 rounded-xs uppercase">
                      {v.jobId}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs">
                      {v.employmentType}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                      {v.title}
                    </h2>
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 font-mono mt-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{v.openingsCount} Openings Available</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                    {v.jobDescription}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700 font-mono">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{v.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span>
                        {v.experienceMinYears}
                        {v.experienceMaxYears ? `–${v.experienceMaxYears}` : "+"} Years Experience
                      </span>
                    </div>

                    {v.salaryDisplay && (
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <CurrencyInr className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{v.salaryDisplay}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-slate-600">
                      <House className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>
                        Accommodation: {v.accommodationProvided ? "Provided" : "Not Provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/careers/${v.slug}`}
                    className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                  >
                    View Job Details & Apply
                    <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Trade Skill & Qualification Matrix */}
        <div className="pt-6">
          <TradeSkillMatrix />
        </div>

      </section>

      {/* Recruitment Support Banner */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Need Assistance with Application?
            </span>
            <h3 className="text-xl font-heading font-bold uppercase text-white">
              Call Our Recruitment Office in Paradeep
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <a
              href="tel:7073877299"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-sm border border-slate-700 flex items-center gap-2"
            >
              +91 7073877299
            </a>
            <a
              href="tel:9963008256"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-sm border border-slate-700 flex items-center gap-2"
            >
              +91 9963008256
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
