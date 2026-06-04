import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const TARGET = new Date("2025-11-14T09:00:00+05:30").getTime();

// 60 static particles
const PARTICLES = Array.from({ length: 60 }).map((_, i) => ({
  left: (i * 41) % 100,
  top: (i * 73) % 100,
  size: 1 + ((i * 7) % 2),
  opacity: 0.1 + ((i * 13) % 20) / 100,
  dur: 8 + ((i * 3) % 9),
  delay: (i % 8) * 0.6,
}));

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden h-[1em] w-[0.62em] align-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-120%" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-0 tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex-1 px-3 md:px-6">
      <div className="font-display font-bold text-gradient tabular-nums leading-none flex" style={{ fontSize: "clamp(52px,8vw,96px)" }}>
        <Digit value={v[0]} />
        <Digit value={v[1]} />
      </div>
      <div className="mt-3 h-px w-10 bg-gradient-to-r from-violet to-cyan" />
      <div className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-tertiary">{label}</div>
    </div>
  );
}

function useCountUp(target: number, duration = 1200, start = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return n;
}

const STATS = [
  { v: 500, s: "+", l: "Delegates" },
  { v: 40, s: "+", l: "Countries" },
  { v: 60, s: "+", l: "Speakers" },
  { v: 3, s: "", l: "Days" },
];

function StatNum({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const n = useCountUp(value, 1200, started);
  return <span className="tabular-nums">{n}{suffix}</span>;
}

const TITLE = "PLASMA 2025";

export function Hero() {
  const t = useCountdown();
  const [statsStart, setStatsStart] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setStatsStart(true), 2300);
    return () => clearTimeout(id);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-28 pb-28 flex items-center">
      {/* L1 base color via body. L2 nebula */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 neb-pulse"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />
      {/* L3 orbs */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute drift-a rounded-full"
          style={{
            left: "25%", top: "30%", width: 700, height: 700, transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(147,51,234,0.55), transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute drift-b rounded-full"
          style={{
            left: "78%", top: "65%", width: 550, height: 550, transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(34,211,238,0.45), transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </div>
      {/* L4 particles */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.left}%`, top: `${p.top}%`,
              width: p.size, height: p.size, opacity: p.opacity,
              animation: `pulse-soft ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      {/* L5 vignette + bottom fade */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.85) 100%)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 -z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }} />

      {/* Scan line */}
      <motion.div
        aria-hidden
        initial={{ y: -4, opacity: 1 }}
        animate={{ y: "100vh", opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 right-0 top-0 h-px z-30 pointer-events-none"
        style={{ background: "rgba(168,85,247,0.4)", boxShadow: "0 0 12px rgba(168,85,247,0.8)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
          className="inline-flex flex-col gap-2"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            Nov 14–16, 2025 · Bengaluru, India
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
            className="h-px w-full bg-gradient-to-r from-violet to-cyan origin-left"
          />
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display font-black mt-6 relative inline-block"
          style={{ fontSize: "clamp(72px,12vw,140px)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
        >
          <span className="text-gradient inline-block">
            {TITLE.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.028, duration: 0.7, ease: EASE }}
                className="inline-block"
                style={{ whiteSpace: ch === " " ? "pre" : undefined }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          {/* Shimmer sweep */}
          <motion.span
            aria-hidden
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ delay: 1.7, duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              mixBlendMode: "overlay",
            }}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease: EASE }}
          className="mt-6 max-w-2xl text-muted-foreground"
          style={{ fontSize: "clamp(14px,1.8vw,20px)", letterSpacing: "0.08em" }}
        >
          International Symposium on <span className="text-foreground">Plasma Science &amp; Technology</span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7, ease: EASE }}
          className="mt-12"
        >
          <div className="label-mono-xs mb-5">Conference begins in</div>
          <div className="flex items-stretch divide-x divide-white/[0.06] -mx-3 md:-mx-6 max-w-2xl">
            <CountUnit value={t.days} label="Days" />
            <CountUnit value={t.hours} label="Hrs" />
            <CountUnit value={t.minutes} label="Mins" />
            <CountUnit value={t.seconds} label="Secs" />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#register" className="btn-primary inline-flex items-center gap-2" style={{ padding: "15px 40px" }}>
            Register Now <ArrowRight size={18} />
          </a>
          <a href="#schedule" className="btn-ghost inline-flex items-center gap-2" style={{ padding: "15px 32px" }}>
            Explore Program
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7, ease: EASE }}
          className="mt-12 inline-flex flex-wrap gap-x-10 gap-y-4 px-6 py-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col">
              <div className="font-body font-bold text-[22px] text-white">
                <StatNum value={s.v} suffix={s.s} started={statsStart} />
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-tertiary">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pulse-soft pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-tertiary">Scroll to explore</span>
        <span className="relative block w-px h-12 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <span
            className="absolute inset-0 block"
            style={{
              background: "linear-gradient(to bottom, transparent, #A78BFA, transparent)",
              animation: "scroll-tick 1.6s cubic-bezier(0.22,1,0.36,1) infinite",
            }}
          />
        </span>
      </div>
    </section>
  );
}
