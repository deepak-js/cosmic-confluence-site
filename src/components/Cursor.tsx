import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, [data-cursor='hover'], input, textarea, select");
      if (interactive !== hovering) {
        hovering = interactive;
        if (ringRef.current) {
          ringRef.current.style.background = hovering ? "rgba(147,51,234,0.12)" : "transparent";
          ringRef.current.style.borderColor = hovering ? "rgba(168,85,247,0.7)" : "rgba(248,250,252,0.4)";
          ringRef.current.style.boxShadow = hovering ? "0 0 30px rgba(147,51,234,0.5)" : "none";
          ringRef.current.style.setProperty("--ring-scale", hovering ? "1.6" : "1");
        }
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(var(--ring-scale,1))`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border"
        style={{
          borderColor: "rgba(248,250,252,0.4)",
          willChange: "transform",
          transition: "background .3s cubic-bezier(0.22,1,0.36,1), border-color .3s, box-shadow .3s",
        }}
      />
    </>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9997] origin-left">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ background: "linear-gradient(90deg, #9333EA, #22D3EE)", transform: "scaleX(0)" }}
      />
    </div>
  );
}
