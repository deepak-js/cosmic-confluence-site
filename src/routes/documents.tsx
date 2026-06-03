import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { Documents } from "../components/sections/Documents";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — PLASMA 2025" },
      { name: "description", content: "Download the brochure, call for papers, abstract & paper templates, and conference resources." },
      { property: "og:title", content: "Documents — PLASMA 2025" },
      { property: "og:description", content: "Conference resources and important dates." },
    ],
    links: [{ rel: "canonical", href: "/documents" }],
  }),
  component: () => (<Layout><div className="pt-24"><Documents /></div></Layout>),
});
