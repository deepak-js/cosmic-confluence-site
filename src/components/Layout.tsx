import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor, ScrollProgress } from "./Cursor";
import { SideRail } from "./fx/SideRail";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap-setup";

const PlasmaAtmosphere = lazy(() => import("./three/PlasmaAtmosphere"));

export function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    ensureGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Bridge Lenis ⇄ GSAP ScrollTrigger so scrub & pin agree on scroll source.
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <div id="top" className="relative min-h-screen">
      {mounted && (
        <Suspense fallback={null}>
          <PlasmaAtmosphere />
        </Suspense>
      )}
      <ScrollProgress />
      <CustomCursor />
      <SideRail />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
