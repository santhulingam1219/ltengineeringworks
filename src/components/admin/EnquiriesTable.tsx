"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { updateEnquiryStatusAction } from "@/app/actions/enquiryActions";
import { Eye, Phone, MapPin, X, Buildings, HardHat, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";

interface EnquiriesTableProps {
  tab: string;
  projectEnquiries: any[];
  manpowerEnquiries: any[];
  contactEnquiries: any[];
}

export function EnquiriesTable({
  tab,
  projectEnquiries,
  manpowerEnquiries,
  contactEnquiries,
}: EnquiriesTableProps) {
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

  return (
    <>
      {/* Tab 1: Project Enquiries */}
      {tab === "project" && (
        <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
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
                        <span className="inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs bg-amber-100 text-amber-800 border border-amber-300">
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
      )}

      {/* Tab 2: Manpower Requisitions */}
      {tab === "manpower" && (
        <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
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
                  manpowerEnquiries.map((me) => (
                    <tr key={me.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {me.enquiryId}
                      </td>
                      <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                        {me.companyName}
                      </td>
                      <td className="p-3.5 font-sans text-slate-700">
                        {me.contactPerson}
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">
                        <a href={`tel:${me.phone}`} className="hover:text-amber-600 font-semibold block">
                          {me.phone}
                        </a>
                      </td>
                      <td className="p-3.5 font-sans text-slate-700 max-w-xs truncate">
                        {me.requiredPositions}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-700">
                        {me.totalWorkersNeeded ? `${me.totalWorkersNeeded} Workers` : "Specified"}
                      </td>
                      <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                        {formatDate(me.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {me.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono">
                        <button
                          type="button"
                          onClick={() => openDrawer(me, "manpower")}
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
      )}

      {/* Tab 3: Contact Inquiries */}
      {tab === "contact" && (
        <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Sender Name</th>
                  <th className="p-3.5">Phone Contact</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Subject / Message</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contactEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                      No general messages received yet.
                    </td>
                  </tr>
                ) : (
                  contactEnquiries.map((ce) => (
                    <tr key={ce.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-heading font-bold text-slate-900">
                        {ce.name}
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">
                        <a href={`tel:${ce.phone}`} className="hover:text-amber-600 font-semibold block">
                          {ce.phone}
                        </a>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-xs uppercase text-[10px] font-mono">
                          {ce.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-sans text-slate-700 max-w-xs truncate">
                        {ce.message}
                      </td>
                      <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                        {formatDate(ce.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-xs bg-slate-100 text-slate-700">
                          {ce.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono">
                        <button
                          type="button"
                          onClick={() => openDrawer(ce, "contact")}
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
      )}

      {/* Slide-Over Review Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-mono font-bold text-xs rounded-xs">
                  {selectedItem.item.enquiryId || "General Inquiry"}
                </span>
                <h2 className="text-xl font-heading font-black uppercase text-white mt-1">
                  {selectedItem.item.companyName || selectedItem.item.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-white rounded-sm hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Status Manager */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold uppercase text-slate-700">
                    Lead Status Pipeline
                  </span>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase bg-amber-100 text-amber-800 rounded-xs border border-amber-300">
                    {currentStatus.replace("_", " ")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  {["new", "under_review", "quoted", "won_active", "closed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                        currentStatus === st
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <p className="text-xs font-mono text-emerald-700 bg-emerald-50 p-2 rounded-xs border border-emerald-200">
                    {feedback}
                  </p>
                )}
              </div>

              {/* Lead Details */}
              <div className="space-y-4 text-xs font-mono">
                <h3 className="font-heading font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Contact & Requirement Specifications
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Contact Person</span>
                    <span className="text-slate-900 font-bold">{selectedItem.item.contactPerson || selectedItem.item.name}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Phone Number</span>
                    <a href={`tel:${selectedItem.item.phone}`} className="text-amber-700 font-bold hover:underline">
                      {selectedItem.item.phone}
                    </a>
                  </div>

                  {selectedItem.item.email && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Email</span>
                      <span className="text-slate-800">{selectedItem.item.email}</span>
                    </div>
                  )}

                  {selectedItem.item.projectLocation && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Project Location</span>
                      <span className="text-slate-800">{selectedItem.item.projectLocation}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Scope of Work / Message Details
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedItem.item.projectDescription || selectedItem.item.requiredPositions || selectedItem.item.message}
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
              <a
                href={`tel:${selectedItem.item.phone}`}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-sm flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" weight="bold" />
                Call Client Representative
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
