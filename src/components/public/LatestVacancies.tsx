import Link from "next/link";
import { HardHat, MapPin, Briefcase, Users, ArrowRight, CurrencyInr } from "@phosphor-icons/react/dist/ssr";

interface VacancyItem {
  id: string;
  jobId: string;
  slug: string;
  title: string;
  location: string;
  openingsCount: number;
  experienceMinYears: number;
  experienceMaxYears?: number | null;
  employmentType: string;
  salaryDisplay?: string | null;
  accommodationProvided: boolean;
}

export function LatestVacancies({ vacancies = [] }: { vacancies?: VacancyItem[] }) {
  // Default vacancies fallback
  const displayVacancies = vacancies.length > 0 ? vacancies : [
    {
      id: "1",
      jobId: "LT-VAC-2026-001",
      slug: "structural-fabricator-paradeep",
      title: "Structural Fabricator",
      location: "Paradeep Port Area, Odisha",
      openingsCount: 25,
      experienceMinYears: 2,
      experienceMaxYears: 6,
      employmentType: "Project Based",
      salaryDisplay: "₹24,000 - ₹34,000 / Month",
      accommodationProvided: true,
    },
    {
      id: "2",
      jobId: "LT-VAC-2026-002",
      slug: "pipe-fitter-paradeep",
      title: "Pipe Fitter (Utility & Process)",
      location: "Paradeep Industrial Zone, Odisha",
      openingsCount: 30,
      experienceMinYears: 3,
      experienceMaxYears: 7,
      employmentType: "Project Based",
      salaryDisplay: "₹26,000 - ₹36,000 / Month",
      accommodationProvided: true,
    },
    {
      id: "3",
      jobId: "LT-VAC-2026-003",
      slug: "site-mechanical-supervisor-paradeep",
      title: "Site Mechanical Supervisor",
      location: "Paradeep, Odisha",
      openingsCount: 4,
      experienceMinYears: 5,
      experienceMaxYears: 10,
      employmentType: "Full-time / Contractual",
      salaryDisplay: "₹38,000 - ₹55,000 / Month",
      accommodationProvided: true,
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-2">
              <HardHat className="w-4 h-4" />
              Recruitment Openings
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-slate-900">
              Active Trade Vacancies
            </h2>
          </div>
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-blue-700 hover:text-blue-800 uppercase tracking-wider"
          >
            View All Open Vacancies
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>

        {/* Vacancies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayVacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="bg-white border border-slate-200 p-6 rounded-sm hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/15 text-amber-700 border border-amber-500/30 rounded-xs uppercase">
                    {vacancy.jobId}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs">
                    {vacancy.employmentType}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                    {vacancy.title}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 font-mono mt-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{vacancy.openingsCount} Openings Available</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{vacancy.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {vacancy.experienceMinYears}
                      {vacancy.experienceMaxYears ? `–${vacancy.experienceMaxYears}` : "+"} Years Exp.
                    </span>
                  </div>
                  {vacancy.salaryDisplay && (
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <CurrencyInr className="w-3.5 h-3.5 text-amber-600" />
                      <span>{vacancy.salaryDisplay}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href={`/careers/${vacancy.slug}`}
                  className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                >
                  View Details & Apply
                  <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
