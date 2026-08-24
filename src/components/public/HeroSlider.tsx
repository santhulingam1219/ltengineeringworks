"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  HardHat,
  Buildings,
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
  badge1: string;
  badge2: string;
  badge3: string;
  highlights: { num: string; title: string; desc: string }[];
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: "Paradeep Industrial Hub • Odisha, India",
    title: "Heavy Structural Steel Fabrication & Erection",
    subtitle: "Complete mechanical execution of industrial steel frameworks, heavy trusses, column rigging, and plant infrastructure across Eastern India.",
    image: "/images/hero-steel-plant.webp",
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

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
      className="relative bg-[#070D18] text-white overflow-hidden border-b border-slate-800 min-h-[620px] lg:min-h-[660px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with 100% Full Vibrance and Crisp Industrial Visuals */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100 z-0"
              : "opacity-0 scale-105 pointer-events-none -z-10"
          }`}
          style={{ backgroundImage: `url('${s.image}')` }}
        />
      ))}

      {/* Directional Gradient: Dark on left behind text, 100% clear and bright on center/right for photography */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/95 via-[#070D18]/70 via-40% to-transparent z-[2]" />

      {/* Decorative Gold Accent Header Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-blue-600 z-10" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/50 rounded-sm text-amber-300 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              {slide.tag}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-heading font-black tracking-tight uppercase leading-[1.1] text-white drop-shadow-md min-h-[80px] sm:min-h-[130px]">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-base text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-sm min-h-[40px] sm:min-h-[50px]">
              {slide.subtitle}
            </p>

            {/* Verification Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-x-6 sm:gap-y-2 text-[11px] sm:text-xs font-mono text-slate-200 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-xs border border-slate-700/60 backdrop-blur-sm">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" weight="fill" />
                <span>{slide.badge1}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-xs border border-slate-700/60 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" weight="fill" />
                <span>{slide.badge2}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-xs border border-slate-700/60 backdrop-blur-sm">
                <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" weight="fill" />
                <span>{slide.badge3}</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all shadow-lg active:scale-[0.98] cursor-pointer text-center"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-heading font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm border border-slate-700 transition-all backdrop-blur-sm active:scale-[0.98] text-center"
              >
                <Buildings className="w-4 h-4 text-amber-400" />
                View 30+ Projects
              </Link>

              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm border border-amber-500/50 transition-all backdrop-blur-sm active:scale-[0.98] text-center"
              >
                <HardHat className="w-4 h-4 text-amber-400" />
                Current Vacancies
              </Link>
            </div>
          </div>

          {/* Right Column: Execution Highlights Panel */}
          <div className="lg:col-span-4 bg-slate-950/90 border border-slate-700/80 p-5 sm:p-6 rounded-sm space-y-4 sm:space-y-5 shadow-2xl backdrop-blur-md">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Capability Focus
                </span>
                <h2 className="text-sm sm:text-base font-heading font-bold text-white uppercase mt-0.5">
                  Scope #{slide.id} of {slides.length}
                </h2>
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 bg-amber-500 text-slate-950 rounded-xs uppercase">
                Ready
              </span>
            </div>

            <ul className="space-y-3 sm:space-y-3.5 text-xs text-slate-300">
              {slide.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-xs bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-[10px] mt-0.5 flex-shrink-0">
                    {h.num}
                  </div>
                  <div>
                    <strong className="text-white block font-semibold text-xs sm:text-sm">{h.title}</strong>
                    <span className="text-slate-300 text-[10px] sm:text-[11px] leading-relaxed">{h.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Operational Base:</span>
              <span className="text-amber-400 font-bold">Sandhakuda, Paradeep</span>
            </div>
          </div>

        </div>

        {/* Carousel Bottom Navigation Controls & Indicators */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all rounded-xs cursor-pointer ${
                  index === currentSlide
                    ? "w-8 sm:w-10 h-2 bg-amber-500"
                    : "w-2.5 h-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
            <span className="text-xs font-mono text-slate-400 ml-2">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Previous / Next Arrow Buttons (Enlarged touch targets >= 44px) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-3 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <CaretLeft className="w-4 h-4" weight="bold" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-3 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xs border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <CaretRight className="w-4 h-4" weight="bold" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
