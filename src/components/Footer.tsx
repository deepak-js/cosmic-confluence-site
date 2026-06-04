import { Mail, MapPin, Phone, Twitter, Linkedin, BookOpen, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #9333EA, transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer-line 4s linear infinite",
        }}
      />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-display font-black text-2xl mb-4">
              <span className="text-gradient">PLASMA</span> <span className="text-white">2025</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              International Symposium on Plasma Science &amp; Technology. Hosted by the Department of Physics, St. Joseph's University, Bengaluru.
            </p>
          </div>
          <div>
            <h4 className="label-mono mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#schedule" className="hover:text-white">Schedule</a></li>
              <li><a href="#speakers" className="hover:text-white">Speakers</a></li>
              <li><a href="#register" className="hover:text-white">Registration</a></li>
              <li><a href="#documents" className="hover:text-white">Documents</a></li>
            </ul>
          </div>
          <div>
            <h4 className="label-mono mb-4">Key Dates</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li>Abstract: Sep 30, 2025</li>
              <li>Acceptance: Oct 20, 2025</li>
              <li>Early Bird: Oct 15, 2025</li>
              <li>Conference: Nov 14–16, 2025</li>
            </ul>
          </div>
          <div>
            <h4 className="label-mono mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-accent" /> 36 Lalbagh Road, Bengaluru 560027</li>
              <li className="flex gap-2"><Mail size={16} className="shrink-0 mt-0.5 text-accent" /> plasma2025@sjbu.edu.in</li>
              <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5 text-accent" /> +91-80-2222-1111</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a className="p-2 rounded-full glass" href="#" aria-label="Twitter"><Twitter size={16} /></a>
              <a className="p-2 rounded-full glass" href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a className="p-2 rounded-full glass" href="#" aria-label="ResearchGate"><BookOpen size={16} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-tertiary font-mono">
          <p>© 2025 PLASMA Symposium · St. Joseph's University, Bengaluru</p>
          <p>Made with <span className="text-plasma">♥</span> by Department of Physics</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass hover:border-glow"
            aria-label="Back to top"
          >
            <ArrowUp size={14} /> Top
          </button>
        </div>
      </div>
    </footer>
  );
}
