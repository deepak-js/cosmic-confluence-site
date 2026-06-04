import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)", scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
      transition={{ duration: 1.2, delay, type: "spring", damping: 20, stiffness: 80 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
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
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal delay={0}>
          <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5 flex items-center justify-center md:justify-start gap-3">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-violet to-cyan" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <motion.h2
        initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(10px)", scale: 0.98 }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 1.2, type: "spring", bounce: 0, damping: 25, stiffness: 100 }}
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <motion.span ref={ref} style={{ y }} aria-hidden className="ghost-num top-0 right-4 md:right-8">
      {n}
    </motion.span>
  );
}
