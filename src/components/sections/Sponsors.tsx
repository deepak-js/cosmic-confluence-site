import { motion } from "framer-motion";
import { SectionHeader, Reveal } from "../Reveal";

const TIERS = [
  { name: "Platinum", items: ["Tata Sons", "Reliance Research"], size: "text-2xl md:text-3xl" },
  { name: "Gold", items: ["BHEL", "L&T Tech", "Wipro Labs"], size: "text-xl md:text-2xl" },
  { name: "Silver", items: ["Infosys", "Mahindra Research", "BEL", "HAL"], size: "text-lg md:text-xl" },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Sponsors & Partners" title="Powered by industry leaders." center />

        <div className="mt-14 space-y-10">
          {TIERS.map((tier, ti) => (
            <Reveal key={tier.name} delay={ti * 0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan text-center mb-4">{tier.name}</p>
                <div className={`grid gap-4 ${tier.items.length === 2 ? "sm:grid-cols-2" : tier.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
                  {tier.items.map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`glass rounded-2xl py-10 flex items-center justify-center font-display font-bold tracking-wider hover:border-glow transition-all ${tier.size}`}
                    >
                      {name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary text-sm font-semibold">
              Become a Sponsor →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
