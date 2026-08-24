import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { WorkerApplyForm } from "@/components/forms/WorkerApplyForm";
import { 
  HardHat, 
  MapPin, 
  Briefcase, 
  Users, 
  CurrencyInr, 
  House, 
  ForkKnife, 
  Car, 
  Clock, 
  CalendarCheck, 
  CheckCircle,
  Phone,
  ShieldCheck
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = await db.vacancy.findUnique({
    where: { slug },
  });

  if (!vacancy) {
    return { title: "Vacancy Not Found" };
  }

  return {
    title: `${vacancy.title} (${vacancy.openingsCount} Openings) | Paradeep, Odisha`,
    description: `${vacancy.jobDescription.substring(0, 150)} | Apply directly at LT Engineering Works.`,
  };
}

export default async function VacancyDetailPage({ params }: Props) {
  const { slug } = await params;
  const vacancy = await db.vacancy.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!vacancy || vacancy.status !== "published" || vacancy.deletedAt) {
    notFound();
  }

  let skillsList: string[] = [];
  try {
    if (vacancy.skillsRequired) {
      skillsList = JSON.parse(vacancy.skillsRequired);
    }
  } catch {
    skillsList = [];
  }

  // Google JobPosting JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: vacancy.title,
    description: vacancy.jobDescription,
    identifier: {
      "@type": "PropertyValue",
      name: "LT Engineering Works",
      value: vacancy.jobId,
    },
    datePosted: vacancy.publishedAt?.toISOString() || vacancy.createdAt.toISOString(),
    validThrough: vacancy.deadlineDate?.toISOString() || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: vacancy.employmentType === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "LT Engineering Works",
      sameAs: "https://ltengineeringworks.com",
      logo: "https://ltengineeringworks.com/logo.svg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sandhakuda City",
        addressLocality: "Paradeep",
        addressRegion: "Odisha",
        postalCode: "754142",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Inject JobPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/careers" className="hover:underline">
              Careers & Vacancies
            </Link>
            <span>/</span>
            <span>{vacancy.jobId}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-500 text-slate-950 rounded-xs uppercase">
              {vacancy.openingsCount} Openings Available
            </span>
            <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-xs">
              {vacancy.employmentType}
            </span>
            {vacancy.category && (
              <span className="text-xs font-mono text-amber-400 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-xs">
                {vacancy.category.name}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white leading-tight">
            {vacancy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{vacancy.location}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>
                {vacancy.experienceMinYears}
                {vacancy.experienceMaxYears ? `–${vacancy.experienceMaxYears}` : "+"} Years Experience
              </span>
            </div>

            {vacancy.salaryDisplay && (
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <CurrencyInr className="w-4 h-4" />
                <span>{vacancy.salaryDisplay}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Quick Application Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Full Specifications */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-sm shadow-sm space-y-6">
              
              {/* Job Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight">
                  Position Overview & Job Description
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                  {vacancy.jobDescription}
                </p>
              </div>

              {/* Responsibilities */}
              {vacancy.responsibilities && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-heading font-bold text-slate-900 uppercase">
                    Key Trade Responsibilities
                  </h3>
                  <div className="text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line bg-slate-50 p-6 rounded-sm border border-slate-200">
                    {vacancy.responsibilities}
                  </div>
                </div>
              )}

              {/* Required Trade Skills */}
              {skillsList.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-heading font-bold text-slate-900 uppercase">
                    Required Trade Skills & Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xs text-xs font-mono font-semibold text-slate-800 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" weight="fill" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Logistics & Benefits Grid */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900 uppercase">
                  Logistics, Facilities & Terms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex items-center gap-2.5">
                    <House className="w-4 h-4 text-amber-600 flex-shrink-0" weight="fill" />
                    <span>Accommodation: <strong>{vacancy.accommodationProvided ? "Company Provided" : "Not Provided"}</strong></span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-blue-600 flex-shrink-0" weight="fill" />
                    <span>Site Transport: <strong>{vacancy.transportProvided ? "Company Provided" : "Self / Site based"}</strong></span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>Joining Time: <strong>{vacancy.joiningRequirement}</strong></span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-slate-700 flex-shrink-0" weight="fill" />
                    <span>Compliance: <strong>ESI, PF & Site Insurance</strong></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Back Link */}
            <div className="pt-2">
              <Link
                href="/careers"
                className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 flex items-center gap-1"
              >
                ← Back to All Vacancies
              </Link>
            </div>
          </div>

          {/* Right Column: Direct Instant Application Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-sm shadow-md space-y-6">
            <div className="border-b border-slate-200 pb-4 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                Direct Application Form
              </span>
              <h3 className="text-xl font-heading font-black text-slate-900 uppercase">
                Apply for {vacancy.title}
              </h3>
              <p className="text-xs text-slate-600 font-sans">
                No complicated registration required. Submit your mobile number and trade details below.
              </p>
            </div>

            <WorkerApplyForm
              vacancyId={vacancy.id}
              defaultPosition={vacancy.title}
            />

            <div className="pt-4 border-t border-slate-100 text-center space-y-2">
              <span className="text-xs font-mono text-slate-500 block">
                Prefer applying by phone or WhatsApp?
              </span>
              <div className="flex justify-center gap-3 font-mono text-xs font-bold text-slate-900">
                <a href="tel:7073877299" className="hover:text-amber-600 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  +91 7073877299
                </a>
                <span>|</span>
                <a href="tel:9963008256" className="hover:text-amber-600 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  +91 9963008256
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
