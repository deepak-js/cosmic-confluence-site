import { useEffect, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor, ScrollProgress } from "./Cursor";

export function Layout({ children }: { children: ReactNode }) {
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
