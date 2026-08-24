import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { 
  Buildings, 
  Wrench, 
  Crane, 
  CirclesThreePlus, 
  GearSix, 
  Wall, 
  Cpu, 
  UsersThree, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle,
  Phone,
  EnvelopeSimple
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ElementType> = {
  Buildings,
  Wrench,
  Crane,
  CirclesThreePlus,
  GearSix,
  Wall,
  Cpu,
  UsersThree,
  ShieldCheck,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await db.service.findUnique({
    where: { slug },
  });

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} | Capabilities & Execution`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await db.service.findUnique({
    where: { slug },
  });

  if (!service || !service.isPublished) {
    notFound();
  }

  const Icon = iconMap[service.iconName || ""] || Buildings;

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500 rounded-sm flex items-center justify-center text-slate-950 font-black shadow-md flex-shrink-0">
              <Icon className="w-8 h-8" weight="bold" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
                {service.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Industrial Execution Scope • Paradeep, Odisha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Breakdown & Sidebar */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Scope Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-sm space-y-6 shadow-sm">
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  Service Summary
                </span>
                <p className="text-base text-slate-800 font-medium leading-relaxed font-sans">
                  {service.shortDescription}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight">
                  Detailed Technical Capabilities & Scope
                </h2>
                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                  {service.fullDescription}
                </div>
              </div>

              {/* Execution Guarantee Checklist */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900 uppercase">
                  Quality & Safety Assurance on this Work Front
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>Certified Trade Technicians Deployed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>Non-Destructive Testing (NDT) Readiness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>100% PPE & Daily Tool-Box Talks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                    <span>On-Site Supervisory Leadership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Link
                href="/services"
                className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 flex items-center gap-1"
              >
                ← Back to All Services
              </Link>
              <Link
                href="/projects"
                className="text-xs font-heading font-bold uppercase tracking-wider text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                View Related Projects Portfolio →
              </Link>
            </div>
          </div>

          {/* Right Sidebar: Direct Quotation & Contact Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white p-7 rounded-sm border border-slate-800 space-y-5 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Contract Inquiries
                </span>
                <h3 className="text-lg font-heading font-bold text-white uppercase mt-1">
                  Request Service Quote
                </h3>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Need an estimate, drawing review, or crew mobilization for <strong>{service.name}</strong>?
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                >
                  Submit Scope / BOQ
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Link>

                <Link
                  href="/manpower"
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-sm border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
                >
                  <UsersThree className="w-4 h-4 text-amber-400" />
                  Request Manpower for this Trade
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-mono text-slate-400">
                <div>Direct Hotline:</div>
                <div className="flex items-center gap-2 text-slate-200 text-sm font-bold">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <a href="tel:7073877299" className="hover:text-amber-400">
                    +91 7073877299 / 9963008256
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
