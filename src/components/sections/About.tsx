import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeader, ScrollReveal } from "../Reveal";
import { TextReveal } from "../ui/TextReveal";

const STATS = [
  { value: 500, suffix: "+", label: "Delegates" },
  { value: 40, suffix: "+", label: "Countries" },
  { value: 60, suffix: "+", label: "Speakers" },
  { value: 30, suffix: "+", label: "Papers" },
  { value: 3, suffix: "", label: "Days" },
  { value: 12, suffix: "", label: "Workshops" },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}</span>;
}

const PARTNERS = ["ISRO", "DAE", "IPR", "BARC", "TIFR", "IIT-B", "IISc", "CSIR"];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="About the Symposium"
              title="A global forum for plasma science."
              subtitle="PLASMA 2025 is a premier global forum bringing together leading minds in plasma physics, controlled nuclear fusion, plasma medicine, space plasma, and industrial plasma applications. Hosted by the prestigious Department of Physics at St. Joseph's University, Bengaluru — one of India's top research institutions — this 3-day symposium invites 500+ delegates from 40+ countries."
            />
            <ScrollReveal>
              <div className="mt-8 p-6 glass rounded-2xl border-l-2 border-l-cyan">
                <TextReveal 
                  className="text-sm text-muted-foreground leading-relaxed italic"
                  text='"Our mission is to accelerate breakthroughs in plasma science by uniting researchers, industry pioneers, and emerging scholars under one roof — bridging fundamental physics with transformative applications across energy, medicine, and space."'
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -8, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="glass rounded-2xl p-5 h-full hover:border-glow shadow-lg"
                >
                  <div className="font-display font-bold text-3xl md:text-4xl text-gradient">
                    <Counter value={s.value} />{s.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 pt-10 border-t border-border">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-6">
              In partnership with leading institutions
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-3 glass rounded-xl font-display font-semibold text-sm tracking-wider"
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
