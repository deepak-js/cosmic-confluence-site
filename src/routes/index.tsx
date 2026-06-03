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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLASMA 2025 | International Symposium on Plasma Science & Technology" },
      { name: "description", content: "PLASMA 2025 — International Symposium on Plasma Science & Technology. Nov 14–16, 2025 at St. Joseph's University, Bengaluru. 500+ delegates from 40+ countries." },
      { property: "og:title", content: "PLASMA 2025 | International Symposium on Plasma Science & Technology" },
      { property: "og:description", content: "Join 500+ delegates from 40+ countries at St. Joseph's University, Bengaluru, Nov 14–16, 2025." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Schedule />
      <Speakers />
      <Committee />
      <Topics />
      <Registration />
      <Documents />
      <Venue />
      <Gallery />
      <Sponsors />
      <ContactSection />
    </Layout>
  );
}
