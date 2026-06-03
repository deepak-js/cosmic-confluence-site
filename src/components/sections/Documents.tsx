import { motion } from "framer-motion";
import { Download, FileText, FileType, FileCheck } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const DOCS = [
  { name: "Conference Brochure", type: "PDF", size: "2.4 MB" },
  { name: "Call for Papers", type: "PDF", size: "0.9 MB" },
  { name: "Abstract Template", type: "DOCX", size: "120 KB" },
  { name: "Full Paper Template", type: "DOCX", size: "180 KB" },
  { name: "Registration Form (Offline)", type: "PDF", size: "0.4 MB" },
  { name: "Sponsorship Prospectus", type: "PDF", size: "3.1 MB" },
  { name: "Visa Support Request Form", type: "PDF", size: "0.3 MB" },
  { name: "Hotel & Accommodation Guide", type: "PDF", size: "1.7 MB" },
];

const DATES = [
  { date: "July 1, 2025", title: "Abstract Submission Opens" },
  { date: "September 30, 2025", title: "Abstract Submission Deadline" },
  { date: "October 15, 2025", title: "Early Bird Registration Closes" },
  { date: "October 20, 2025", title: "Notification of Acceptance" },
  { date: "November 1, 2025", title: "Full Paper Submission" },
  { date: "November 14–16, 2025", title: "Conference Days", highlight: true },
];

const ICON: Record<string, typeof FileText> = { PDF: FileText, DOCX: FileType };

export function Documents() {
  return (
    <section id="documents" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Resources" title="Documents & important dates." subtitle="Download everything you need to prepare for the symposium." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {DOCS.map((d, i) => {
            const Icon = ICON[d.type] ?? FileCheck;
            return (
              <motion.a
                key={d.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-5 hover:border-glow transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--violet), var(--cyan))" }}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md glass">{d.type}</span>
                </div>
                <h3 className="font-display font-semibold text-sm leading-snug flex-1">{d.name}</h3>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{d.size}</span>
                  <Download size={16} className="text-cyan group-hover:translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <h3 className="font-display font-semibold text-2xl mt-24 mb-8 text-center">Important Dates</h3>
        </Reveal>
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-violet to-cyan opacity-30" />
          <ul className="space-y-4">
            {DATES.map((d, i) => (
              <motion.li
                key={d.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-12"
              >
                <div className={`absolute left-2 top-3 w-4 h-4 rounded-full ring-4 ring-background ${d.highlight ? "btn-primary pulse-glow" : "bg-cyan"}`} />
                <div className={`glass rounded-xl p-4 ${d.highlight ? "border-glow" : ""}`}>
                  <p className="text-xs uppercase tracking-widest text-cyan">{d.date}</p>
                  <p className="font-display font-semibold text-base mt-1">{d.title}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
