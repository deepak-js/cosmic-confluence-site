import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor, ScrollProgress } from "./Cursor";

export function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    // Hash anchor scroll on mount
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);
  return (
    <div id="top" className="relative min-h-screen">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
