import type { Metadata } from "next";
import Link from "next/link";
import { 
  Buildings, 
  ShieldCheck, 
  UsersThree, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  ArrowRight,
  HardHat,
  CheckCircle,
  Target,
  Eye,
  Handshake
} from "@phosphor-icons/react/dist/ssr";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { CompanyTimelineSection } from "@/components/public/CompanyTimelineSection";
import { ComplianceCertificatesViewer } from "@/components/public/ComplianceCertificatesViewer";

export const metadata: Metadata = {
  title: "About Us | Industrial Engineering Contractor Paradeep",
  description:
    "Learn about LT Engineering Works — an industrial project execution, structural fabrication, erection, and skilled manpower firm based in Sandhakuda, Paradeep, Odisha.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Page Hero Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            Corporate Profile & Leadership
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            About LT Engineering Works
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Executing heavy industrial engineering, mechanical overhauls, high-pressure piping, structural works, and skilled manpower mobilization from Paradeep, Odisha.
          </p>
        </div>
      </section>

      {/* Main Company Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
              Company Background
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-slate-900">
              Industrial Execution & Skilled Manpower Solutions
            </h2>
            <p>
              <strong>LT Engineering Works</strong> is an industrial contracting and engineering solutions company headquartered at <strong>Sandhakuda City, Paradeep (Dist. Jagatsinghpur, Odisha)</strong>. We specialize in the end-to-end execution of mechanical, civil, structural fabrication, erection, and high-pressure utility piping works for heavy industrial complexes, petrochemical plants, and infrastructure contractors.
            </p>
            <p>
              We are not merely a labor contractor. Our operational model bridges rigorous engineering planning with rapid on-site trade mobilization. When clients award a contract scope to LT Engineering Works, our team handles planning, trade crew deployment, shop/field fabrication, high-elevation crane erection, and quality inspection to deliver completed packages within aggressive turnaround schedules.
            </p>

            <div className="p-6 bg-slate-100 border-l-4 border-amber-500 rounded-r-sm space-y-2">
              <h3 className="font-heading font-bold text-slate-900 uppercase text-sm">
                Verified Business Scope & Registration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered under the GST Act (GSTIN: <strong>21AAFFL7905E1ZO</strong>), we maintain full statutory compliance including ESI, PF, safety insurance, and labor licensing across all operational work fronts in Odisha and Eastern India.
              </p>
            </div>
          </div>

          {/* Key Executive Leadership & Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-7 rounded-sm border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Key Company Leadership
                </span>
                <h3 className="text-lg font-heading font-bold text-white uppercase mt-1">
                  Executive Management
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/80 p-4 rounded-sm border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-sm flex-shrink-0">
                    LD
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Partner
                    </span>
                    <h4 className="text-base font-heading font-bold text-white uppercase">
                      Lingam Duryodhana
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Strategic Operations & Executive Governance
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-sm border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-sm bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-sm flex-shrink-0">
                    TR
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Manager
                    </span>
                    <h4 className="text-base font-heading font-bold text-white uppercase">
                      Lingam Tarakeswar Rao
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Site Execution, Client Coordination & Workforce Mobilization
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Contact Strip */}
              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Ground Floor, Plot No. 1/298, Khata No. 23/430, Sandhakuda City, Paradeep, Dist. Jagatsinghpur, Odisha – 754142</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>+91 7073877299 / 9963008256</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facility & Work Front Photography Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-96 shadow-md flex items-end p-4 sm:p-6 group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('/images/fabrication-workshop.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className="relative z-10 w-full space-y-1.5 bg-slate-950/90 border border-slate-700/80 p-4 rounded-sm shadow-xl backdrop-blur-md">
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
                Fabrication Workshop & Yard
              </span>
              <h4 className="text-base sm:text-lg font-heading font-black uppercase text-white tracking-tight">
                Heavy Structural & Spool Pre-Fabrication
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Equipped with overhead gantry cranes, precision saw cutting, plate bending, and certified 6G welding bays.
              </p>
            </div>
          </div>

          <div className="relative rounded-sm overflow-hidden border border-slate-300 bg-slate-900 h-80 sm:h-96 shadow-md flex items-end p-4 sm:p-6 group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('/images/piping-erection-site.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className="relative z-10 w-full space-y-1.5 bg-slate-950/90 border border-slate-700/80 p-4 rounded-sm shadow-xl backdrop-blur-md">
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded-xs inline-block">
                Refinery & Site Execution
              </span>
              <h4 className="text-base sm:text-lg font-heading font-black uppercase text-white tracking-tight">
                High-Pressure Piping & Shutdown Turnaround
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Rigorous NDT testing, 100% radiography pass rates, and hydrostatic pressure certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm space-y-4">
              <div className="w-12 h-12 bg-amber-500/15 border border-amber-500/30 rounded-sm flex items-center justify-center text-amber-600">
                <Target className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-lg font-heading font-black text-slate-900 uppercase">
                Our Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                To deliver high-precision industrial engineering works and deploy verified, safety-conscious manpower that enables our clients to achieve on-time plant execution and seamless shutdown turnarounds.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm space-y-4">
              <div className="w-12 h-12 bg-blue-500/15 border border-blue-500/30 rounded-sm flex items-center justify-center text-blue-600">
                <Eye className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-lg font-heading font-black text-slate-900 uppercase">
                Our Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                To be recognized as Eastern India’s most reliable industrial execution partner, acclaimed for technical integrity, disciplined workforce management, and an uncompromising safety record.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm space-y-4">
              <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 rounded-sm flex items-center justify-center text-emerald-600">
                <Handshake className="w-6 h-6" weight="bold" />
              </div>
              <h3 className="text-lg font-heading font-black text-slate-900 uppercase">
                Our Core Values
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Technical precision, timeline accountability, absolute workforce safety, transparent statutory compliance, and long-term contractor partnerships.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Growth & Milestone Roadmap */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompanyTimelineSection />
      </section>

      {/* Statutory Legal & Insurance Compliance Dossier */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComplianceCertificatesViewer />
      </section>

      {/* Verified Client Testimonials */}
      <TestimonialsSection />

      {/* Call to action */}
      <section className="py-16 bg-[#0B1120] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white">
            Ready to Partner With LT Engineering Works?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Whether you require complete project execution or specialized trade manpower, our management is prepared to discuss your project requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm shadow-md transition-all active:scale-[0.98]"
            >
              Post Project Enquiry
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-sm border border-slate-700 transition-all active:scale-[0.98]"
            >
              <Buildings className="w-4 h-4 text-amber-400" />
              View 30+ Completed Projects
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
