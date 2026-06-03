import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { Registration } from "../components/sections/Registration";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — PLASMA 2025" },
      { name: "description", content: "Register for PLASMA 2025. Early bird pricing for students, faculty, industry and international delegates until Oct 15, 2025." },
      { property: "og:title", content: "Register — PLASMA 2025" },
      { property: "og:description", content: "Secure your seat at PLASMA 2025." },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: () => (<Layout><div className="pt-24"><Registration /></div></Layout>),
});
