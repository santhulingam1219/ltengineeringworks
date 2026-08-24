"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FolderOpen, ArrowSquareOut, PencilSimple, X, Check, SpinnerGap } from "@phosphor-icons/react";
import { ImagePickerInput } from "./ImagePickerInput";
import { updateServiceAction } from "@/app/actions/serviceActions";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  displayOrder: number;
  featuredImageUrl?: string | null;
  isPublished: boolean;
}

export function ServicesTable({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return;

    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    formData.append("id", editingService.id);

    startTransition(async () => {
      const res = await updateServiceAction(formData);
      if (res.success && res.service) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? (res.service as ServiceItem) : s))
        );
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setEditingService(null);
        }, 1200);
      } else {
        setErrorMessage(res.error || "Failed to update service.");
      }
    });
  };

  return (
    <>
      {/* MOBILE CARD FEED (< 768px) */}
      <div className="md:hidden space-y-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-slate-200 p-4 rounded-sm shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs">
                  0{s.displayOrder}
                </span>
                <h3 className="font-heading font-bold text-slate-950 text-base leading-tight">
                  {s.name}
                </h3>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase flex-shrink-0">
                Published
              </span>
            </div>

            {s.featuredImageUrl && (
              <div className="h-24 w-full bg-slate-900 rounded-xs overflow-hidden border border-slate-200">
                <img
                  src={s.featuredImageUrl}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {s.shortDescription}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono gap-2">
              <button
                type="button"
                onClick={() => setEditingService(s)}
                className="flex-1 py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-xs cursor-pointer"
              >
                <PencilSimple className="w-3.5 h-3.5" weight="bold" />
                <span>Edit Scope</span>
              </button>

              <Link
                href={`/services/${s.slug}`}
                target="_blank"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xs flex items-center gap-1 active:scale-95"
              >
                <ArrowSquareOut className="w-3.5 h-3.5" />
                <span>View Live</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE (>= 768px) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 text-white font-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Order</th>
                <th className="p-3.5">Service Name</th>
                <th className="p-3.5">Featured Photo</th>
                <th className="p-3.5">Short Description</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-500">
                    0{s.displayOrder}
                  </td>
                  <td className="p-3.5 font-heading font-bold text-slate-900 text-sm">
                    {s.name}
                    <span className="block text-[10px] font-mono text-slate-400 font-normal">
                      /{s.slug}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {s.featuredImageUrl ? (
                      <div className="w-16 h-10 bg-slate-900 rounded-xs overflow-hidden border border-slate-200">
                        <img
                          src={s.featuredImageUrl}
                          alt={s.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">Icon Only</span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-sm truncate">
                    {s.shortDescription}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                      Published
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(s)}
                        className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xs flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                      >
                        <PencilSimple className="w-3.5 h-3.5" weight="bold" />
                        <span>Edit</span>
                      </button>
                      <Link
                        href={`/services/${s.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xs flex items-center gap-1 active:scale-95"
                      >
                        <ArrowSquareOut className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* In-Place Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-300 rounded-sm w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  Service CMS Editor
                </span>
                <h3 className="font-heading font-bold uppercase text-base text-white">
                  Edit Service: {editingService.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1 text-slate-400 hover:text-white rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-xs">
                  {errorMessage}
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Service updated successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description (For Cards & Overviews) *
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={2}
                  defaultValue={editingService.shortDescription}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Technical Capabilities & Execution Description *
                </label>
                <textarea
                  name="fullDescription"
                  required
                  rows={5}
                  defaultValue={editingService.fullDescription}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              {/* Featured Image Picker with Auto-WebP */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  Discipline Photography Header
                </span>
                <ImagePickerInput
                  name="featuredImageUrl"
                  label="Featured Service Image"
                  defaultValue={editingService.featuredImageUrl || ""}
                  category="service"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold uppercase rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-sm shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <SpinnerGap className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Service Scope</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
