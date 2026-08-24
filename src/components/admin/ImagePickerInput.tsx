"use client";

import { useState, useEffect } from "react";
import { 
  Images, 
  UploadSimple, 
  X, 
  FolderOpen, 
  Check, 
  MagnifyingGlass, 
  SpinnerGap 
} from "@phosphor-icons/react";
import { uploadMediaImageAction, getMediaLibraryAction } from "@/app/actions/mediaActions";

interface ImagePickerInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  category?: string;
  required?: boolean;
}

export function ImagePickerInput({
  name,
  label = "Image Selection",
  defaultValue = "",
  category = "project",
  required = false,
}: ImagePickerInputProps) {
  const [selectedUrl, setSelectedUrl] = useState<string>(defaultValue);
  const [modalOpen, setModalOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Load library items when modal opens
  useEffect(() => {
    if (modalOpen) {
      setLoadingLibrary(true);
      getMediaLibraryAction()
        .then((items) => {
          setLibraryItems(items);
          setLoadingLibrary(false);
        })
        .catch(() => setLoadingLibrary(false));
    }
  }, [modalOpen]);

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("altText", file.name);

    const res = await uploadMediaImageAction(formData);
    if (res.success && res.url) {
      setSelectedUrl(res.url);
    } else {
      setUploadError(res.error || "Failed to upload image.");
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const filteredLibrary = libraryItems.filter((item) =>
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={selectedUrl} required={required} />

      {label && (
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Selected Preview Box or Upload/Select Trigger */}
      {selectedUrl ? (
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="relative w-20 h-16 bg-slate-900 rounded-xs overflow-hidden flex-shrink-0 border border-slate-300">
            <img
              src={selectedUrl}
              alt="Selected Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-xs font-mono font-bold text-slate-900 truncate block">
              {selectedUrl.split("/").pop()}
            </span>
            <span className="text-[10px] font-mono text-emerald-600 block">
              ✓ Active Image Selected
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate block">
              {selectedUrl}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-mono font-bold rounded-xs cursor-pointer"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => setSelectedUrl("")}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Direct File Upload */}
          <label className="flex-1 border border-dashed border-slate-300 hover:border-amber-500 bg-white hover:bg-amber-50/20 p-3 rounded-sm text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleDirectUpload}
              className="hidden"
            />
            {isUploading ? (
              <>
                <SpinnerGap className="w-4 h-4 animate-spin text-amber-600" />
                <span>Converting to WebP...</span>
              </>
            ) : (
              <>
                <UploadSimple className="w-4 h-4 text-amber-600" weight="bold" />
                <span>Upload New (Auto-WebP)</span>
              </>
            )}
          </label>

          {/* Pick from Supabase Library */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 transition-all"
          >
            <FolderOpen className="w-4 h-4" weight="bold" />
            <span>Pick from Library</span>
          </button>
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600 font-mono mt-1">{uploadError}</p>
      )}

      {/* Supabase Media Library Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-300 rounded-sm w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold uppercase text-sm">
                  Select Image from Supabase Media Library
                </h3>
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

            {/* Images Grid */}
            <div className="p-4 overflow-y-auto flex-1 max-h-[50vh]">
              {loadingLibrary ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-2">
                  <SpinnerGap className="w-6 h-6 animate-spin text-amber-500" />
                  <span>Fetching assets from Supabase...</span>
                </div>
              ) : filteredLibrary.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs">
                  No images found. Upload one directly using the upload button.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredLibrary.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedUrl(item.storagePath);
                        setModalOpen(false);
                      }}
                      className={`group border rounded-sm overflow-hidden p-1.5 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        selectedUrl === item.storagePath
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
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>{filteredLibrary.length} assets available in Supabase</span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xs uppercase font-bold"
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
