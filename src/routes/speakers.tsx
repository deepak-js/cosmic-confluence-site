import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { Speakers } from "../components/sections/Speakers";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "Speakers — PLASMA 2025" },
      { name: "description", content: "Keynote and invited speakers from ITER, MIT, ISRO, NFRI Japan, and leading institutions worldwide." },
      { property: "og:title", content: "Speakers — PLASMA 2025" },
      { property: "og:description", content: "Global voices in plasma science." },
    ],
    links: [{ rel: "canonical", href: "/speakers" }],
  }),
  component: () => (<Layout><div className="pt-24"><Speakers showAll /></div></Layout>),
});
