"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { ApplicationReviewDrawer } from "./ApplicationReviewDrawer";
import { Eye, Phone, MapPin, Briefcase, User, FileText, Paperclip } from "@phosphor-icons/react";

interface ApplicationItem {
  id: string;
  applicationId: string;
  fullName: string;
  mobileNumber: string;
  altMobileNumber?: string | null;
  email?: string | null;
  currentLocation?: string | null;
  preferredLocation?: string | null;
  positionAppliedFor: string;
  yearsOfExperience?: string | null;
  qualification?: string | null;
  skills?: string | null;
  previousCompany?: string | null;
  joiningAvailability?: string | null;
  additionalInfo?: string | null;
  resumeFileUrl?: string | null;
  resumeFileName?: string | null;
  status: string;
  createdAt: Date;
  notes?: any[];
}

export function ApplicationsTable({ applications }: { applications: ApplicationItem[] }) {
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "new") return "bg-emerald-50 text-emerald-800 border-emerald-300";
    if (s === "shortlisted") return "bg-blue-50 text-blue-800 border-blue-300";
    if (s === "interviewed") return "bg-purple-50 text-purple-800 border-purple-300";
    if (s === "hired") return "bg-amber-100 text-amber-900 border-amber-400";
    return "bg-slate-100 text-slate-700 border-slate-300";
  };

  return (
    <>
      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {applications.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
            No applications received yet.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-500">
                      {app.applicationId}
                    </span>
                    {app.resumeFileUrl && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-xs font-bold">
                        <Paperclip className="w-2.5 h-2.5" />
                        CV
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-slate-950 text-base leading-tight mt-0.5">
                    {app.fullName}
                  </h3>
                  {app.qualification && (
                    <span className="text-[11px] font-mono text-slate-500 block">
                      {app.qualification}
                    </span>
                  )}
                </div>

                <span className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-xs font-semibold">
                  {app.positionAppliedFor}
                </span>
                <span className="text-slate-600 font-mono text-[11px]">
                  Exp: <strong>{app.yearsOfExperience || "Fresh"}</strong>
                </span>
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  {app.currentLocation || "Paradeep"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${app.mobileNumber}`}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" weight="bold" />
                  Call {app.mobileNumber}
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedApp(app)}
                  className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Review
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE (>= 768px) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">App ID</th>
                <th className="p-3.5">Applicant Name</th>
                <th className="p-3.5">Position Applied</th>
                <th className="p-3.5">Mobile Contact</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Resume / Bio-Data</th>
                <th className="p-3.5">Applied Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 font-mono">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {app.applicationId}
                    </td>

                    <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                      {app.fullName}
                      {app.qualification && (
                        <span className="block text-[10px] font-mono text-slate-500 font-normal">
                          {app.qualification}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                        {app.positionAppliedFor}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      <a href={`tel:${app.mobileNumber}`} className="hover:text-amber-600 font-semibold block">
                        {app.mobileNumber}
                      </a>
                    </td>

                    <td className="p-3.5 font-mono text-slate-700">
                      {app.yearsOfExperience || "Not specified"}
                    </td>

                    <td className="p-3.5 font-mono">
                      {app.resumeFileUrl ? (
                        <a
                          href={app.resumeFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={app.resumeFileName || true}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xs text-[11px] font-bold transition-colors"
                        >
                          <Paperclip className="w-3 h-3 text-amber-700" weight="bold" />
                          <span>Download CV</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Form only</span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                      {formatDate(app.createdAt)}
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xs transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Drawer */}
      {selectedApp && (
        <ApplicationReviewDrawer
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </>
  );
}
