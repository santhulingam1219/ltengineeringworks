"use client";

import { Printer, DownloadSimple } from "@phosphor-icons/react";

export function CapabilityDownloadButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
    >
      <Printer className="w-4 h-4" weight="bold" />
      <span>Print / Save Prequalification PDF</span>
    </button>
  );
}
