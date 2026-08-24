"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  EnvelopeSimple, 
  List, 
  X, 
  ArrowRight,
  ShieldCheck,
  MapPin
} from "@phosphor-icons/react";
import { CommandSearch } from "@/components/public/CommandSearch";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/", twoLine: false },
    { label: "About", href: "/about", twoLine: false },
    { label: "Services", href: "/services", twoLine: false },
    { label: "Projects", href: "/projects", twoLine: false },
    { label: "Careers", href: "/careers", twoLine: false },
    { label: "Manpower", href: "/manpower", twoLine: false },
    { 
      label: "Safety & Quality", 
      href: "/safety-quality", 
      twoLine: true,
      line1: "Safety &",
      line2: "Quality"
    },
    { label: "Contact", href: "/contact", twoLine: false },
  ];

  return (
    <header className="w-full bg-[#0B1120] text-slate-100 sticky top-0 z-50 border-b border-slate-800 shadow-xl backdrop-blur-md">
      {/* Top Utility Bar (Hidden on Mobile) */}
      <div className="hidden md:block bg-slate-950/95 border-b border-slate-800/80 py-1.5 px-4 sm:px-6 lg:px-8 xl:px-12 text-[11px] font-mono">
        <div className="max-w-[1480px] mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" weight="fill" />
              <span>GSTIN: <strong className="text-amber-400 font-semibold">21AAFFL7905E1ZO</strong></span>
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500" />
              Sandhakuda, Paradeep, Odisha – 754142
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+917073877299"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" weight="bold" />
              <span>+91 7073877299</span>
            </a>
            <span className="text-slate-700">/</span>
            <a
              href="tel:+919963008256"
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              <span>+91 9963008256</span>
            </a>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <a
              href="mailto:ltengineeringworks7020@gmail.com"
              className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <EnvelopeSimple className="w-3.5 h-3.5 text-amber-500" />
              <span>ltengineeringworks7020@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Spacious Navigation Bar */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left Corner: Brand Logo and Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group flex-shrink-0 min-w-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white/95 rounded-sm p-1 flex items-center justify-center border border-amber-400/30 group-hover:border-amber-400 transition-all shadow-sm flex-shrink-0">
              <img
                src="/images/logo.webp"
                alt="LT Engineering Works"
                className="h-full w-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="min-w-0">
              <div className="font-heading font-black text-base sm:text-xl tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors leading-none truncate">
                LT Engineering Works
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono text-amber-400/90 tracking-wider uppercase mt-1 truncate">
                Mechanical • Civil • Water Projects
              </div>
            </div>
          </Link>

          {/* Center-Right: Navigation Links (Shifted Right with Clean Spacing) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs xl:text-[13px] font-heading font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center relative ${
                    isActive
                      ? "text-amber-400 bg-slate-800/80 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {link.twoLine ? (
                    <span className="flex flex-col text-left leading-[1.1] py-0.5">
                      <span className="text-[11px] xl:text-xs">{link.line1}</span>
                      <span className="text-[11px] xl:text-xs">{link.line2}</span>
                    </span>
                  ) : (
                    <span>{link.label}</span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Corner: Search & Post Enquiry CTA */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 pl-2">
            <CommandSearch />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>Post Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <CommandSearch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-sm focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <List className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-8 space-y-2 shadow-2xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-3 text-xs font-heading font-bold rounded-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-slate-900 text-amber-400 border-l-4 border-amber-500 shadow-sm"
                    : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Secondary Pages in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800 space-y-1">
            <Link
              href="/capability-statement"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-[11px] font-mono text-slate-400 hover:text-amber-400 uppercase tracking-wider"
            >
              • Capability Statement & Prequalification
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-[11px] font-mono text-slate-400 hover:text-amber-400 uppercase tracking-wider"
            >
              • Technical News & Site Bulletins
            </Link>
            <Link
              href="/careers/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-[11px] font-mono text-slate-400 hover:text-amber-400 uppercase tracking-wider"
            >
              • Track Job Application Status
            </Link>
            <Link
              href="/track-enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-[11px] font-mono text-slate-400 hover:text-amber-400 uppercase tracking-wider"
            >
              • Track Project Requisition Status
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-heading font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xs uppercase tracking-wider shadow-md"
            >
              <span>Post Project Enquiry</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
