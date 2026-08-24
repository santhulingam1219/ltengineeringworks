"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { updateApplicationStatusAction } from "@/app/actions/applicationActions";
import { 
  X, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  FileText,
  ChatCircleText,
  DownloadSimple,
  FileDoc,
  FilePdf
} from "@phosphor-icons/react";

interface ApplicationNote {
  id: string;
  noteText: string;
  createdAt: Date;
  user?: {
    fullName: string;
  } | null;
}

interface ApplicationData {
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
  notes?: ApplicationNote[];
}

export function ApplicationReviewDrawer({
  application,
  onClose,
  onStatusUpdated,
}: {
  application: ApplicationData | null;
  onClose: () => void;
  onStatusUpdated?: () => void;
}) {
  const [currentStatus, setCurrentStatus] = useState(application?.status || "new");
  const [noteText, setNoteText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!application) return null;

  const statuses = [
    "new",
    "under_review",
    "shortlisted",
    "interviewed",
    "selected",
    "hired",
    "rejected",
    "on_hold",
  ];

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setFeedback(null);
    try {
      const res = await updateApplicationStatusAction(
        application.id,
        newStatus,
        undefined,
        noteText.trim() ? noteText : undefined
      );

      if (res.success) {
        setCurrentStatus(newStatus);
        setFeedback(`Status updated to ${newStatus.toUpperCase()}`);
        if (noteText.trim()) setNoteText("");
        if (onStatusUpdated) onStatusUpdated();
      } else {
        setFeedback("Failed to update status.");
      }
    } catch (err) {
      setFeedback("Error occurred while updating.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 overflow-y-auto">
        
        {/* Drawer Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                {application.applicationId}
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-xs border border-slate-700">
                {formatDate(application.createdAt)}
              </span>
            </div>
            <h2 className="text-xl font-heading font-black uppercase text-white mt-1">
              {application.fullName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Quick Status Bar */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">
              Current Hiring Status: <strong className="text-amber-700 uppercase">{currentStatus.replace("_", " ")}</strong>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {statuses.map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer ${
                    currentStatus === st
                      ? "bg-slate-900 text-amber-400 border border-slate-900 shadow-xs"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
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

          {/* Attached Resume / Bio-Data Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>Candidate Resume / Bio-Data Document</span>
              {application.resumeFileUrl && (
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  Document Attached
                </span>
              )}
            </h3>

            {application.resumeFileUrl ? (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-sm space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {application.resumeFileName?.toLowerCase().endsWith(".pdf") ? (
                      <FilePdf className="w-6 h-6 text-red-600 flex-shrink-0" weight="fill" />
                    ) : (
                      <FileDoc className="w-6 h-6 text-blue-600 flex-shrink-0" weight="fill" />
                    )}
                    <div className="min-w-0">
                      <span className="text-xs font-heading font-bold text-slate-900 block truncate">
                        {application.resumeFileName || "Candidate_Resume.pdf"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Direct document upload from candidate application form
                      </span>
                    </div>
                  </div>

                  <a
                    href={application.resumeFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={application.resumeFileName || true}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-xs active:scale-95"
                  >
                    <DownloadSimple className="w-4 h-4" weight="bold" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs font-mono text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>No separate resume file attached (Candidate submitted details via form).</span>
              </div>
            )}
          </div>

          {/* Candidate Profile Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Applicant Profile & Contact Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Position Applied</span>
                <span className="text-slate-900 font-bold text-sm">{application.positionAppliedFor}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Primary Mobile</span>
                <a href={`tel:${application.mobileNumber}`} className="text-amber-700 font-bold hover:underline">
                  {application.mobileNumber}
                </a>
              </div>

              {application.altMobileNumber && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Alternate Contact</span>
                  <span className="text-slate-800">{application.altMobileNumber}</span>
                </div>
              )}

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Total Experience</span>
                <span className="text-slate-800">{application.yearsOfExperience || "Not specified"}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Highest Qualification</span>
                <span className="text-slate-800">{application.qualification || "Trade Tested"}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Current Location</span>
                <span className="text-slate-800">{application.currentLocation || "Paradeep, Odisha"}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Joining Time</span>
                <span className="text-slate-800">{application.joiningAvailability || "Immediate"}</span>
              </div>
            </div>

            {application.skills && (
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                  Candidate Trade Skills & Experience
                </span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-line">
                  {application.skills}
                </div>
              </div>
            )}
          </div>

          {/* Add Recruiter Note */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block text-xs font-heading font-bold uppercase text-slate-700">
              Add Internal Recruiter Note (Trade Test / Interview Remarks)
            </label>
            <textarea
              rows={2}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Cleared 6G bend test on CS pipe. Recommended for refinery package..."
              className="w-full p-2.5 bg-white border border-slate-300 rounded-sm text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="button"
              disabled={!noteText.trim() || isUpdating}
              onClick={() => handleStatusChange(currentStatus)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase rounded-sm disabled:opacity-50 cursor-pointer"
            >
              Save Internal Note
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs font-mono text-slate-600">
          <a
            href={`tel:${application.mobileNumber}`}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-sm flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" weight="bold" />
            Call Candidate Now
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-sm cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
