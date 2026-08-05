import { createFileRoute } from "@tanstack/react-router";
import ProxyRegister from "@/features/bolt/pages/ProxyRegister";

export const Route = createFileRoute("/proxy")({
  head: () => ({
    meta: [
      { title: "Proxy register — Gondwana Holdings" },
      { name: "description", content: "Shareholder proxy submissions, voting instructions and resolution outcomes for Gondwana Holdings Ltd meetings." },
      { property: "og:title", content: "Proxy register — Gondwana Holdings" },
      { property: "og:description", content: "Shareholder proxy submissions and voting instructions for Gondwana Holdings Ltd." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProxyRegister,
});
