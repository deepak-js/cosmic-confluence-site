import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "schedule", label: "Schedule" },
  { id: "speakers", label: "Speakers" },
  { id: "topics", label: "Tracks" },
  { id: "committee", label: "Committee" },
  { id: "register", label: "Register" },
  { id: "venue", label: "Venue" },
  { id: "contact", label: "Contact" },
];

export function SideRail() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
            data-cursor="hover"
          >
            <span
              className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-all ${
                isActive ? "text-white opacity-100 translate-x-0" : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {s.label}
            </span>
            <span
              className="relative block rounded-full transition-all"
              style={{
                width: isActive ? 22 : 8,
                height: 2,
                background: isActive
                  ? "linear-gradient(90deg,#E879F9,#22D3EE)"
                  : "rgba(255,255,255,0.25)",
                boxShadow: isActive ? "0 0 12px rgba(232,121,249,0.6)" : "none",
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
