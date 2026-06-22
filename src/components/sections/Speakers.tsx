import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeader } from "../Reveal";
import { TiltCard } from "../fx/TiltCard";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap-setup";

const FEATURED = [
  {
    name: "Prof. Dr. Vinod Krishan",
    title: "Chief Guest",
    country: "🇮🇳 India",
    topic: "Retd., IIAp",
    bio: "Renowned physicist and leading expert in astrophysics and plasma science.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  },
  {
    name: "Prof. Dr. Vinod Kumar Sayal",
    title: "Chief Guest",
    country: "🇮🇳 India",
    topic: "Retd., SMU",
    bio: "Distinguished academician with profound contributions to theoretical and applied physics.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
];

const INVITED = [
  { name: "Dr. Swarniv Chandra", inst: "Gov. Gen. Deg. College, Kushmandi", country: "🇮🇳", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

function FeaturedCard({ s }: { s: typeof FEATURED[number] }) {
  return (
    <TiltCard className="featured-card shrink-0 w-[80vw] md:w-[55vw] lg:w-[40vw] max-w-[560px] rounded-3xl overflow-hidden glass">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={s.img} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass-strong text-xs">{s.country}</span>
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan">{s.title}</div>
          <h3 className="font-display font-black text-3xl md:text-4xl mt-2 leading-tight">{s.name}</h3>
          <p className="mt-3 text-sm font-medium text-foreground/90">{s.topic}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.bio}</p>
        </div>
      </div>
    </TiltCard>
  );
}

export function Speakers({ showAll = false }: { showAll?: boolean }) {
  const [expanded, setExpanded] = useState(showAll);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ensureGsap();
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const ctx = gsap.context(() => {
      const dist = track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: -dist,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${dist}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="speakers" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Speakers" title="Global Voices in Plasma Science." subtitle="Hear from the researchers shaping the next decade of plasma discovery." />
      </div>

      {/* Horizontal pinned act */}
      <div ref={wrapRef} className="relative mt-16 h-auto md:h-screen md:overflow-hidden overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        <div className="hidden md:flex absolute top-6 right-6 z-10 items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-tertiary">
          <span>Scroll →</span>
          <span className="block w-32 h-px bg-white/10 overflow-hidden">
            <span ref={progressRef} className="block h-full origin-left scale-x-0" style={{ background: "linear-gradient(90deg,#E879F9,#22D3EE)" }} />
          </span>
          <span>{FEATURED.length} featured</span>
        </div>
        <div
          ref={trackRef}
          className="flex md:absolute left-0 top-1/2 md:-translate-y-1/2 items-center gap-6 md:gap-8 px-6 md:px-[10vw] pb-10 md:pb-0 will-change-transform w-max"
        >
          {FEATURED.map((s) => (
            <div key={s.name} className="snap-center md:snap-align-none">
              <FeaturedCard s={s} />
            </div>
          ))}
        </div>
      </div>

      {/* Invited grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-20">
        <Reveal>
          <h3 className="font-display font-semibold text-2xl mb-2">Keynote & Invited Speakers</h3>
          <p className="text-muted-foreground text-sm mb-6">More speakers to be announced soon.</p>
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
              <img src={p.img} alt={p.name} className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-cyan/40" loading="lazy" />
              <h4 className="font-display font-semibold text-sm mt-3">{p.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{p.inst}</p>
              <p className="text-xs mt-1">{p.country}</p>
            </motion.div>
          ))}
        </div>
        {!expanded && (
          <div className="text-center mt-10">
            <button onClick={() => setExpanded(true)} className="px-6 py-3 rounded-full glass hover:border-glow text-sm font-semibold" data-cursor="hover">
              View All Speakers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
