import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-gradient-to-r from-violet to-cyan" />
          {eyebrow}
        </div>
      )}
      <motion.h2
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1, ease: EASE }}
        className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function GhostNumber({ n }: { n: string }) {
  return (
    <span aria-hidden className="ghost-num top-0 right-4 md:right-8">
      {n}
    </span>
  );
}
