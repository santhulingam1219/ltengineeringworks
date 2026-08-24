"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, X, ArrowRight } from "@phosphor-icons/react";

export function NoticeBar({
  message = "Urgent Requirement: 40+ Structural Fabricators & 6G Pipe Fitters for Paradeep Industrial Package.",
  linkText = "Apply for Immediate Spot Joining",
  linkHref = "/careers",
}: {
  message?: string;
  linkText?: string;
  linkHref?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-slate-950 text-xs font-mono font-bold py-1.5 px-3 sm:px-4 border-b border-amber-600/40 relative z-50 overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Desktop Layout (Static Centered / Clean) */}
        <div className="hidden md:flex items-center gap-2 overflow-hidden">
          <span className="p-1 bg-slate-950 text-amber-400 rounded-xs flex items-center justify-center flex-shrink-0 animate-pulse">
            <Megaphone className="w-3.5 h-3.5" weight="fill" />
          </span>
          <span className="truncate">{message}</span>
          {linkText && (
            <Link
              href={linkHref}
              className="underline hover:text-slate-800 flex items-center gap-0.5 flex-shrink-0 ml-1 font-extrabold uppercase text-[11px]"
            >
              {linkText}
              <ArrowRight className="w-3 h-3" weight="bold" />
            </Link>
          )}
        </div>

        {/* Mobile Layout (Ultra-Smooth Infinite Marquee Scroll) */}
        <div className="md:hidden flex-1 overflow-hidden relative flex items-center">
          <span className="p-1 bg-slate-950 text-amber-400 rounded-xs flex items-center justify-center flex-shrink-0 z-10 mr-2 shadow-xs">
            <Megaphone className="w-3 h-3" weight="fill" />
          </span>
          
          <div className="overflow-hidden flex-1 relative">
            <div className="animate-marquee-smooth flex items-center gap-8 text-[11px]">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span>{message}</span>
                {linkText && (
                  <Link href={linkHref} className="underline font-black text-slate-950 uppercase flex items-center gap-0.5">
                    {linkText} →
                  </Link>
                )}
              </span>
              <span className="text-amber-800 font-bold">•</span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span>{message}</span>
                {linkText && (
                  <Link href={linkHref} className="underline font-black text-slate-950 uppercase flex items-center gap-0.5">
                    {linkText} →
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 text-slate-950 hover:bg-amber-600/30 rounded-xs transition-colors cursor-pointer flex-shrink-0 z-10 ml-2"
          aria-label="Dismiss Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
