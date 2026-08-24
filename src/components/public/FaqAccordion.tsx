"use client";

import { useState } from "react";
import { CaretDown, Question } from "@phosphor-icons/react";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export function FaqAccordion({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-10 shadow-sm space-y-6">
      <div className="border-b border-slate-200 pb-4 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-sm bg-amber-500/20 text-amber-600 flex items-center justify-center">
          <Question className="w-5 h-5" weight="bold" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
            Contractor & Client Knowledge Base
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 uppercase tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      <div className="divide-y divide-slate-100 font-sans">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 space-y-2">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
              >
                <span className="text-sm font-heading font-bold uppercase text-slate-900 group-hover:text-amber-600 transition-colors">
                  {item.question}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 transition-transform ${
                    isOpen ? "rotate-180 bg-amber-500 text-slate-950" : ""
                  }`}
                >
                  <CaretDown className="w-3.5 h-3.5" weight="bold" />
                </div>
              </button>

              {isOpen && (
                <div className="text-xs text-slate-600 leading-relaxed font-sans pt-1 pr-6 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
