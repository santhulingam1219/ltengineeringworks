import { Wrench, Crane, ShieldCheck, Gauge, Lightning, Truck } from "@phosphor-icons/react/dist/ssr";

interface EquipmentItem {
  name: string;
  category: string;
  specs: string;
  application: string;
  status: string;
}

const equipmentFleet: EquipmentItem[] = [
  {
    name: "Mobile Hydraulic Cranes & Rigging Tackles",
    category: "Heavy Lifting & Erection",
    specs: "Up to 250T Capacity • Tested Wire Slings & D-Shackles",
    application: "High-elevation pipe rack erection, heavy structural column alignment & vessel lifting.",
    status: "Site Mobilized",
  },
  {
    name: "Diesel Welding Generators & TIG Rectifiers",
    category: "Welding & Fabrication",
    specs: "400A / 600A Output • Multi-operator Welding Banks",
    application: "Field welding for 6G IBR piping, tank automatic seam welding & structural joints.",
    status: "Calibrated",
  },
  {
    name: "Hydraulic Pipe Bending & Plasma Cutting Units",
    category: "Shop Pre-Fabrication",
    specs: "Precision CNC Beveling • Heavy Plate Shearing & Rolling",
    application: "Spool pre-fabrication, reducer forming & heavy structural plate profiling.",
    status: "Yard Ready",
  },
  {
    name: "High-Pressure Hydrostatic Test Pumps",
    category: "Testing & QA/QC",
    specs: "Pressures up to 350 Bar • Digital Calibrated Master Gauges",
    application: "Hydro-testing of process piping manifolds, heat exchangers & pressure vessels.",
    status: "Certified",
  },
  {
    name: "Optical Laser Shaft Alignment Systems",
    category: "Mechanical Precision",
    specs: "0.01 mm Dial & Laser Coupling Precision • Optalign Tech",
    application: "Precision alignment of multi-stage pumps, compressors, turbines & gearboxes.",
    status: "Calibrated",
  },
  {
    name: "Heavy Site Logistics & Material Handling",
    category: "Site Mobilization",
    specs: "Hydra Cranes • Heavy Winches & Multi-Axle Trailers",
    application: "Safe internal site transport of long spool assemblies & 850+ MT steel packages.",
    status: "Active Fleet",
  },
];

export function EquipmentFleetSection() {
  return (
    <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-sm border border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            Machinery & Execution Assets
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-tight">
            Equipment & Tooling Fleet
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Maintained & Calibrated at Sandhakuda Yard
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentFleet.map((eq, i) => (
          <div
            key={i}
            className="bg-slate-950/80 border border-slate-800 p-6 rounded-sm space-y-4 hover:border-amber-500/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xs uppercase">
                  {eq.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-xs">
                  ✓ {eq.status}
                </span>
              </div>

              <h3 className="text-base font-heading font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                {eq.name}
              </h3>

              <div className="text-xs font-mono text-amber-300/90 font-medium">
                {eq.specs}
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {eq.application}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Inspection Protocol:</span>
              <span className="text-slate-200">100% Fit-to-Work</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
