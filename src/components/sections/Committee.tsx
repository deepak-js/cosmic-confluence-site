import { motion } from "framer-motion";
import { SectionHeader } from "../Reveal";

const INTL = [
  { name: "Prof. Elena Marchetti", inst: "ITER Fusion Lab", country: "🇮🇹", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" },
  { name: "Prof. Sarah K. Lindgren", inst: "MIT Plasma Center", country: "🇺🇸", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&q=80" },
  { name: "Dr. Hiroshi Tanaka", inst: "NFRI Japan", country: "🇯🇵", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "Prof. Klaus Werner", inst: "Max Planck Inst.", country: "🇩🇪", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
  { name: "Prof. Diane Laurent", inst: "CEA Cadarache", country: "🇫🇷", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80" },
  { name: "Dr. Liu Wei", inst: "Tsinghua University", country: "🇨🇳", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
];

const ORG = [
  { name: "Dr. A. Priyanka", inst: "General Chair · HOD Physics, SJU", country: "🇮🇳", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80" },
  { name: "Dr. M. Sundar", inst: "Co-Chair · Associate Prof., Physics", country: "🇮🇳", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
  { name: "Prof. R. Venkatesh", inst: "Technical Chair · Senior Researcher", country: "🇮🇳", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
  { name: "Dr. Priya Iyer", inst: "Program Chair · IIT Bombay (Adv.)", country: "🇮🇳", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80" },
  { name: "Dr. Anand Kumar", inst: "Publications Chair · Physics, SJU", country: "🇮🇳", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80" },
  { name: "Rev. Fr. Joseph Puthenpura SJ", inst: "Founding Patron · Vice-Chancellor", country: "🇮🇳", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
];

function MemberCard({ m, i }: { m: typeof INTL[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="flex items-center gap-4 glass rounded-2xl p-4 hover:border-glow transition-all"
    >
      <img src={m.img} alt={m.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-cyan/30 shrink-0" />
      <div className="min-w-0">
        <h4 className="font-display font-semibold text-sm truncate">{m.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{m.inst}</p>
        <span className="text-xs">{m.country}</span>
      </div>
    </motion.div>
  );
}

export function Committee() {
  return (
    <section id="committee" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Leadership" title="The minds behind PLASMA 2025." />

        <div className="grid lg:grid-cols-2 gap-10 mt-14">
          <div>
            <h3 className="font-display font-semibold text-xl mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-cyan" /> International Scientific Committee
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {INTL.map((m, i) => <MemberCard key={m.name} m={m} i={i} />)}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-cyan" /> Organizing Committee
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {ORG.map((m, i) => <MemberCard key={m.name} m={m} i={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
