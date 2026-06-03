import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PlasmaLogo } from "./PlasmaLogo";

const NAV = [
  { label: "Home", to: "/", hash: "" },
  { label: "About", to: "/", hash: "#about" },
  { label: "Schedule", to: "/schedule", hash: "" },
  { label: "Speakers", to: "/speakers", hash: "" },
  { label: "Committee", to: "/", hash: "#committee" },
  { label: "Venue", to: "/", hash: "#venue" },
  { label: "Documents", to: "/documents", hash: "" },
  { label: "Contact", to: "/contact", hash: "" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
            <PlasmaLogo size={28} />
          </motion.div>
          <span className="font-display font-bold text-lg tracking-tight">
            PLASMA<span className="text-gradient ml-1">2025</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                hash={item.hash || undefined}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-violet to-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold btn-primary pulse-glow"
          >
            Register Now
          </Link>
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
          <>
            <motion.div
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] glass-strong border-l border-border z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <PlasmaLogo size={24} />
                  <span className="font-display font-bold">PLASMA 2025</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-muted">
                  <X size={20} />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      hash={item.hash || undefined}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-6 w-full inline-flex justify-center items-center px-5 py-3 rounded-full text-sm font-semibold btn-primary"
              >
                Register Now
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
