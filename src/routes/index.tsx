import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Schedule } from "../components/sections/Schedule";
import { Speakers } from "../components/sections/Speakers";
import { Committee } from "../components/sections/Committee";
import { Topics } from "../components/sections/Topics";
import { Registration } from "../components/sections/Registration";
import { Documents } from "../components/sections/Documents";
import { Venue } from "../components/sections/Venue";
import { Gallery } from "../components/sections/Gallery";
import { Sponsors } from "../components/sections/Sponsors";
import { ContactSection } from "../components/sections/Contact";
import { GhostNumber } from "../components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLASMA 2025 | International Symposium on Plasma Science & Technology" },
      { name: "description", content: "PLASMA 2025 — Nov 14–16, 2025 at St. Joseph's University, Bengaluru. 500+ delegates, 40+ countries, 60+ speakers across fusion, plasma medicine, space & industrial plasma." },
      { property: "og:title", content: "PLASMA 2025 | International Symposium on Plasma Science & Technology" },
      { property: "og:description", content: "A cinematic 3-day global symposium on plasma science." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function NumberedSection({ id, n, children }: { id: string; n: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative">
      <GhostNumber n={n} />
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}

function Index() {
  return (
    <Layout>
      <Hero />
      <NumberedSection id="about" n="01"><About /></NumberedSection>
      <NumberedSection id="schedule" n="02"><Schedule /></NumberedSection>
      <NumberedSection id="speakers" n="03"><Speakers /></NumberedSection>
      <NumberedSection id="topics" n="04"><Topics /></NumberedSection>
      <NumberedSection id="committee" n="05"><Committee /></NumberedSection>
      <NumberedSection id="register" n="06"><Registration /></NumberedSection>
      <NumberedSection id="documents" n="07"><Documents /></NumberedSection>
      <NumberedSection id="venue" n="08"><Venue /></NumberedSection>
      <NumberedSection id="gallery" n="09"><Gallery /></NumberedSection>
      <NumberedSection id="sponsors" n="10"><Sponsors /></NumberedSection>
      <NumberedSection id="contact" n="11"><ContactSection /></NumberedSection>
    </Layout>
  );
}
