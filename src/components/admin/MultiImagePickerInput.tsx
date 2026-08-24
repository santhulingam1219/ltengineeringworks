"use client";

import { useState, useEffect } from "react";
import { 
  Images, 
  UploadSimple, 
  X, 
  FolderOpen, 
  Check, 
  MagnifyingGlass, 
  SpinnerGap,
  ArrowLeft,
  ArrowRight,
  Plus
} from "@phosphor-icons/react";
import { uploadMediaImageAction, getMediaLibraryAction } from "@/app/actions/mediaActions";

interface MultiImagePickerInputProps {
  name?: string;
  label?: string;
  defaultValues?: string[];
  category?: string;
}

export function MultiImagePickerInput({
  name = "galleryImages",
  label = "Project Gallery Photos (Upload Multiple / Multi-Select)",
  defaultValues = [],
  category = "project",
}: MultiImagePickerInputProps) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>(defaultValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [tempSelectedModal, setTempSelectedModal] = useState<string[]>([]);

  // Load library items when modal opens
  useEffect(() => {
    if (modalOpen) {
      setLoadingLibrary(true);
      setTempSelectedModal([...selectedUrls]);
      getMediaLibraryAction()
        .then((items) => {
          setLibraryItems(items);
          setLoadingLibrary(false);
        })
        .catch(() => setLoadingLibrary(false));
    }
  }, [modalOpen]);

  // Handle direct multiple file upload with parallel WebP conversion
  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Converting (${i + 1}/${files.length}): ${file.name}...`);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("altText", file.name);

      const res = await uploadMediaImageAction(formData);
      if (res.success && res.url) {
        newUploadedUrls.push(res.url);
      }
    }

    setSelectedUrls((prev) => Array.from(new Set([...prev, ...newUploadedUrls])));
    setIsUploading(false);
    setUploadProgress(null);
    e.target.value = "";
  };

  const toggleModalItem = (url: string) => {
    setTempSelectedModal((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleApplyModalSelection = () => {
    setSelectedUrls(tempSelectedModal);
    setModalOpen(false);
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedUrls.length) return;

    const updated = [...selectedUrls];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSelectedUrls(updated);
  };

  const removeImage = (url: string) => {
    setSelectedUrls((prev) => prev.filter((u) => u !== url));
  };

  const filteredLibrary = libraryItems.filter((item) =>
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-3">
      {/* Hidden input storing comma-separated URLs for form submission */}
      <input type="hidden" name={name} value={selectedUrls.join(",")} />

      <div className="flex items-center justify-between">
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
          {label} ({selectedUrls.length} selected)
        </label>
        <span className="text-[10px] font-mono text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs font-bold">
          Auto-WebP & Supabase Sync
        </span>
      </div>

      {/* Action Trigger Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Direct Multiple File Upload */}
        <label className="flex-1 border border-dashed border-slate-300 hover:border-amber-500 bg-white hover:bg-amber-50/20 p-3 rounded-sm text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
          <input
            type="file"
            multiple
            accept="image/*"
            disabled={isUploading}
            onChange={handleMultipleUpload}
            className="hidden"
          />
          {isUploading ? (
            <>
              <SpinnerGap className="w-4 h-4 animate-spin text-amber-600" />
              <span>{uploadProgress || "Converting to WebP..."}</span>
            </>
          ) : (
            <>
              <UploadSimple className="w-4 h-4 text-amber-600" weight="bold" />
              <span>Upload Multiple Photos (Auto-WebP)</span>
            </>
          )}
        </label>

        {/* Multi-Select from Supabase Library */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
        >
          <FolderOpen className="w-4 h-4" weight="bold" />
          <span>Pick from Supabase Media ({selectedUrls.length})</span>
        </button>
      </div>

      {/* Selected Gallery Grid Preview */}
      {selectedUrls.length > 0 && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
          <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Project Gallery Images ({selectedUrls.length}):</span>
            <span className="text-[10px] text-slate-400">Use arrows to reorder • Click &times; to remove</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
            {selectedUrls.map((url, idx) => (
              <div
                key={url}
                className="group bg-white border border-slate-200 rounded-xs overflow-hidden shadow-xs relative flex flex-col justify-between"
              >
                <div className="relative h-24 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-slate-950/80 text-amber-400 text-[9px] font-mono font-bold rounded-xs">
                    #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-xs opacity-90 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
                    title="Remove from gallery"
                  >
                    <X className="w-3 h-3" weight="bold" />
                  </button>
                </div>

                <div className="p-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[9px] font-mono text-slate-500 truncate max-w-[80px]">
                    {url.split("/").pop()}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, "left")}
                      className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === selectedUrls.length - 1}
                      onClick={() => moveImage(idx, "right")}
                      className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supabase Media Library Multi-Select Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-300 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-heading font-bold uppercase text-sm">
                    Select Gallery Photos from Supabase Media Library
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400 block">
                    Click items to select/deselect ({tempSelectedModal.length} selected)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200">
              <div className="relative">
                <MagnifyingGlass className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search existing images by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xs text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Images Grid with Checkboxes */}
            <div className="p-4 overflow-y-auto flex-1 max-h-[55vh]">
              {loadingLibrary ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-2">
                  <SpinnerGap className="w-6 h-6 animate-spin text-amber-500" />
                  <span>Fetching assets from Supabase...</span>
                </div>
              ) : filteredLibrary.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs">
                  No images found.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredLibrary.map((item) => {
                    const isSelected = tempSelectedModal.includes(item.storagePath);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleModalItem(item.storagePath)}
                        className={`group border rounded-sm overflow-hidden p-1.5 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-500"
                            : "border-slate-200 hover:border-slate-400 bg-slate-50"
                        }`}
                      >
                        <div className="relative h-24 w-full bg-slate-900 rounded-xs overflow-hidden">
                          <img
                            src={item.storagePath}
                            alt={item.fileName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-1 right-1 px-1 py-0.2 bg-slate-950/80 text-amber-400 text-[8px] font-mono font-bold uppercase rounded-xs">
                            {item.category}
                          </span>

                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-2xs flex items-center justify-center">
                              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                                <Check className="w-4 h-4" weight="bold" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-1.5">
                          <span className="text-[10px] font-heading font-bold text-slate-900 truncate block">
                            {item.fileName}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 block">
                            {item.dimensions || "WebP"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600">
                <strong>{tempSelectedModal.length}</strong> photos selected for project gallery
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xs uppercase font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyModalSelection}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xs uppercase font-bold text-xs shadow-xs"
                >
                  Apply Selection ({tempSelectedModal.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
