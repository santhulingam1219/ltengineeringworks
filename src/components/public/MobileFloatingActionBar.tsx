"use client";

import Link from "next/link";
import { Phone, WhatsappLogo, PaperPlaneTilt } from "@phosphor-icons/react";

export function MobileFloatingActionBar() {
  const phone = "+917073877299";
  const whatsappUrl = "https://wa.me/917073877299?text=Hello%20LT%20Engineering%20Works,%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20manpower%20deployment.";

  return (
    <aside aria-label="Quick Contact Actions" className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-950/95 border-t border-slate-800 p-2.5 backdrop-blur-lg shadow-2xl safe-area-pb">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1-Tap Call */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xs text-white transition-all active:scale-95 text-center cursor-pointer shadow-sm"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" weight="fill" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">Call Hotline</span>
        </a>

        {/* 1-Tap WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/60 rounded-xs text-emerald-300 transition-all active:scale-95 text-center cursor-pointer shadow-sm"
        >
          <WhatsappLogo className="w-4 h-4 text-emerald-400 mb-0.5" weight="fill" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* 1-Tap Enquiry */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-2 px-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xs transition-all active:scale-95 text-center cursor-pointer shadow-sm font-heading font-bold"
        >
          <PaperPlaneTilt className="w-4 h-4 mb-0.5" weight="bold" />
          <span className="text-[10px] uppercase tracking-wider">Post Enquiry</span>
        </Link>
      </div>
    </aside>
  );
}
