import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ProjectEnquiryForm } from "@/components/forms/ProjectEnquiryForm";
import { InteractiveMapCard } from "@/components/public/InteractiveMapCard";
import { InstantQuotationCalculator } from "@/components/public/InstantQuotationCalculator";
import { 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  ShieldCheck, 
  Buildings, 
  Clock, 
  UsersThree 
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact Us & Project Inquiries | Paradeep, Odisha",
  description:
    "Get in touch with LT Engineering Works in Sandhakuda, Paradeep, Odisha. Submit project enquiries, request manpower requisitions, or contact our engineering management.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      
      {/* Page Header */}
      <section className="bg-[#0B1120] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            Paradeep Head Office & Dispatch
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-white">
            Contact LT Engineering Works
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
            Connect with our engineering team for project quotes, technical scope reviews, or site trade mobilization.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Forms */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Verified Office Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-sm border border-slate-800 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Registered Credentials
                </span>
                <h2 className="text-xl font-heading font-bold text-white uppercase">
                  Head Office Location
                </h2>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading uppercase text-sm mb-1">
                      Sandhakuda City Office
                    </strong>
                    <address className="not-italic leading-relaxed text-slate-300">
                      Ground Floor, Plot No. 1/298, Khata No. 23/430,<br />
                      Sandhakuda City, Paradeep,<br />
                      Dist. Jagatsinghpur, Odisha – 754142
                    </address>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3 font-mono">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Primary Hotline</span>
                      <a href="tel:7073877299" className="text-slate-200 hover:text-amber-400 text-sm font-bold">
                        +91 7073877299
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Secondary Hotline</span>
                      <a href="tel:9963008256" className="text-slate-200 hover:text-amber-400 text-sm font-bold">
                        +91 9963008256
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <EnvelopeSimple className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Official Email</span>
                      <a href="mailto:ltengineeringworks7020@gmail.com" className="text-slate-200 hover:text-amber-400 text-xs">
                        ltengineeringworks7020@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* GSTIN & Compliance Card */}
                <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" weight="fill" />
                    <span>GSTIN: <strong className="text-amber-400">21AAFFL7905E1ZO</strong></span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Partner: <strong className="text-slate-300">Lingam Duryodhana</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Manager: <strong className="text-slate-300">Lingam Tarakeswar Rao</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="bg-slate-100 p-6 rounded-sm border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-bold uppercase text-xs">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Response Turnaround</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our site managers respond to all project and manpower enquiries within 24 operational hours.
              </p>
            </div>
          </div>

          {/* Right Column: Project & Contact Form Tabs */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-sm border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                Direct Submission
              </span>
              <h2 className="text-2xl font-heading font-black text-slate-900 uppercase tracking-tight mt-1">
                Post Project Scope or General Inquiry
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-1">
                For commercial execution estimates, please fill out the project form below.
              </p>
            </div>

            <ProjectEnquiryForm />
          </div>

        </div>

        {/* Commercial Instant Quotation & Scope Tender Builder */}
        <div className="mt-12">
          <InstantQuotationCalculator />
        </div>

        {/* Interactive Google Map & Office Location Card */}
        <div className="mt-12">
          <InteractiveMapCard />
        </div>
      </section>

    </div>
  );
}
