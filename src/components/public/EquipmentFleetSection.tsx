import { 
  Wrench, 
  Crane, 
  ShieldCheck, 
  Gauge, 
  Lightning, 
  Truck,
  CheckCircle,
  Gear
} from "@phosphor-icons/react/dist/ssr";

interface EquipmentItem {
  name: string;
  category: string;
  specs: string;
  application: string;
  status: string;
  icon: any;
}

const equipmentFleet: EquipmentItem[] = [
  {
    name: "Mobile Hydraulic Cranes & Rigging Tackles",
    category: "Heavy Lifting & Erection",
    specs: "Up to 250T Capacity • Tested Slings & Shackles",
    application: "High-elevation pipe rack erection, heavy column alignment & vessel lifting.",
    status: "Site Mobilized",
    icon: Crane,
  },
  {
    name: "Diesel Welding Generators & TIG Rectifiers",
    category: "Welding & Fabrication",
    specs: "400A / 600A Output • Multi-Operator Banks",
    application: "Field welding for 6G IBR piping, automatic tank seams & structural joints.",
    status: "Calibrated",
    icon: Lightning,
  },
  {
    name: "Hydraulic Pipe Bending & Plasma Cutting Units",
    category: "Shop Pre-Fabrication",
    specs: "Precision CNC Beveling • Heavy Plate Shearing",
    application: "Spool pre-fabrication, reducer forming & heavy structural plate profiling.",
    status: "Yard Ready",
    icon: Wrench,
  },
  {
    name: "High-Pressure Hydrostatic Test Pumps",
    category: "Testing & QA/QC",
    specs: "Pressures up to 350 Bar • Digital Master Gauges",
    application: "Hydro-testing of process piping manifolds, heat exchangers & pressure vessels.",
    status: "Certified",
    icon: Gauge,
  },
  {
    name: "Optical Laser Shaft Alignment Systems",
    category: "Mechanical Precision",
    specs: "0.01 mm Dial & Laser Coupling Precision",
    application: "Precision alignment of multi-stage pumps, compressors, turbines & gearboxes.",
    status: "Calibrated",
    icon: Gear,
  },
  {
    name: "Heavy Site Logistics & Material Handling",
    category: "Site Mobilization",
    specs: "Hydra Cranes • Heavy Winches & Trailers",
    application: "Safe internal site transport of long spool assemblies & 850+ MT steel packages.",
    status: "Active Fleet",
    icon: Truck,
  },
];

export function EquipmentFleetSection() {
  return (
    <div className="bg-[#0B1120] text-slate-200 p-6 sm:p-10 lg:p-12 rounded-sm border border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800/80 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Machinery & Execution Assets
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight">
            Equipment & Tooling Fleet
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Maintained & Calibrated at Sandhakuda Yard, Paradeep
        </div>
      </div>

      {/* Unified Technical Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {equipmentFleet.map((eq, i) => {
          const IconComponent = eq.icon;
          return (
            <div
              key={i}
              className="bg-slate-900/90 border border-slate-800/90 p-5 sm:p-6 rounded-sm space-y-4 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xs bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <IconComponent className="w-4 h-4" weight="bold" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-300">
                      {eq.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-xs uppercase">
                    {eq.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors leading-snug">
                  {eq.name}
                </h3>

                {/* Technical Specifications */}
                <div className="text-xs font-mono text-slate-300 bg-slate-950/60 p-2.5 rounded-xs border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Rating / Specs</span>
                  {eq.specs}
                </div>

                {/* Field Application */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {eq.application}
                </p>
              </div>

              {/* Bottom Verification Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" weight="fill" />
                  <span>QC Verified:</span>
                </span>
                <span className="text-slate-200 font-semibold">Fit-to-Work</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
