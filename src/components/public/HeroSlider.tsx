"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  CaretLeft,
  CaretRight,
  ShieldCheck,
  Wrench,
} from "@phosphor-icons/react";

interface SlideData {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  badge1: string;
  badge2: string;
  badge3: string;
  highlights: { num: string; title: string; desc: string }[];
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: "Paradeep Industrial Hub • Odisha",
    title: "Heavy Structural Steel Fabrication & Erection",
    subtitle: "Complete mechanical execution of industrial steel frameworks, heavy trusses, column rigging, and plant infrastructure across Eastern India.",
    image: "/images/hero-steel-plant.webp",
    mobileImage: "/images/hero-steel-plant-mobile.webp",
    badge1: "30+ Executed Projects",
    badge2: "GSTIN: 21AAFFL7905E1ZO",
    badge3: "Heavy Structural Yard",
    highlights: [
      { num: "01", title: "Heavy Structural & Erection", desc: "Precision column alignment, industrial trusses, and crane rigging." },
      { num: "02", title: "Workshop Pre-Fabrication", desc: "Gantry crane equipped fabrication yard in Sandhakuda, Paradeep." },
      { num: "03", title: "Skilled Trade Mobilization", desc: "Certified fitters, fabricators, riggers, kalassi & supervisors." },
    ],
  },
  {
    id: 2,
    tag: "Heavy Lift & Rigging Operations",
    title: "High-Elevation Rigging & Heavy Equipment Lifts",
    subtitle: "Certified heavy crane lift planning, equipment shifting, precision positioning, and laser coupling alignment for rotary equipment.",
    image: "/images/heavy-rigging-crane.webp",
    mobileImage: "/images/heavy-rigging-crane-mobile.webp",
    badge1: "250T+ Crane Rigging",
    badge2: "Laser Shaft Alignment",
    badge3: "Zero-Harm Safety Record",
    highlights: [
      { num: "01", title: "Heavy Machinery Positioning", desc: "Turbines, multi-stage pumps, compressors, and rotary driers." },
      { num: "02", title: "Crane Marshalling & Rigging", desc: "Certified rigger crews and safety tagline operators." },
      { num: "03", title: "Laser Coupling Alignment", desc: "Dial gauge verification and precision stainless shimming." },
    ],
  },
  {
    id: 3,
    tag: "Refinery & Petrochemical Scope",
    title: "High-Pressure Utility & Process Piping",
    subtitle: "Turnkey fabrication, isometric spool routing, 100% NDT radiography welding, and hydro-testing for refinery shutdown turnarounds.",
    image: "/images/piping-erection-site.webp",
    mobileImage: "/images/piping-erection-mobile.webp",
    badge1: "6G Certified Welders",
    badge2: "100% Radiography Pass",
    badge3: "Hydrostatic Testing",
    highlights: [
      { num: "01", title: "Process Spool Fabrication", desc: "Carbon steel, SS-316L, and alloy piping fabrication." },
      { num: "02", title: "Turnaround Shutdowns", desc: "Rapid 48-72h crew mobilization for critical plant turnarounds." },
      { num: "03", title: "NDT Quality Assurance", desc: "UT, DPT, and radiographic weld quality inspection." },
    ],
  },
  {
    id: 4,
    tag: "Storage Tanks & Terminal Yard",
    title: "Cylindrical Tank & Vessel Fabrication",
    subtitle: "Site erection and automatic seam welding of bulk petroleum storage tanks, pressure vessels, and chemical process hoppers.",
    image: "/images/tank-fabrication-yard.webp",
    mobileImage: "/images/tank-fabrication-mobile.webp",
    badge1: "API 650 Standards",
    badge2: "Automatic Tank Welding",
    badge3: "Turnkey Industrial Tanks",
    highlights: [
      { num: "01", title: "Bulk Storage Tanks", desc: "Floating roof, fixed cone roof, and chemical containment tanks." },
      { num: "02", title: "Plate Bending & Fit-up", desc: "Precision curvature rolling and vertical seam alignment." },
      { num: "03", title: "Hydro-Test & Commissioning", desc: "Complete pneumatic leak testing and final surface coating." },
    ],
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Swipe gesture support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 45) {
      nextSlide();
    } else if (deltaX < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative bg-[#070D18] text-white overflow-hidden border-b border-slate-800 min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-end sm:items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel with Full Photographic Clarity */}
      {slides.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out will-change-[opacity,transform] z-[1] ${
              isActive
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Desktop Landscape Background */}
            <div
              className="hidden md:block absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            {/* Mobile Portrait Background: Focused top alignment for industrial machinery */}
            <div
              className="block md:hidden absolute inset-0 bg-cover bg-top"
              style={{ backgroundImage: `url('${s.mobileImage}')` }}
            />
          </div>
        );
      })}

      {/* Desktop Gradient: Left dark for text legibility, clear on right for image */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#070D18]/95 via-[#070D18]/70 via-50% to-transparent z-[2]" />

      {/* Mobile Gradient: Clean bottom scrim ONLY (top 60% of image is crystal clear & vibrant) */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#070D18] from-50% via-[#070D18]/75 via-75% to-black/20 z-[2]" />

      {/* Decorative Gold Accent Header Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-blue-600 z-10" />

      {/* Mobile Top Floating Slide Controls & Indicator */}
      <div className="md:hidden absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/85 px-3 py-1.5 rounded-full border border-amber-500/50 backdrop-blur-md shadow-xl">
        <button
          onClick={prevSlide}
          className="p-1 text-slate-300 hover:text-white active:scale-90 transition-transform cursor-pointer"
          aria-label="Previous Slide"
        >
          <CaretLeft className="w-4 h-4 text-amber-400" weight="bold" />
        </button>
        <span className="text-[11px] font-mono font-bold text-white tracking-wider px-1">
          0{currentSlide + 1} <span className="text-slate-500">/</span> 0{slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="p-1 text-slate-300 hover:text-white active:scale-90 transition-transform cursor-pointer"
          aria-label="Next Slide"
        >
          <CaretRight className="w-4 h-4 text-amber-400" weight="bold" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-amber-500/20 border border-amber-500/50 rounded-xs text-amber-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span className="truncate">{slide.tag}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-heading font-black tracking-tight uppercase leading-[1.12] text-white drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-base text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-sm">
              {slide.subtitle}
            </p>

            {/* Verification Badges (Responsive Mobile Flow) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-x-4 sm:gap-y-2 text-[10px] sm:text-xs font-mono text-slate-200 pt-0.5 sm:pt-1">
              <div className="flex items-center gap-1.5 bg-slate-950/85 px-2 py-1 rounded-xs border border-slate-700/80 backdrop-blur-sm shadow-xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" weight="fill" />
                <span>{slide.badge1}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/85 px-2 py-1 rounded-xs border border-slate-700/80 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" weight="fill" />
                <span>{slide.badge2}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/85 px-2 py-1 rounded-xs border border-slate-700/80 backdrop-blur-sm shadow-xs">
                <Wrench className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" weight="fill" />
                <span>{slide.badge3}</span>
              </div>
            </div>

            {/* Call to Actions (Full Width on Mobile, Inline on Desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-xs transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <span>Request Project Quotation</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" weight="bold" />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-xs border border-slate-700 transition-all active:scale-95 backdrop-blur-sm text-center flex items-center justify-center"
              >
                <span>Explore Project Portfolio</span>
              </Link>
            </div>

            {/* Mobile Slide Dot Indicators (Centered Below Buttons) */}
            <div className="md:hidden flex items-center justify-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide
                      ? "w-7 bg-amber-400 shadow-sm"
                      : "w-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Key Industrial Execution Highlights (Desktop Only) */}
          <div className="lg:col-span-4 hidden lg:block space-y-3">
            <div className="bg-slate-950/85 backdrop-blur-md p-6 rounded-sm border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Scope Execution
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
              </div>

              <div className="space-y-3.5">
                {slide.highlights.map((h, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 font-mono font-bold text-xs">
                        [{h.num}]
                      </span>
                      <h4 className="text-xs font-heading font-bold text-white uppercase tracking-tight">
                        {h.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans pl-6 leading-snug">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800">
                <Link
                  href="/services"
                  className="text-xs font-heading font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center justify-between group"
                >
                  <span>View Technical Capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Navigation Controls: Arrows and Dots (Bottom-Right) */}
      <div className="hidden md:flex absolute bottom-6 right-8 z-20 items-center gap-3 bg-slate-950/85 px-4 py-2 rounded-xs border border-slate-800 backdrop-blur-md shadow-lg">
        <button
          onClick={prevSlide}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <CaretLeft className="w-5 h-5" weight="bold" />
        </button>

        <div className="flex items-center gap-1.5 px-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? "w-6 bg-amber-400"
                  : "w-2 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
          aria-label="Next Slide"
        >
          <CaretRight className="w-5 h-5" weight="bold" />
        </button>
      </div>
    </section>
  );
}
