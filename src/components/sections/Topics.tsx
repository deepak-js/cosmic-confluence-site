import { motion } from "framer-motion";
import { Atom, HeartPulse, Telescope, Factory, Thermometer, Activity, Cpu, Rocket, ArrowUpRight, Clock } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const TOPICS = [
  { icon: Atom, title: "Fusion Plasmas & Tokamaks", desc: "Magnetic confinement, ITER advancements, and next-gen reactor design." },
  { icon: HeartPulse, title: "Plasma Medicine & Bio-Applications", desc: "Cold atmospheric plasma in oncology, wound healing, and sterilization." },
  { icon: Telescope, title: "Space & Astrophysical Plasmas", desc: "Solar wind, magnetospheres, and the plasma universe." },
  { icon: Factory, title: "Industrial Plasma Processing", desc: "Surface treatment, deposition, and semiconductor manufacturing." },
  { icon: Thermometer, title: "Low-Temperature Plasmas", desc: "Non-thermal plasma chemistry and atmospheric pressure discharges." },
  { icon: Activity, title: "Plasma Diagnostics & Instrumentation", desc: "Advanced spectroscopy, probes, and real-time measurement." },
  { icon: Cpu, title: "Computational & Simulation Methods", desc: "PIC codes, MHD simulation, and AI-driven plasma modeling." },
  { icon: Rocket, title: "Plasma Propulsion & Aerospace", desc: "Electric thrusters, Hall effect engines, and deep-space missions." },
];

export function Topics() {
  return (
    <section id="topics" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Call for Papers" title="Eight research tracks. One symposium." subtitle="Submit original work in any of these tracks. Selected papers will appear in the conference proceedings." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {TOPICS.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.a
                key={t.title}
                href="#"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl p-6 hover:border-glow transition-all block"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, var(--violet), var(--cyan))" }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Submit Paper <ArrowUpRight size={14} />
                </div>
              </motion.a>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 border-glow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center btn-primary">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Abstract Submission Deadline</p>
                <p className="font-display font-bold text-xl">September 30, 2025</p>
              </div>
            </div>
            <a href="#" className="px-5 py-3 rounded-full btn-primary text-sm font-semibold">Submit Abstract</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
