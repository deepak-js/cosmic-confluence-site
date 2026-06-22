import { Plane, Train, TramFront, Hotel, FileCheck2 } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const UNIV_TEXT = "St Joseph’s University (SJU) is a Jesuit university at the heart of Bengaluru, the Silicon city of India. Established in 1882 by Paris foreign Fathers, the management of the college was handed over to the Jesuit order (Society of Jesus) in 1937. The college was first affiliated to the university of Madras and later to the Mysore and Bangalore universities. In 1986, St Joseph’s College became the first affiliated college in Karnataka to offer postgraduate courses. In 1988, it became the first college in Karnataka to get a research center and in 2005, it was one of five colleges in Karnataka that was awarded academic autonomy. In February 2021, St Joseph's University bill was presented in the Karnataka Legislative Assembly and was subsequently passed by the Legislative Assembly and Karnataka Legislative Councill. The college received its University status on 2nd July 2022 and was inaugurated as India’s first public-private university by the President of India, Smt. Droupadi Murmu on 27 September 2022.";

const DEPT_TEXT = "The Department of Physics at St. Joseph’s University, Bengaluru, has a distinguished legacy dating back to 1923. Over the past century, the department has played a significant role in promoting excellence in physics education, research, and scientific outreach.\n\nThe department offers quality undergraduate and postgraduate programmes supported by experienced faculty members, well-equipped laboratories, and modern computational facilities. It actively fosters scientific curiosity, critical thinking, and research-oriented learning among students.\n\nA notable feature of the department is its long-standing collaboration with ISRO through the \"Space and Rocket Dynamics\" certificate programme, providing students with opportunities to interact with leading scientists and gain exposure to advancements in space science and technology.\n\nThe department maintains strong academic and research connections with premier institutions such as ISRO, IISc, Raman Research Institute (RRI), and the Indian Institute of Astrophysics (IIA). Research activities span diverse areas including Plasma Physics, Astrophysics, Computational Physics, Materials Science, and Interdisciplinary Physics. Through its commitment to academic excellence and research innovation, the Department of Physics continues to nurture future scientists, researchers, and educators while contributing to the advancement of science and society.";

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

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 h-full border-t-4 border-t-violet">
              <h3 className="font-display font-semibold text-xl mb-4 text-white">About St Joseph’s University</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                {UNIV_TEXT}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-8 h-full border-t-4 border-t-cyan">
              <h3 className="font-display font-semibold text-xl mb-4 text-white">Department of Physics</h3>
              <div className="text-sm text-muted-foreground leading-relaxed text-justify space-y-4">
                {DEPT_TEXT.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
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
