import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeader, ScrollReveal } from "../Reveal";

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

const CONFERENCE_TEXT = "The Plasma Research Workshop and Colloquium 2026 (PRWC2026) is a two-day national-level scientific event organized by the Department of Physics, St. Joseph’s University, Bengaluru, on 11–12 December 2026. The conference aims to bring together researchers, academicians, scientists, industry professionals, and students working in various domains of plasma science and technology.\n\nPRWC2026 provides a vibrant platform for presenting recent advances, exchanging research ideas, fostering collaborations, and discussing emerging challenges in both fundamental and applied plasma physics. The event will feature keynote lectures, invited talks, oral and poster presentations, and interactive discussions led by distinguished experts from academia and research institutions.\n\nThe conference welcomes contributions in areas including Fundamental and Basic Plasmas, Space and Astrophysical Plasmas, Dusty and Exotic Plasmas, Laser and Quantum Plasmas, MHD and Solar Plasmas, Beam–Plasma Interactions, Nuclear Fusion, Laboratory Plasmas, Computational Plasma Modeling, and other interdisciplinary topics.";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="About PRWC2026"
              title="A global forum for plasma science."
            />
            <ScrollReveal>
              <div className="mt-8 space-y-6 text-muted-foreground text-sm leading-relaxed">
                {CONFERENCE_TEXT.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <div className="glass p-6 rounded-3xl flex flex-col justify-center min-h-[140px] border border-white/5 hover:border-violet/30 transition-colors">
                  <div className="font-display font-bold text-4xl text-gradient mb-2">
                    <Counter value={s.value} />
                    {s.suffix}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-tertiary">
                    {s.label}
                  </div>
                </div>
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
