"use client";

import { useState, useEffect } from "react";
import { X, CaretLeft, CaretRight, MagnifyingGlassPlus } from "@phosphor-icons/react";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string | null;
  altText?: string | null;
}

export function ProjectGalleryLightbox({
  images,
  projectName,
}: {
  images: GalleryImage[];
  projectName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayImages: GalleryImage[] = images.length > 0 ? images : [
    {
      id: "fallback-1",
      imageUrl: "/images/hero-steel-plant.webp",
      caption: "Heavy structural steel erection and pipe rack alignment on site.",
      altText: `${projectName} - Structural Execution`,
    },
    {
      id: "fallback-2",
      imageUrl: "/images/piping-erection-site.webp",
      caption: "Process utility piping fabrication and 6G welding work front.",
      altText: `${projectName} - Piping Works`,
    },
    {
      id: "fallback-3",
      imageUrl: "/images/fabrication-workshop.webp",
      caption: "Component pre-fabrication at Sandhakuda engineering yard.",
      altText: `${projectName} - Workshop Fabrication`,
    },
    {
      id: "fallback-4",
      imageUrl: "/images/heavy-rigging-crane.webp",
      caption: "Heavy crane lift and precision equipment positioning.",
      altText: `${projectName} - Crane Rigging`,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : displayImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev! < displayImages.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, displayImages.length]);

  return (
    <>
      <div className="pt-6 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-bold text-slate-900 uppercase">
            Site Photographs & Execution Gallery ({displayImages.length})
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Click photo to expand</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className="bg-slate-900 rounded-sm overflow-hidden border border-slate-800 cursor-pointer group relative aspect-video"
            >
              <img
                src={img.imageUrl}
                alt={img.altText || projectName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="px-3 py-1.5 bg-slate-900/90 rounded-xs text-xs font-mono flex items-center gap-1.5 border border-slate-700">
                  <MagnifyingGlassPlus className="w-4 h-4 text-amber-400" />
                  <span>Enlarge</span>
                </div>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 p-2 text-[10px] font-mono text-slate-300 bg-slate-950/80 truncate">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-150">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                {projectName}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Photo {selectedIndex + 1} of {displayImages.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-sm transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image & Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : displayImages.length - 1))
              }
              className="absolute left-2 sm:left-4 p-3 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white rounded-sm border border-slate-700 transition-all cursor-pointer z-10"
            >
              <CaretLeft className="w-6 h-6" weight="bold" />
            </button>

            <img
              src={displayImages[selectedIndex].imageUrl}
              alt={displayImages[selectedIndex].altText || projectName}
              className="max-h-[75vh] max-w-full object-contain rounded-xs shadow-2xl border border-slate-800"
            />

            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev! < displayImages.length - 1 ? prev! + 1 : 0))
              }
              className="absolute right-2 sm:right-4 p-3 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white rounded-sm border border-slate-700 transition-all cursor-pointer z-10"
            >
              <CaretRight className="w-6 h-6" weight="bold" />
            </button>
          </div>

          {/* Caption */}
          <div className="text-center text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-sm border border-slate-800/80 max-w-xl mx-auto">
            {displayImages[selectedIndex].caption || projectName}
          </div>
        </div>
      )}
    </>
  );
}
