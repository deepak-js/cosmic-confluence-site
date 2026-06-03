import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { PlasmaBackground } from "../PlasmaBackground";

const TARGET = new Date("2025-11-14T09:00:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState(Date.now());
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

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-4 md:px-6 md:py-5 text-center min-w-[5rem]">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-display font-bold text-gradient tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export function Hero() {
  const t = useCountdown();
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <PlasmaBackground intense />
      <div
        className="absolute inset-0 -z-10 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            International Symposium · 3 Days · 40+ Countries
          </div>
          <h1 className="font-display font-bold leading-[0.95] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
            <span className="text-gradient">PLASMA</span>
            <br />
            <span className="text-foreground">2025</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl font-light">
            International Symposium on <span className="text-foreground font-medium">Plasma Science & Technology</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <MapPin size={14} className="text-cyan" /> St. Joseph's University, Bengaluru
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Calendar size={14} className="text-cyan" /> November 14–16, 2025
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <TimeBox value={t.days} label="Days" />
            <TimeBox value={t.hours} label="Hours" />
            <TimeBox value={t.minutes} label="Minutes" />
            <TimeBox value={t.seconds} label="Seconds" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold btn-primary pulse-glow"
            >
              Register Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold glass hover:border-glow transition-all"
            >
              View Schedule
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
