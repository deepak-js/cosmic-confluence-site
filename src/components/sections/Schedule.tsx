import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "../Reveal";

type Item = { time: string; title: string; speaker?: string; room: string; track: "keynote" | "session" | "workshop" | "social" };

const DAYS: { id: string; label: string; date: string; items: Item[] }[] = [
  {
    id: "d1",
    label: "Day 1",
    date: "Dec 11 · Fri",
    items: [
      { time: "09:00", title: "Inauguration Ceremony", room: "Bishop Ambrose Hall", track: "keynote" },
      { time: "10:30", title: "Keynote: Frontiers in Fusion Research", speaker: "Prof. Elena Marchetti", room: "Bishop Ambrose Hall", track: "keynote" },
      { time: "12:00", title: "Track A: Fusion Plasmas", room: "Hall A · Science Block", track: "session" },
      { time: "12:00", title: "Track B: Plasma Medicine", room: "Hall B · Science Block", track: "session" },
      { time: "15:30", title: "Poster Session 1", room: "Atrium", track: "session" },
      { time: "19:00", title: "Welcome Dinner Gala", room: "University Lawns", track: "social" },
    ],
  },
  {
    id: "d2",
    label: "Day 2",
    date: "Dec 12 · Sat",
    items: [
      { time: "09:00", title: "Keynote: Industrial Plasma Applications", speaker: "Dr. Rajiv Sharma", room: "Bishop Ambrose Hall", track: "keynote" },
      { time: "10:30", title: "Workshop: Plasma Diagnostics", room: "Lab 204", track: "workshop" },
      { time: "12:30", title: "Panel: Plasma in Space Exploration", room: "Bishop Ambrose Hall", track: "keynote" },
      { time: "14:30", title: "Track C: Low-Temperature Plasma", room: "Hall A", track: "session" },
      { time: "14:30", title: "Track D: Computational Plasma Physics", room: "Hall B", track: "session" },
      { time: "16:30", title: "Poster Session 2", room: "Atrium", track: "session" },
      { time: "18:00", title: "Award Ceremony & Valedictory", room: "Bishop Ambrose Hall", track: "social" },
      { time: "19:30", title: "Cultural Evening & Farewell", room: "Open Theatre", track: "social" },
    ],
  },
];

const TRACK_COLORS: Record<Item["track"], string> = {
  keynote: "from-violet to-plasma",
  session: "from-cyan to-violet",
  workshop: "from-cyan to-emerald-500",
  social: "from-pink-500 to-violet",
};

export function Schedule() {
  const [active, setActive] = useState(0);
  const day = DAYS[active];

  return (
    <section id="schedule" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="Program"
          title="Two days. One frontier."
          subtitle="A curated journey through keynotes, parallel technical sessions, hands-on workshops and unforgettable evenings."
        />

        <div className="mt-12 flex gap-2 overflow-x-auto pb-2">
          {DAYS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="day-pill"
                  className="absolute inset-0 rounded-full btn-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{d.label} <span className="opacity-70 ml-1">· {d.date}</span></span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 relative"
          >
            <div className="absolute left-[4.5rem] md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            <ul className="space-y-4">
              {day.items.map((it, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="relative pl-20 md:pl-32"
                >
                  <div className="absolute left-0 top-2 w-16 md:w-20 text-right text-sm font-mono font-semibold text-cyan tabular-nums">
                    {it.time}
                  </div>
                  <div className="absolute left-[4.25rem] md:left-[5.75rem] top-3 w-2.5 h-2.5 rounded-full bg-cyan ring-4 ring-background" />
                  <div className="glass rounded-2xl p-5 hover:border-glow transition-all">
                    <div className="flex flex-wrap items-start gap-3 justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-lg">{it.title}</h3>
                        {it.speaker && <p className="text-sm text-muted-foreground mt-1">{it.speaker}</p>}
                        <p className="text-xs text-muted-foreground mt-1.5">📍 {it.room}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-gradient-to-r ${TRACK_COLORS[it.track]} text-white`}>
                        {it.track}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
