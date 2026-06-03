import { motion } from "framer-motion";

export function PlasmaBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.26 300 / 0.5), transparent 70%)", filter: "blur(60px)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[44rem] h-[44rem] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 200 / 0.45), transparent 70%)", filter: "blur(70px)" }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[36rem] h-[36rem] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.24 320 / 0.4), transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {intense && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                boxShadow: "0 0 8px var(--cyan)",
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
