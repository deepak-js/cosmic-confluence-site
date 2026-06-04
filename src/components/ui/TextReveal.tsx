import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(6px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };
  
  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      ref={ref}
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em" }}>
          <motion.span variants={child} style={{ display: "inline-block" }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
