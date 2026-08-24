import Link from "next/link";
import { MapPin, Phone, EnvelopeSimple, NavigationArrow, Buildings, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export function InteractiveMapCard() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Sandhakuda+City+Paradeep+Jagatsinghpur+Odisha+754142";
  const whatsappUrl = "https://wa.me/917073877299?text=Hello%20LT%20Engineering%20Works,%20I%20would%20like%20to%20visit%20your%20office%20in%20Paradeep.";

  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-md space-y-0">
      {/* Map Header / Location Banner */}
      <div className="bg-slate-900 text-white p-6 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 technical-grid-dark opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Registered Head Office & Workshop
            </span>
            <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight">
              Paradeep Port Industrial Corridor
            </h3>
          </div>
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-all shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <NavigationArrow className="w-3.5 h-3.5" weight="bold" />
            Open in Google Maps
          </Link>
        </div>
      </div>

      {/* Embedded Simulated Industrial Map Visual Frame */}
      <div className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url('/images/hero-steel-plant.webp')` }}
        />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
        
        {/* Map Center Pin Callout */}
        <div className="relative z-10 text-center p-6 space-y-2 max-w-md bg-slate-900/90 border border-slate-700/80 rounded-sm shadow-2xl backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 mx-auto flex items-center justify-center shadow-lg animate-bounce">
            <MapPin className="w-5 h-5" weight="fill" />
          </div>
          <h4 className="text-sm font-heading font-bold text-white uppercase">
            LT Engineering Works
          </h4>
          <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
            Plot No. 1/298, Khata No. 23/430, Sandhakuda City, Paradeep, Dist. Jagatsinghpur, Odisha – 754142
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-amber-400">
            <span>Lat: 20.264° N</span>
            <span>•</span>
            <span>Long: 86.685° E</span>
          </div>
        </div>
      </div>

      {/* Office Information & Quick Navigation Strip */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8FAFC]">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Office Address
          </span>
          <p className="text-xs text-slate-800 font-sans leading-relaxed">
            Ground Floor, Plot No. 1/298, Khata No. 23/430, Sandhakuda City, Paradeep, Odisha – 754142
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Hotlines & WhatsApp
          </span>
          <div className="space-y-1 text-xs font-mono">
            <a href="tel:+917073877299" className="text-blue-700 hover:underline block font-semibold">
              +91 7073877299
            </a>
            <a href="tel:+919963008256" className="text-blue-700 hover:underline block font-semibold">
              +91 9963008256
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Instant Communication
          </span>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
          >
            <WhatsappLogo className="w-4 h-4" weight="fill" />
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
