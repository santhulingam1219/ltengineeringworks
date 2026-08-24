import { db } from "@/lib/db";
import { updateSiteSettingsAction } from "@/app/actions/settingsActions";
import { 
  GearSix, 
  ShieldCheck, 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  Globe, 
  Bell, 
  ShareNetwork,
  ToggleLeft
} from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await db.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
          Corporate Information & Platform Configuration
        </span>
        <h1 className="text-2xl font-heading font-black uppercase text-slate-900 tracking-tight mt-0.5">
          System & Enterprise Settings
        </h1>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Configure statutory credentials, SEO tags, notification email routes, and social media handles per PRD specifications.
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm">
        <form action={updateSiteSettingsAction} className="space-y-10">
          
          {/* Section 1: Company Profile & Registration */}
          <div className="space-y-4">
            <h2 className="text-base font-heading font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" weight="fill" />
              Verified Company Registration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  defaultValue={settingsMap["company_name"] || "LT Engineering Works"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Registered Business Scope
                </label>
                <input
                  type="text"
                  name="company_business"
                  defaultValue={settingsMap["company_business"] || "Mechanical, Civil & Water Projects Etc."}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  GSTIN (Verified on Letterhead)
                </label>
                <input
                  type="text"
                  name="company_gstin"
                  defaultValue={settingsMap["company_gstin"] || "21AAFFL7905E1ZO"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Partner Name
                </label>
                <input
                  type="text"
                  name="partner_name"
                  defaultValue={settingsMap["partner_name"] || "Lingam Duryodhana"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Manager Name
                </label>
                <input
                  type="text"
                  name="manager_name"
                  defaultValue={settingsMap["manager_name"] || "Lingam Tarakeswar Rao"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Paradeep Office Pin Code
                </label>
                <input
                  type="text"
                  name="company_pincode"
                  defaultValue={settingsMap["company_pincode"] || "754142"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Registered Head Office Address
                </label>
                <textarea
                  name="company_address"
                  rows={2}
                  defaultValue={settingsMap["company_address"] || "Ground Floor, Plot No. 1/298, Khata No. 23/430, Sandhakuda City, Paradeep, Dist. Jagatsinghpur, Odisha – 754142"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Hotlines & Routing */}
          <div className="space-y-4">
            <h2 className="text-base font-heading font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-500" />
              Contact Numbers & Dispatch Email
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Primary Phone
                </label>
                <input
                  type="text"
                  name="contact_phone_1"
                  defaultValue={settingsMap["contact_phone_1"] || "7073877299"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  name="contact_phone_2"
                  defaultValue={settingsMap["contact_phone_2"] || "9963008256"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  defaultValue={settingsMap["contact_email"] || "ltengineeringworks7020@gmail.com"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Notification Routing Emails */}
          <div className="space-y-4">
            <h2 className="text-base font-heading font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Automated Notification Email Recipients
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Candidate Applications Recipient
                </label>
                <input
                  type="email"
                  name="notify_email_applications"
                  defaultValue={settingsMap["notify_email_applications"] || "ltengineeringworks7020@gmail.com"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Project Quotations Recipient
                </label>
                <input
                  type="email"
                  name="notify_email_enquiries"
                  defaultValue={settingsMap["notify_email_enquiries"] || "ltengineeringworks7020@gmail.com"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  General Inquiries Recipient
                </label>
                <input
                  type="email"
                  name="notify_email_contact"
                  defaultValue={settingsMap["notify_email_contact"] || "ltengineeringworks7020@gmail.com"}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Social Media Channels */}
          <div className="space-y-4">
            <h2 className="text-base font-heading font-bold text-slate-900 uppercase border-b border-slate-200 pb-2 flex items-center gap-2">
              <ShareNetwork className="w-5 h-5 text-amber-500" />
              Corporate Social Media Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="social_linkedin"
                  defaultValue={settingsMap["social_linkedin"] || "https://www.linkedin.com/company/lt-engineering-works"}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  defaultValue={settingsMap["social_facebook"] || ""}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Save System Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
