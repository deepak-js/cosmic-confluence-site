import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { ContactSection } from "../components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PLASMA 2025" },
      { name: "description", content: "Reach the PLASMA 2025 conference secretariat at the Department of Physics, St. Joseph's University, Bengaluru." },
      { property: "og:title", content: "Contact — PLASMA 2025" },
      { property: "og:description", content: "Get in touch with the secretariat." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (<Layout><div className="pt-24"><ContactSection /></div></Layout>),
});
