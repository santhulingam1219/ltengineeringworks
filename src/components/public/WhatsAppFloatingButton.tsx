"use client";

import { WhatsappLogo } from "@phosphor-icons/react";

export function WhatsAppFloatingButton({
  phoneNumber = "917073877299",
  defaultMessage = "Hello LT Engineering Works, I would like to inquire about industrial project execution and manpower mobilization in Paradeep.",
}: {
  phoneNumber?: string;
  defaultMessage?: string;
}) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end print:hidden">
      {/* Floating Real WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with LT Engineering Works on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <WhatsappLogo className="w-8 h-8 text-white drop-shadow-sm" weight="fill" />
      </a>
    </div>
  );
}
