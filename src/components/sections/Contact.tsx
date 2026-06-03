import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, Twitter, Linkedin, BookOpen, Check, Loader2 } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});
type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });
  const field = "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 transition text-sm";
  const labelCls = "text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block";

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Get in touch with the secretariat." center />

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="font-display font-semibold text-xl mb-6">Conference Secretariat</h3>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0"><MapPin size={18} className="text-cyan" /></div>
                  <div className="text-sm">
                    <p className="font-medium">Department of Physics</p>
                    <p className="text-muted-foreground">St. Joseph's University<br />36 Lalbagh Road, Bengaluru 560027</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0"><Mail size={18} className="text-cyan" /></div>
                  <div className="text-sm"><p className="font-medium">Email</p><p className="text-muted-foreground">plasma2025@sjbu.edu.in</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0"><Phone size={18} className="text-cyan" /></div>
                  <div className="text-sm"><p className="font-medium">Phone</p><p className="text-muted-foreground">+91-80-2222-1111</p></div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0"><Clock size={18} className="text-cyan" /></div>
                  <div className="text-sm"><p className="font-medium">Working Hours</p><p className="text-muted-foreground">Mon–Fri · 9:00 AM – 5:00 PM IST</p></div>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a href="#" aria-label="Twitter" className="p-3 rounded-full glass hover:border-glow"><Twitter size={16} /></a>
                  <a href="#" aria-label="LinkedIn" className="p-3 rounded-full glass hover:border-glow"><Linkedin size={16} /></a>
                  <a href="#" aria-label="ResearchGate" className="p-3 rounded-full glass hover:border-glow"><BookOpen size={16} /></a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-3xl p-8 h-full flex flex-col gap-5">
              <h3 className="font-display font-semibold text-xl">Send us a message</h3>
              <div>
                <label className={labelCls}>Name *</label>
                <input {...register("name")} className={field} placeholder="Your name" />
                <AnimatePresence>
                  {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive mt-1">{errors.name.message}</motion.p>}
                </AnimatePresence>
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input {...register("email")} className={field} placeholder="you@example.com" />
                <AnimatePresence>
                  {errors.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive mt-1">{errors.email.message}</motion.p>}
                </AnimatePresence>
              </div>
              <div>
                <label className={labelCls}>Subject *</label>
                <select {...register("subject")} className={field} defaultValue="">
                  <option value="" disabled>Select subject</option>
                  <option>General Inquiry</option>
                  <option>Speaker Invitation</option>
                  <option>Sponsorship</option>
                  <option>Media</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
                <AnimatePresence>
                  {errors.subject && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive mt-1">{errors.subject.message}</motion.p>}
                </AnimatePresence>
              </div>
              <div className="flex-1">
                <label className={labelCls}>Message *</label>
                <textarea {...register("message")} rows={5} className={field} placeholder="How can we help?" />
                <AnimatePresence>
                  {errors.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive mt-1">{errors.message.message}</motion.p>}
                </AnimatePresence>
              </div>
              <button type="submit" disabled={isSubmitting || sent} className="py-3.5 rounded-full btn-primary font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                {sent ? <><Check size={18} /> Sent!</> : isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
