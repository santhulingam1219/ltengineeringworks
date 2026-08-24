"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { updateEnquiryStatusAction } from "@/app/actions/enquiryActions";
import { Eye, Phone, MapPin, X, Buildings, HardHat, EnvelopeSimple, CheckCircle, Clock } from "@phosphor-icons/react";

interface EnquiriesTableProps {
  tab?: string;
  projectEnquiries: any[];
  manpowerEnquiries: any[];
  contactEnquiries: any[];
}

export function EnquiriesTable({
  tab = "project",
  projectEnquiries,
  manpowerEnquiries,
  contactEnquiries,
}: EnquiriesTableProps) {
  const [activeTab, setActiveTab] = useState<string>(tab);
  const [selectedItem, setSelectedItem] = useState<{
    item: any;
    type: "project" | "manpower" | "contact";
  } | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const openDrawer = (item: any, type: "project" | "manpower" | "contact") => {
    setSelectedItem({ item, type });
    setCurrentStatus(item.status);
    setFeedback(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedItem) return;
    setIsUpdating(true);
    setFeedback(null);
    try {
      const res = await updateEnquiryStatusAction(selectedItem.item.id, selectedItem.type, newStatus);
      if (res.success) {
        setCurrentStatus(newStatus);
        selectedItem.item.status = newStatus;
        setFeedback(`Status updated to ${newStatus.replace("_", " ")}.`);
      } else {
        setFeedback("Failed to update status.");
      }
    } catch {
      setFeedback("Error occurred updating status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "new") {
      return "bg-emerald-500/15 text-emerald-700 border-emerald-300";
    }
    if (s === "in_review" || s === "reviewing") {
      return "bg-amber-500/15 text-amber-800 border-amber-300";
    }
    if (s === "quoted" || s === "contacted") {
      return "bg-blue-500/15 text-blue-800 border-blue-300";
    }
    return "bg-slate-200 text-slate-800 border-slate-300";
  };

  return (
    <div className="space-y-4">
      {/* Instant Client-Side Tab Switcher (0ms lag) */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab("project")}
          className={`px-3.5 py-2 rounded-sm border transition-all active:scale-95 cursor-pointer ${
            activeTab === "project"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          Project Leads ({projectEnquiries.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("manpower")}
          className={`px-3.5 py-2 rounded-sm border transition-all active:scale-95 cursor-pointer ${
            activeTab === "manpower"
              ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          Manpower ({manpowerEnquiries.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`px-3.5 py-2 rounded-sm border transition-all active:scale-95 cursor-pointer ${
            activeTab === "contact"
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          Messages ({contactEnquiries.length})
        </button>

        <a
          href={`/api/admin/export/enquiries?type=${activeTab === "manpower" ? "manpower" : "project"}`}
          download
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-sm border border-slate-700 ml-auto"
        >
          Export CSV
        </a>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PROJECT ENQUIRIES */}
      {/* ========================================================================= */}
      {activeTab === "project" && (
        <>
          {/* MOBILE CARD FEED (< 768px) */}
          <div className="md:hidden space-y-3">
            {projectEnquiries.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
                No project leads recorded yet.
              </div>
            ) : (
              projectEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {enq.enquiryId}
                      </span>
                      <h3 className="font-heading font-bold text-slate-950 text-base leading-tight">
                        {enq.companyName}
                      </h3>
                      <p className="text-xs text-slate-600 font-sans mt-0.5">
                        Contact: <strong>{enq.contactPerson}</strong>
                      </p>
                    </div>

                    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
                    <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-xs font-semibold">
                      {enq.requiredService || "General Scope"}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {enq.projectLocation || "Paradeep"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" weight="bold" />
                      Call {enq.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => openDrawer(enq, "project")}
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
                    <th className="p-3.5">Lead ID</th>
                    <th className="p-3.5">Company Name</th>
                    <th className="p-3.5">Contact Person</th>
                    <th className="p-3.5">Phone Contact</th>
                    <th className="p-3.5">Service Requested</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projectEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-500 font-mono">
                        No project leads recorded yet.
                      </td>
                    </tr>
                  ) : (
                    projectEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          {enq.enquiryId}
                        </td>
                        <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                          {enq.companyName}
                        </td>
                        <td className="p-3.5 font-sans text-slate-700">
                          {enq.contactPerson}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          <a href={`tel:${enq.phone}`} className="hover:text-amber-600 font-semibold block">
                            {enq.phone}
                          </a>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                            {enq.requiredService || "General Scope"}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-600">
                          {enq.projectLocation || "Paradeep"}
                        </td>
                        <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          <button
                            type="button"
                            onClick={() => openDrawer(enq, "project")}
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
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MANPOWER REQUISITIONS */}
      {/* ========================================================================= */}
      {activeTab === "manpower" && (
        <>
          {/* MOBILE CARD FEED (< 768px) */}
          <div className="md:hidden space-y-3">
            {manpowerEnquiries.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
                No manpower requisitions received yet.
              </div>
            ) : (
              manpowerEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {enq.requisitionId}
                      </span>
                      <h3 className="font-heading font-bold text-slate-950 text-base leading-tight">
                        {enq.companyName}
                      </h3>
                      <p className="text-xs text-slate-600 font-sans mt-0.5">
                        Person: <strong>{enq.contactPerson}</strong>
                      </p>
                    </div>

                    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
                    <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-xs font-semibold">
                      Required Trades: {enq.tradesRequired || "Crew Supply"}
                    </span>
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-xs font-mono font-bold">
                      {enq.estimatedCrewSize ? `${enq.estimatedCrewSize} Workers` : "TBD"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" weight="bold" />
                      Call {enq.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => openDrawer(enq, "manpower")}
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
                    <th className="p-3.5">Requisition ID</th>
                    <th className="p-3.5">Company / Contractor</th>
                    <th className="p-3.5">Contact Person</th>
                    <th className="p-3.5">Phone Contact</th>
                    <th className="p-3.5">Required Trades</th>
                    <th className="p-3.5">Headcount</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {manpowerEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-500 font-mono">
                        No manpower requisitions received yet.
                      </td>
                    </tr>
                  ) : (
                    manpowerEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          {enq.requisitionId}
                        </td>
                        <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                          {enq.companyName}
                        </td>
                        <td className="p-3.5 font-sans text-slate-700">
                          {enq.contactPerson}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          <a href={`tel:${enq.phone}`} className="hover:text-amber-600 font-semibold block">
                            {enq.phone}
                          </a>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-200">
                            {enq.tradesRequired || "Crew Supply"}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-700 font-bold">
                          {enq.estimatedCrewSize || "TBD"}
                        </td>
                        <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          <button
                            type="button"
                            onClick={() => openDrawer(enq, "manpower")}
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
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GENERAL CONTACT MESSAGES */}
      {/* ========================================================================= */}
      {activeTab === "contact" && (
        <>
          {/* MOBILE CARD FEED (< 768px) */}
          <div className="md:hidden space-y-3">
            {contactEnquiries.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-sm border border-slate-200 text-slate-500 font-mono text-xs">
                No general messages received yet.
              </div>
            ) : (
              contactEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-bold text-slate-950 text-base leading-tight">
                        {enq.fullName}
                      </h3>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">
                        {enq.email}
                      </p>
                    </div>

                    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-sans line-clamp-2 bg-slate-50 p-2.5 rounded-xs border border-slate-100">
                    &ldquo;{enq.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" weight="bold" />
                      Call {enq.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => openDrawer(enq, "contact")}
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
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contactEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                        No general contact messages recorded.
                      </td>
                    </tr>
                  ) : (
                    contactEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                          {enq.fullName}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          <a href={`tel:${enq.phone}`} className="hover:text-amber-600 font-semibold block">
                            {enq.phone}
                          </a>
                        </td>
                        <td className="p-3.5 font-mono text-slate-600">
                          {enq.email}
                        </td>
                        <td className="p-3.5 font-sans text-slate-700">
                          {enq.subject || "General Inquiry"}
                        </td>
                        <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs border ${getStatusBadge(enq.status)}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          <button
                            type="button"
                            onClick={() => openDrawer(enq, "contact")}
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
        </>
      )}

      {/* ========================================================================= */}
      {/* REVIEW & STATUS UPDATE MODAL / SLIDE-UP BOTTOM SHEET */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white w-full max-w-2xl rounded-t-2xl md:rounded-sm shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto flex flex-col justify-between">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl md:rounded-t-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {selectedItem.type.toUpperCase()} ENQUIRY DETAILS
                </span>
                <h3 className="font-heading font-black text-lg uppercase text-white tracking-tight">
                  {selectedItem.item.companyName || selectedItem.item.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xs bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-xs">
              {feedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono rounded-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" weight="fill" />
                  {feedback}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-sm border border-slate-200">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Contact Person</span>
                  <span className="font-heading font-bold text-slate-900 text-sm">
                    {selectedItem.item.contactPerson || selectedItem.item.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Phone Contact</span>
                  <a href={`tel:${selectedItem.item.phone}`} className="font-mono font-bold text-amber-600 hover:underline text-sm">
                    {selectedItem.item.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Email Address</span>
                  <span className="font-mono text-slate-800">{selectedItem.item.email || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Submission Date</span>
                  <span className="font-mono text-slate-800">{formatDate(selectedItem.item.createdAt)}</span>
                </div>
              </div>

              {selectedItem.item.scopeDescription && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Scope & Requirements</span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xs font-sans text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedItem.item.scopeDescription}
                  </div>
                </div>
              )}

              {selectedItem.item.message && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Message Content</span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xs font-sans text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedItem.item.message}
                  </div>
                </div>
              )}

              {/* Status Update Quick Buttons */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                  Update Lead Status
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-heading font-bold uppercase text-[11px]">
                  {["new", "in_review", "quoted", "closed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(st)}
                      className={`py-2 px-3 rounded-xs border transition-all active:scale-95 cursor-pointer text-center ${
                        currentStatus === st
                          ? "bg-amber-500 text-slate-950 border-amber-500 font-black shadow-xs"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedItem.item.phone}`}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-xs flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-4 h-4" weight="bold" />
                Call Directly
              </a>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-heading font-bold uppercase tracking-wider text-xs rounded-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
