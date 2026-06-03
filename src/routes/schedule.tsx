import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { Schedule } from "../components/sections/Schedule";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — PLASMA 2025" },
      { name: "description", content: "Full 3-day program for PLASMA 2025: keynotes, technical sessions, workshops and evenings." },
      { property: "og:title", content: "Schedule — PLASMA 2025" },
      { property: "og:description", content: "Full 3-day program for PLASMA 2025." },
    ],
    links: [{ rel: "canonical", href: "/schedule" }],
  }),
  component: () => (<Layout><div className="pt-24"><Schedule /></div></Layout>),
});
