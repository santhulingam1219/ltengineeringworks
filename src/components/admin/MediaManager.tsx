"use client";

import { useState, useTransition } from "react";
import { 
  Images, 
  UploadSimple, 
  Trash, 
  Copy, 
  Check, 
  MagnifyingGlass, 
  Funnel, 
  ArrowSquareOut,
  SpinnerGap,
  Sparkle
} from "@phosphor-icons/react";
import { uploadMediaImageAction, deleteMediaImageAction } from "@/app/actions/mediaActions";

interface MediaItem {
  id: string;
  fileName: string;
  storagePath: string;
  fileType: string;
  fileSizeBytes: number;
  dimensions: string | null;
  altText: string | null;
  caption: string | null;
  category: string;
  createdAt: Date | string;
}

interface MediaManagerProps {
  initialItems: MediaItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Assets" },
  { id: "project", label: "Projects" },
  { id: "hero", label: "Hero Banners" },
  { id: "service", label: "Services" },
  { id: "safety", label: "Safety & QA" },
  { id: "civil", label: "Civil Works" },
  { id: "equipment", label: "Equipment" },
  { id: "turnaround", label: "Turnarounds" },
  { id: "general", label: "General" },
];

export function MediaManager({ initialItems }: MediaManagerProps) {
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadCategory, setUploadCategory] = useState("project");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", uploadCategory);
      formData.append("altText", file.name);

      const res = await uploadMediaImageAction(formData);
      if (res.success && res.url && res.id) {
        const newItem: MediaItem = {
          id: res.id,
          fileName: res.fileName || file.name,
          storagePath: res.url,
          fileType: "image",
          fileSizeBytes: file.size,
          dimensions: "Optimized WebP",
          altText: file.name,
          caption: null,
          category: uploadCategory,
          createdAt: new Date().toISOString(),
        };
        setItems((prev) => [newItem, ...prev]);
      } else {
        setUploadError(res.error || "Failed to upload image.");
      }
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset from Supabase?")) return;

    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteMediaImageAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete image.");
      }
      setDeletingId(null);
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Upload Zone Card */}
      <div className="bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-black text-slate-900 uppercase text-sm sm:text-base flex items-center gap-2">
              <UploadSimple className="w-5 h-5 text-amber-500" weight="bold" />
              <span>Direct Media Uploader (Auto-Converts to WebP)</span>
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Upload any PNG, JPG, JPEG, or HEIC image. The server automatically optimizes, resizes, and converts it to high-speed WebP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-600">Assign Category:</span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-xs font-mono font-bold text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="project">Project</option>
              <option value="hero">Hero Banner</option>
              <option value="service">Service</option>
              <option value="safety">Safety & QA</option>
              <option value="civil">Civil</option>
              <option value="equipment">Equipment</option>
              <option value="turnaround">Turnaround</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {uploadError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xs text-xs font-mono text-red-700">
            {uploadError}
          </div>
        )}

        <div className="relative border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50/70 hover:bg-amber-50/30 rounded-sm p-6 text-center transition-all cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={isUploading}
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="space-y-2">
            <div className="w-12 h-12 bg-white rounded-full border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-amber-600 group-hover:scale-110 transition-transform">
              {isUploading ? (
                <SpinnerGap className="w-6 h-6 animate-spin" />
              ) : (
                <UploadSimple className="w-6 h-6" weight="bold" />
              )}
            </div>
            <div>
              <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wide block">
                {isUploading ? "Converting & Indexing to Supabase..." : "Tap to Upload or Drag Images Here"}
              </span>
              <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                Supports PNG, JPG, JPEG, WEBP up to 20MB • Instant Auto-WebP Compression
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MagnifyingGlass className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by filename or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-sans text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Funnel className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-xs text-[11px] font-mono font-bold uppercase transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-amber-400 shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Assets Grid */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredItems.length} of {items.length} Assets
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
            Live Supabase Index
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-2">
            <Images className="w-10 h-10 text-slate-300 mx-auto" />
            <p>No media assets found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-sm overflow-hidden p-2 bg-slate-50 hover:border-amber-500 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative h-28 sm:h-32 w-full bg-slate-900 rounded-xs overflow-hidden">
                    <img
                      src={item.storagePath}
                      alt={item.altText || item.fileName}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-slate-950/85 text-amber-400 text-[9px] font-mono font-bold uppercase rounded-xs border border-amber-400/30">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-heading font-bold text-slate-900 truncate" title={item.fileName}>
                      {item.fileName}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                      <span>{item.dimensions || "WebP"}</span>
                      <span>{(item.fileSizeBytes / 1024).toFixed(0)} KB</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200/80 flex items-center justify-between gap-1 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.storagePath, item.id)}
                    className="flex-1 py-1 px-2 bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                    title="Delete Media Asset"
                  >
                    {deletingId === item.id ? (
                      <SpinnerGap className="w-3.5 h-3.5 animate-spin text-red-600" />
                    ) : (
                      <Trash className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
