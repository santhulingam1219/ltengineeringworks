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
    <div className="bg-amber-500 text-slate-950 text-xs font-mono font-bold py-2 px-4 border-b border-amber-600/40 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
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

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 text-slate-950 hover:bg-amber-600/30 rounded-xs transition-colors cursor-pointer flex-shrink-0"
          aria-label="Dismiss Announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
