import { Star, Quotes, SealCheck } from "@phosphor-icons/react/dist/ssr";

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation?: string | null;
  companyName: string;
  testimonialText: string;
  rating: number;
}

export function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: TestimonialItem[];
}) {
  const displayItems =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "1",
            clientName: "Er. Subhendu Mohapatra",
            designation: "Chief Resident Construction Engineer",
            companyName: "Refinery EPC Consortium (Paradeep)",
            testimonialText:
              "LT Engineering Works deployed 60+ certified fitters and 6G welders during our scheduled refinery turnaround. Their safety compliance, TBT discipline, and zero-defect radiography results exceeded our quality parameters.",
            rating: 5,
          },
          {
            id: "2",
            clientName: "Rajeshwar Patnaik",
            designation: "Project Director",
            companyName: "Heavy Industrial Infrastructure Ltd",
            testimonialText:
              "Their structural steel fabrication yard in Sandhakuda handled 850 MT of heavy pipe racks and technological structures with extreme precision and on-time site mobilization.",
            rating: 5,
          },
          {
            id: "3",
            clientName: "Er. A. K. Choudhury",
            designation: "Senior Mechanical Lead",
            companyName: "Thermal Power & Utilities Complex",
            testimonialText:
              "The laser shaft alignment, foundation prep, and rotary equipment positioning executed by their mechanical crew ensured a seamless pre-commissioning for our multi-stage boiler feed pump package.",
            rating: 5,
          },
        ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 technical-grid-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              <SealCheck className="w-4 h-4 text-emerald-400" weight="fill" />
              Verified Client Endorsements
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white">
              Trusted by Leading Contractors & EPCs
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Odisha & Eastern India Industrial Corridor
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 p-7 rounded-sm space-y-5 hover:border-amber-500/60 transition-all flex flex-col justify-between group shadow-lg backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" weight="fill" />
                    ))}
                  </div>
                  <Quotes className="w-6 h-6 text-slate-700 group-hover:text-amber-500/40 transition-colors" weight="fill" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic">
                  "{item.testimonialText}"
                </p>
              </div>

              {/* Author Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {item.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-white uppercase tracking-tight">
                    {item.clientName}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 leading-snug">
                    {item.designation ? `${item.designation}, ` : ""}{item.companyName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
