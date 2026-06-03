import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "../Reveal";
import { useState } from "react";

const FEATURED = [
  {
    name: "Prof. Elena Marchetti",
    title: "Director, ITER Fusion Lab",
    country: "🇮🇹 Italy",
    topic: "Frontiers in Fusion Research",
    bio: "Pioneer of advanced tokamak diagnostics with over 200 publications in fusion energy science.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Dr. Rajiv Sharma",
    title: "Head of Plasma Physics, ISRO",
    country: "🇮🇳 India",
    topic: "Plasma Propulsion for Deep Space",
    bio: "Architect of India's electric propulsion program, leading next-gen plasma thrusters.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  },
  {
    name: "Prof. Sarah K. Lindgren",
    title: "MIT Plasma Science Center",
    country: "🇺🇸 USA",
    topic: "Plasma Medicine: Future of Healthcare",
    bio: "Leading researcher on cold atmospheric plasma applications in oncology and wound healing.",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80",
  },
  {
    name: "Dr. Hiroshi Tanaka",
    title: "National Fusion Research Institute",
    country: "🇯🇵 Japan",
    topic: "Magnetic Confinement Breakthroughs",
    bio: "Renowned for groundbreaking work in helical plasma confinement and stellarator design.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
];

const INVITED = [
  { name: "Dr. Anna Volkov", inst: "Kurchatov Institute", country: "🇷🇺", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Prof. Liu Wei", inst: "Tsinghua University", country: "🇨🇳", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { name: "Dr. Maria Santos", inst: "INPE Brazil", country: "🇧🇷", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Prof. Klaus Werner", inst: "Max Planck Institute", country: "🇩🇪", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Dr. Priya Iyer", inst: "IIT Bombay", country: "🇮🇳", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" },
  { name: "Prof. Diane Laurent", inst: "CEA Cadarache", country: "🇫🇷", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80" },
  { name: "Dr. Ahmed Al-Rashid", inst: "KAUST", country: "🇸🇦", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Prof. Yuki Sato", inst: "Kyoto University", country: "🇯🇵", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80" },
];

function FeaturedCard({ s, i }: { s: typeof FEATURED[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-3xl overflow-hidden hover:border-glow transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass-strong text-xs">{s.country}</span>
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl">{s.name}</h3>
        <p className="text-sm text-cyan mt-1">{s.title}</p>
        <p className="text-sm font-medium mt-3 text-foreground/90">{s.topic}</p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.bio}</p>
      </div>
    </motion.article>
  );
}

export function Speakers({ showAll = false }: { showAll?: boolean }) {
  const [expanded, setExpanded] = useState(showAll);
  return (
    <section id="speakers" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Speakers" title="Global Voices in Plasma Science." subtitle="Hear from the researchers shaping the next decade of plasma discovery." />

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {FEATURED.map((s, i) => <FeaturedCard key={s.name} s={s} i={i} />)}
        </div>

        <Reveal>
          <h3 className="font-display font-semibold text-2xl mt-20 mb-6">Invited Speakers</h3>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {INVITED.slice(0, expanded ? INVITED.length : 4).map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 text-center hover:border-glow transition-all"
            >
              <img src={p.img} alt={p.name} className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-cyan/40" />
              <h4 className="font-display font-semibold text-sm mt-3">{p.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{p.inst}</p>
              <p className="text-xs mt-1">{p.country}</p>
            </motion.div>
          ))}
        </div>
        {!expanded && (
          <div className="text-center mt-10">
            <button onClick={() => setExpanded(true)} className="px-6 py-3 rounded-full glass hover:border-glow text-sm font-semibold">
              View All Speakers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
