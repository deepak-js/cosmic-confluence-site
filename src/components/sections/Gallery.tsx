import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "../Reveal";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80", caption: "Plasma luminescence", h: "tall" },
  { src: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=800&q=80", caption: "Aurora borealis", h: "short" },
  { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80", caption: "Research lab", h: "tall" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", caption: "Instrumentation", h: "short" },
  { src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80", caption: "Fusion reactor concept", h: "tall" },
  { src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80", caption: "Scientist at work", h: "short" },
  { src: "https://images.unsplash.com/photo-1564324738080-bbbf8d6b4887?w=800&q=80", caption: "Auditorium keynote", h: "tall" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", caption: "Cosmic plasma", h: "short" },
  { src: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80", caption: "Neon glow", h: "tall" },
];

const EXTRA = [
  { src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80", caption: "Stellar field", h: "short" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80", caption: "Cosmic horizon", h: "tall" },
  { src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80", caption: "Plasma sky", h: "short" },
];

export function Gallery() {
  const [showMore, setShowMore] = useState(false);
  const items = showMore ? [...IMAGES, ...EXTRA] : IMAGES;
  return (
    <section id="gallery" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader eyebrow="Gallery" title="Moments from the frontier." />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-14 [column-fill:_balance]">
          {items.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="mb-4 break-inside-avoid group relative overflow-hidden rounded-2xl glass"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-sm font-medium">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!showMore && (
          <div className="text-center mt-8">
            <button onClick={() => setShowMore(true)} className="px-6 py-3 rounded-full glass hover:border-glow text-sm font-semibold">
              More Photos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
