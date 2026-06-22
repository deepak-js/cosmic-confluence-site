import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Speakers", href: "#speakers" },
  { label: "Tracks", href: "#topics" },
  { label: "Venue", href: "#venue" },
  { label: "Documents", href: "#documents" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-strong border-b border-white/[0.08]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 font-display font-black text-xl tracking-tight">
          <img src="/logo-transparent.png" alt="PRWC Logo" className="h-10 w-auto object-contain" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-gradient">PRWC</span>
            <span className="text-white">2026</span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-white transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm btn-primary"
            style={{ borderRadius: 999 }}
          >
            Register
          </a>
          <button
            className="lg:hidden p-2 rounded-md glass"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 glass-strong flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 p-2" aria-label="Close menu">
              <X size={24} />
            </button>
            <ul className="flex flex-col gap-6 text-center">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display font-black text-4xl text-white hover:text-gradient"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#register"
                  onClick={() => setOpen(false)}
                  className="btn-primary inline-flex px-8 py-3 mt-4"
                >
                  Register Now
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
