import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LT Engineering Works",
  description: "Data protection and privacy guidelines for applicants, contractors, and visitors.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm font-sans leading-relaxed">
        <h1 className="text-3xl font-heading font-black uppercase text-slate-900 border-b border-slate-200 pb-4">
          Privacy Policy & Data Protection
        </h1>
        <p>
          LT Engineering Works (Sandhakuda City, Paradeep, Odisha – 754142) is committed to protecting the privacy of workers, industrial clients, and website visitors.
        </p>
        <h2 className="text-lg font-heading font-bold text-slate-900 uppercase pt-4">
          1. Information We Collect
        </h2>
        <p>
          We collect personal details submitted directly through our recruitment forms (such as Name, Phone Number, Trade Experience, and Resume documents) and business enquiry forms (such as Company Name, Contact Person, and Project Specifications).
        </p>
        <h2 className="text-lg font-heading font-bold text-slate-900 uppercase pt-4">
          2. Use of Information
        </h2>
        <p>
          Submitted information is strictly utilized for employment evaluation, site crew mobilization, project quotation formulation, and statutory compliance. We do not sell or distribute personal or commercial data to third-party marketing entities.
        </p>
      </div>
    </div>
  );
}
