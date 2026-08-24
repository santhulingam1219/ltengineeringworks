"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MagnifyingGlass, 
  X, 
  Buildings, 
  HardHat, 
  Wrench, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  ArrowSquareOut
} from "@phosphor-icons/react";

interface SearchItem {
  title: string;
  category: "Services" | "Projects" | "Careers" | "Corporate";
  href: string;
  desc: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: "Heavy Structural Steel Fabrication & Erection", category: "Services", href: "/services/structural-works", desc: "Sheds, platforms, pipe racks, and structural frameworks." },
  { title: "Shop & On-Site Steel Fabrication", category: "Services", href: "/services/fabrication-works", desc: "Marking, gas cutting, beveling, and fit-ups." },
  { title: "Industrial Utility & Process Piping", category: "Services", href: "/services/piping-works", desc: "CS/SS high-pressure piping and hydro testing." },
  { title: "Heavy Machinery & Equipment Installation", category: "Services", href: "/services/equipment-works", desc: "Pumps, compressors, gearboxes, and precision alignment." },
  { title: "Skilled Industrial Manpower Supply", category: "Services", href: "/manpower", desc: "Engineers, supervisors, fabricators, fitters, riggers." },
  { title: "Completed Projects (30+ Portfolio)", category: "Projects", href: "/projects?status=completed", desc: "30+ verified executed packages in Odisha." },
  { title: "Ongoing Industrial Work Fronts", category: "Projects", href: "/projects?status=ongoing", desc: "Active site execution and manpower deployments." },
  { title: "Structural Fabricator Vacancies", category: "Careers", href: "/careers", desc: "Openings for experienced trade fabricators." },
  { title: "Pipe Fitter (6G / CS / SS) Openings", category: "Careers", href: "/careers", desc: "Openings with accommodation & transport." },
  { title: "Site Supervisor & Foreman Jobs", category: "Careers", href: "/careers", desc: "Shift leadership and tonnage tracking." },
  { title: "Track Worker Application Status", category: "Careers", href: "/careers/track", desc: "Look up your application ID in real time." },
  { title: "Track Project Quote / Requisition", category: "Corporate", href: "/track-enquiry", desc: "Real-time client lead status." },
  { title: "Zero-Harm Safety & Quality Assurance", category: "Corporate", href: "/safety-quality", desc: "TBT, mandatory PPE, and NDT weld testing." },
  { title: "Corporate Capability Statement (Datasheet)", category: "Corporate", href: "/capability-statement", desc: "Official credentials and GSTIN profile." },
  { title: "Contact Head Office in Paradeep", category: "Corporate", href: "/contact", desc: "Sandhakuda City, Paradeep hotlines +91 7073877299." },
];

export function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = query.trim() === ""
    ? SEARCH_ITEMS.slice(0, 8)
    : SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 rounded-sm text-xs font-mono transition-all cursor-pointer"
      >
        <MagnifyingGlass className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden xl:inline">Search services, projects...</span>
        <span className="xl:hidden">Search...</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-slate-200 overflow-hidden space-y-0">
            
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
              <MagnifyingGlass className="w-5 h-5 text-amber-600 flex-shrink-0" weight="bold" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search engineering disciplines, projects, vacancies, tracking..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-slate-400 hover:text-slate-600 text-xs font-mono"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  No matching resources found for &quot;{query}&quot;. Try searching for &quot;piping&quot;, &quot;fabrication&quot;, or &quot;vacancies&quot;.
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="w-full p-3 hover:bg-slate-50 rounded-xs flex items-center justify-between text-left group transition-colors cursor-pointer"
                  >
                    <div className="space-y-0.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded-xs border border-slate-200">
                          {item.category}
                        </span>
                        <span className="text-xs font-heading font-bold uppercase text-slate-900 group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-sans line-clamp-1">
                        {item.desc}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Use <strong>ESC</strong> to close</span>
              <span>Paradeep Hotline: <strong>+91 7073877299</strong></span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
