import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { EquipmentFleetSection } from "@/components/public/EquipmentFleetSection";
import { IndustrialRateCardEstimator } from "@/components/public/IndustrialRateCardEstimator";
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
  ArrowRight
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities",
  description:
    "Explore LT Engineering Works core capabilities: Structural fabrication, heavy erection, high-pressure piping, mechanical shutdown maintenance, civil works, and manpower solutions in Paradeep, Odisha.",
};

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

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* Page Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            9 Core Disciplines
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Industrial Engineering Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Multi-disciplinary technical capabilities executed with certified fitters, welders, riggers, and seasoned site engineers across Paradeep and Eastern India.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName || ""] || Buildings;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200 p-8 rounded-sm hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-slate-900 rounded-sm flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                      <Icon className="w-6 h-6" weight="bold" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-900 group-hover:text-amber-600 transition-colors"
                  >
                    Explore Technical Scope
                    <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-mono text-blue-600 hover:underline"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Machinery & Equipment Fleet Section */}
        <div className="pt-8">
          <EquipmentFleetSection />
        </div>

        {/* Industrial Rate Card & Scope Estimator */}
        <div className="pt-8">
          <IndustrialRateCardEstimator />
        </div>

        {/* Engineering Services FAQs */}
        <div className="pt-8">
          <FaqAccordion
            title="Engineering Execution & Contracting FAQs"
            items={[
              {
                question: "How quickly can LT Engineering Works mobilize site crews in Paradeep?",
                answer: "For standard structural fabrication and piping work fronts in Paradeep, initial supervisor and trade crews can mobilize within 48 to 72 hours. Large crew deployments (50+ personnel) are organized within 7 calendar days with full gate passes and medical checks.",
              },
              {
                question: "Are all tradesmen covered under statutory ESI, PF, and site insurance?",
                answer: "Yes. 100% of our mobilized engineers, supervisors, fabricators, fitters, riggers, and helpers are enrolled under statutory ESI & PF schemes with valid UAN numbers and comprehensive group personal accident insurance.",
              },
              {
                question: "What quality assurance and NDT inspection standards are followed?",
                answer: "We adhere strictly to AWS D1.1 for structural steel and ASME Section IX / B31.3 for piping. NDT procedures including Dye Penetrant Inspection (DPI), Magnetic Particle Inspection (MPI), and Radiographic Testing (RT) are coordinated per client QAP.",
              },
              {
                question: "Does LT Engineering Works handle shutdown turnaround maintenance?",
                answer: "Yes. We execute time-critical refinery, fertilizer, and petrochemical plant shutdown turnarounds on 24/7 round-the-clock shift schedules to ensure zero restart delays.",
              },
            ]}
          />
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-14 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-heading font-bold uppercase tracking-tight text-white">
              Need a Custom Turnkey Execution Package?
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              We combine civil, structural, piping, and manpower to execute integrated project scopes.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all active:scale-[0.98] flex-shrink-0"
          >
            Submit Project Specifications
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      </section>
    </div>
  );
}
