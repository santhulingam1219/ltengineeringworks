"use client";

import { useActionState, useState, useRef } from "react";
import { submitWorkerApplicationAction, ApplicationResult } from "@/app/actions/applicationActions";
import { CheckCircle, Warning, ArrowRight, HardHat, FileText, Phone, UploadSimple, X, FileDoc, FilePdf } from "@phosphor-icons/react";

const initialState: ApplicationResult = {
  success: false,
};

interface WorkerApplyFormProps {
  vacancyId?: string;
  defaultPosition?: string;
  onSuccess?: () => void;
}

export function WorkerApplyForm({ vacancyId, defaultPosition = "", onSuccess }: WorkerApplyFormProps) {
  const [state, formAction, isPending] = useActionState(submitWorkerApplicationAction, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Max 5MB Validation
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit. Please upload a smaller PDF or Word file.");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    // Format Validation (.pdf, .doc, .docx)
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!hasValidExt) {
      setFileError("Invalid file type. Please upload a PDF (.pdf) or Word document (.doc, .docx).");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileError(null);
    const fileInput = document.getElementById("resume-upload-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  if (state.success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-8 h-8" weight="bold" />
        </div>

        <h3 className="text-xl font-heading font-black text-emerald-800 uppercase tracking-tight">
          Application Submitted Successfully
        </h3>

        <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
          Your application for <strong className="text-slate-900">{state.positionAppliedFor}</strong> has been registered with LT Engineering Works recruitment office.
        </p>

        <div className="inline-block p-4 bg-white border border-emerald-300 rounded-sm shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 block uppercase">
            Official Application Tracking ID
          </span>
          <span className="text-lg font-mono font-black text-slate-950 tracking-wider">
            {state.applicationId}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 font-mono">
          Please note down your Application ID. Our recruitment team will contact you on your registered mobile number.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {(state.error || fileError) && (
        <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-sm text-xs font-mono text-red-700 flex items-center gap-2">
          <Warning className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{state.error || fileError}</span>
        </div>
      )}

      {vacancyId && <input type="hidden" name="vacancyId" value={vacancyId} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Position Applied For *
          </label>
          <input
            type="text"
            name="positionAppliedFor"
            required
            defaultValue={defaultPosition}
            placeholder="e.g. Structural Fabricator / Fitter"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name (As per ID / Aadhaar) *
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. Suresh Jena"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Primary Mobile Number (Calling / WhatsApp) *
          </label>
          <input
            type="tel"
            name="mobileNumber"
            required
            placeholder="e.g. 9876543210"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Alternate Mobile / Family Contact
          </label>
          <input
            type="tel"
            name="altMobileNumber"
            placeholder="e.g. 9988776655"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Total Years of Experience
          </label>
          <select
            name="yearsOfExperience"
            defaultValue="2-5 Years"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="Fresher / < 1 Year">Fresher / Less than 1 Year</option>
            <option value="1-2 Years">1 – 2 Years</option>
            <option value="2-5 Years">2 – 5 Years</option>
            <option value="5-8 Years">5 – 8 Years</option>
            <option value="8+ Years">8+ Years Experience</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Highest Qualification / Trade
          </label>
          <input
            type="text"
            name="qualification"
            placeholder="e.g. ITI Fitter / Diploma Mech / Metric"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            Current Town / Native District
          </label>
          <input
            type="text"
            name="currentLocation"
            placeholder="e.g. Jagatsinghpur / Cuttack / Kendrapara"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
            When can you join the site?
          </label>
          <select
            name="joiningAvailability"
            defaultValue="Immediate"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
          >
            <option value="Immediate">Immediate Joining (Within 24-48 Hours)</option>
            <option value="Within 7 Days">Within 7 Days</option>
            <option value="Within 15 Days">Within 15 Days</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
          Trade Skills & Previous Work Experience Details
        </label>
        <textarea
          name="skills"
          rows={2}
          placeholder="Mention previous companies worked with, types of projects (e.g., refinery piping, crane rigging, structural erection)..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans"
        />
      </div>

      {/* Resume / Bio-Data Upload Section */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-800">
          Attach Resume / Bio-Data Document (Optional)
        </label>
        <p className="text-[11px] text-slate-500 font-sans">
          Upload candidate CV, bio-data, or trade experience certificate. Accepted: <strong>PDF (.pdf)</strong> or <strong>Word (.doc, .docx)</strong> up to <strong>5MB</strong>.
        </p>

        {/* Hidden permanent file input to guarantee it is always sent in form data */}
        <input
          ref={fileInputRef}
          type="file"
          id="resume-upload-input"
          name="resume"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50/70 hover:bg-slate-50 rounded-sm p-4 text-center transition-colors cursor-pointer group"
          >
            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
              <div className="w-9 h-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-amber-600 shadow-xs transition-colors">
                <UploadSimple className="w-5 h-5" weight="bold" />
              </div>
              <div className="text-xs font-heading font-bold uppercase tracking-tight text-slate-800">
                Click or Drag & Drop to Upload Resume
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                PDF, DOC, DOCX • Maximum Size 5MB
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/40 rounded-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              {selectedFile.name.toLowerCase().endsWith(".pdf") ? (
                <FilePdf className="w-6 h-6 text-red-600 flex-shrink-0" weight="fill" />
              ) : (
                <FileDoc className="w-6 h-6 text-blue-600 flex-shrink-0" weight="fill" />
              )}
              <div className="min-w-0">
                <span className="text-xs font-heading font-bold text-slate-900 block truncate">
                  {selectedFile.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for submission
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-[11px] font-heading font-bold uppercase text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xs cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={removeSelectedFile}
                className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Remove selected resume"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? "Submitting Application..." : "Submit Job Application"}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </form>
  );
}
