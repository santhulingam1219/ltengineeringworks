import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Engagement | LT Engineering Works",
  description: "Terms and conditions of contract execution and recruitment engagement.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm font-sans leading-relaxed">
        <h1 className="text-3xl font-heading font-black uppercase text-slate-900 border-b border-slate-200 pb-4">
          Terms of Engagement
        </h1>
        <p>
          Welcome to the digital portal of LT Engineering Works (GSTIN: 21AAFFL7905E1ZO). By using our website or submitting project enquiries/job applications, you agree to these terms.
        </p>
        <h2 className="text-lg font-heading font-bold text-slate-900 uppercase pt-4">
          1. Scope of Responsibility
        </h2>
        <p>
          The exact operational and commercial scope of responsibility for any mechanical, civil, structural, or manpower deployment contract is strictly governed by the individual execution agreement and work order executed between LT Engineering Works and the contracting party.
        </p>
        <h2 className="text-lg font-heading font-bold text-slate-900 uppercase pt-4">
          2. Recruitment & Employment Verification
        </h2>
        <p>
          Submission of an application through this portal generates an official Application ID for tracking. Final trade deployment and salary terms are confirmed upon physical trade testing and statutory document verification at our Paradeep recruitment office.
        </p>
      </div>
    </div>
  );
}
