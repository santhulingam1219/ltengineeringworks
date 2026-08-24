"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { ApplicationReviewDrawer } from "./ApplicationReviewDrawer";
import { Eye, Phone } from "@phosphor-icons/react";

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
  status: string;
  createdAt: Date;
  notes?: any[];
}

export function ApplicationsTable({ applications }: { applications: ApplicationItem[] }) {
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">App ID</th>
                <th className="p-3.5">Applicant Name</th>
                <th className="p-3.5">Position Applied</th>
                <th className="p-3.5">Mobile Contact</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Location</th>
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

                    <td className="p-3.5 font-mono text-slate-600">
                      {app.currentLocation || "Paradeep Area"}
                    </td>

                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                      {formatDate(app.createdAt)}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs ${
                          app.status === "new"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : app.status === "shortlisted"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : app.status === "selected" || app.status === "joined"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xs transition-all flex items-center gap-1 ml-auto cursor-pointer"
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

      {selectedApp && (
        <ApplicationReviewDrawer
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusUpdated={() => {
            // Refreshes data dynamically
          }}
        />
      )}
    </>
  );
}
