"use client";

import { useState } from "react";
import { WhatsappLogo, X, PaperPlaneTilt } from "@phosphor-icons/react";

export function WhatsAppFloatingButton({
  phoneNumber = "917073877299",
  defaultMessage = "Hello LT Engineering Works, I would like to inquire about industrial project execution and manpower mobilization in Paradeep.",
}: {
  phoneNumber?: string;
  defaultMessage?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end print:hidden">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <WhatsappLogo className="w-5 h-5 text-white" weight="fill" />
              </div>
              <div>
                <h4 className="text-xs font-heading font-bold uppercase tracking-wide">
                  LT Engineering Desk
                </h4>
                <span className="text-[10px] font-mono text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Paradeep Operations Active
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 text-xs font-sans text-slate-700 space-y-2">
            <div className="bg-white p-3 rounded-xs border border-slate-200 shadow-2xs leading-relaxed">
              👋 Greetings! Need an immediate quote for steel fabrication, piping erection, or trade workforce mobilization?
            </div>
          </div>

          <div className="p-3 bg-white border-t border-slate-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
            >
              <PaperPlaneTilt className="w-3.5 h-3.5" weight="bold" />
              Open WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-150 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contact LT Engineering Works on WhatsApp"
      >
        <WhatsappLogo className="w-8 h-8" weight="fill" />
      </button>
    </div>
  );
}
