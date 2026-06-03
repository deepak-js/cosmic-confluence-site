import { Plane, Train, TramFront, Hotel, FileCheck2 } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const TRAVEL = [
  { icon: Plane, label: "Kempegowda Intl. Airport", dist: "35 km" },
  { icon: Train, label: "KSR Bengaluru City Station", dist: "4 km" },
  { icon: TramFront, label: "Lalbagh Metro Station", dist: "1 km" },
];

const HOTELS = [
  { name: "The Oterra", dist: "2.1 km", price: "₹6,500 – ₹9,500" },
  { name: "Lemon Tree Premier", dist: "3.4 km", price: "₹5,800 – ₹8,200" },
  { name: "Ibis Bengaluru City Centre", dist: "1.6 km", price: "₹4,500 – ₹6,800" },
];

export function Venue() {
  return (
    <section id="venue" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Venue & Travel" title="St. Joseph's University, Bengaluru." subtitle="Set in the heart of Bengaluru — India's Science & Technology capital — at a premier Jesuit institution founded in 1882." />

        <div className="grid lg:grid-cols-5 gap-6 mt-14">
          <Reveal className="lg:col-span-3">
            <div className="glass rounded-3xl overflow-hidden aspect-[16/10]">
              <iframe
                title="Venue map"
                src="https://maps.google.com/maps?q=St.%20Joseph%27s%20University%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                loading="lazy"
                style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 h-full">
              <p className="text-xs uppercase tracking-widest text-cyan mb-2">Address</p>
              <p className="font-display font-semibold text-lg leading-snug">
                Department of Physics<br />
                St. Joseph's University<br />
                36 Lalbagh Road, Bengaluru 560027<br />
                Karnataka, India
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Sessions take place in <span className="text-foreground font-medium">Bishop Ambrose Hall</span> (capacity 600) and the <span className="text-foreground font-medium">Science & Technology Block</span>.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          <Reveal>
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="font-display font-semibold text-lg mb-4">Getting There</h3>
              <ul className="space-y-3">
                {TRAVEL.map(({ icon: Icon, label, dist }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center"><Icon size={16} className="text-cyan" /></div>
                    <div className="flex-1">{label}</div>
                    <div className="text-muted-foreground text-xs">{dist}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Hotel size={18} className="text-cyan" /> Accommodation</h3>
              <ul className="space-y-3">
                {HOTELS.map((h) => (
                  <li key={h.name} className="text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{h.name}</span>
                      <span className="text-muted-foreground text-xs">{h.dist}</span>
                    </div>
                    <p className="text-xs text-cyan mt-0.5">{h.price} / night</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><FileCheck2 size={18} className="text-cyan" /> Visa Info</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                International delegates may apply for an Indian e-Visa online. The conference secretariat issues invitation letters on request.
              </p>
              <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex px-4 py-2 rounded-full text-xs font-semibold glass hover:border-glow">
                Indian e-Visa Portal →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
