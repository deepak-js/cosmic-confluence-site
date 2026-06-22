import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { SectionHeader, Reveal } from "../Reveal";

const TIERS = [
  { name: "SJU Students", price: "Free", early: "Free", perks: ["Full 2-day access", "Lunch & refreshments", "Conference kit"] },
  { name: "Other Students", price: "₹500", early: "₹500", perks: ["Full 2-day access", "Lunch & refreshments", "Conference kit"] },
  { name: "Ph.D. Scholars", price: "₹1,000", early: "₹1,000", perks: ["Full 2-day access", "Lunch & refreshments", "Conference kit"] },
  { name: "Faculty / Academicians", price: "₹1,500", early: "₹1,500", perks: ["Full 2-day access", "Lunch & refreshments", "Proceedings copy"], featured: true },
  { name: "Industry Professionals", price: "₹2,000", early: "₹2,000", perks: ["Full 2-day access", "Networking lounge", "Sponsor meet-up"] },
];

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone is required"),
  institution: z.string().min(2, "Institution is required"),
  country: z.string().min(2, "Country is required"),
  designation: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  paperTitle: z.string().optional(),
  dietary: z.string().optional(),
  tshirt: z.string().optional(),
  accommodation: z.string().max(500).optional(),
  payment: z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;

const COUNTRIES = ["India", "United States", "United Kingdom", "Germany", "France", "Italy", "Japan", "China", "Brazil", "Russia", "South Korea", "Australia", "Canada", "Singapore", "Other"];

export function Registration() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    const id = "PLM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitted(id);
    reset();
  };

  const field = "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 transition text-sm";
  const labelCls = "text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block";

  return (
    <section id="register" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Registration" title="Secure your seat at PLASMA 2025." subtitle="Early bird pricing valid until October 15, 2025." center />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative glass rounded-2xl p-6 ${t.featured ? "border-glow" : ""}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold btn-primary">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-semibold text-lg">{t.name}</h3>
              <div className="mt-4">
                <div className="font-display font-bold text-2xl text-gradient">{t.price}</div>
                <div className="text-[10px] uppercase tracking-widest text-cyan mt-1">Registration Fee</div>
              </div>
              <ul className="mt-4 space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="text-xs text-muted-foreground flex gap-2"><Check size={14} className="text-cyan shrink-0 mt-0.5" /> {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 glass-strong rounded-3xl p-6 md:p-10 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center btn-primary pulse-glow"
                  >
                    <Check size={40} />
                  </motion.div>
                  <h3 className="font-display font-bold text-3xl mt-6">Registration Confirmed!</h3>
                  <p className="text-muted-foreground mt-2">Your registration ID is</p>
                  <p className="font-mono font-bold text-2xl text-gradient mt-1">{submitted}</p>
                  <p className="text-sm text-muted-foreground mt-4">A confirmation email has been sent. See you in Bengaluru!</p>
                  <button onClick={() => setSubmitted(null)} className="mt-6 px-5 py-2.5 rounded-full glass text-sm font-semibold">
                    Register Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input {...register("name")} className={field} placeholder="Dr. Jane Doe" />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input {...register("email")} className={field} placeholder="jane@university.edu" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input {...register("phone")} className={field} placeholder="+91 98765 43210" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Institution *</label>
                    <input {...register("institution")} className={field} placeholder="St. Joseph's University" />
                    {errors.institution && <p className="text-xs text-destructive mt-1">{errors.institution.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Country *</label>
                    <select {...register("country")} className={field} defaultValue="">
                      <option value="" disabled>Select country</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="text-xs text-destructive mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Designation *</label>
                    <select {...register("designation")} className={field} defaultValue="">
                      <option value="" disabled>Select designation</option>
                      <option>Student</option>
                      <option>Research Scholar</option>
                      <option>Faculty</option>
                      <option>Industry</option>
                      <option>Other</option>
                    </select>
                    {errors.designation && <p className="text-xs text-destructive mt-1">{errors.designation.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Category *</label>
                    <select {...register("category")} className={field} defaultValue="">
                      <option value="" disabled>Select category</option>
                      <option>Presenter</option>
                      <option>Attendee</option>
                    </select>
                    {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Paper Title (optional)</label>
                    <input {...register("paperTitle")} className={field} placeholder="Title of your submission" />
                  </div>
                  <div>
                    <label className={labelCls}>Dietary Requirements</label>
                    <select {...register("dietary")} className={field}>
                      <option>None</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Halal</option>
                      <option>Gluten-free</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>T-Shirt Size</label>
                    <select {...register("tshirt")} className={field}>
                      <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Special Accommodation Needs</label>
                    <textarea {...register("accommodation")} rows={3} className={field} placeholder="Any accessibility or other requirements" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Payment Method *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Online", "Bank Transfer", "DD"].map((p) => (
                        <label key={p} className="flex items-center justify-center gap-2 p-3 rounded-xl glass cursor-pointer has-[:checked]:border-glow text-sm">
                          <input type="radio" value={p} {...register("payment")} className="accent-cyan" />
                          {p}
                        </label>
                      ))}
                    </div>
                    {errors.payment && <p className="text-xs text-destructive mt-1">{errors.payment.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:col-span-2 mt-2 w-full py-4 rounded-full btn-primary font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Processing…</> : "Complete Registration"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
