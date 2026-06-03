import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Twitter, Linkedin, BookOpen } from "lucide-react";
import { PlasmaLogo } from "./PlasmaLogo";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PlasmaLogo size={28} />
              <span className="font-display font-bold text-lg">PLASMA 2025</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              International Symposium on Plasma Science & Technology. Hosted by the Department of Physics, St. Joseph's University, Bengaluru.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/schedule" className="hover:text-cyan">Schedule</Link></li>
              <li><Link to="/speakers" className="hover:text-cyan">Speakers</Link></li>
              <li><Link to="/register" className="hover:text-cyan">Registration</Link></li>
              <li><Link to="/documents" className="hover:text-cyan">Documents</Link></li>
              <li><Link to="/contact" className="hover:text-cyan">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Important Dates</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Abstract Deadline: Sep 30, 2025</li>
              <li>Acceptance: Oct 20, 2025</li>
              <li>Early Bird: Oct 15, 2025</li>
              <li>Conference: Nov 14–16, 2025</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-cyan" /> 36 Lalbagh Road, Bengaluru 560027</li>
              <li className="flex gap-2"><Mail size={16} className="shrink-0 mt-0.5 text-cyan" /> plasma2025@sjbu.edu.in</li>
              <li className="flex gap-2"><Phone size={16} className="shrink-0 mt-0.5 text-cyan" /> +91-80-2222-1111</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a className="p-2 rounded-full glass hover:border-glow" href="#" aria-label="Twitter"><Twitter size={16} /></a>
              <a className="p-2 rounded-full glass hover:border-glow" href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a className="p-2 rounded-full glass hover:border-glow" href="#" aria-label="ResearchGate"><BookOpen size={16} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 PLASMA 2025 International Symposium. Organized by Department of Physics, St. Joseph's University, Bengaluru. All rights reserved.</p>
          <p>Powered by St. Joseph's University · Est. 1882</p>
        </div>
      </div>
    </footer>
  );
}
