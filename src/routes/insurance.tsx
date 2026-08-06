import { createFileRoute } from "@tanstack/react-router";
import Insurance from "@/features/bolt/pages/Insurance";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance register — Gondwana Holdings" },
      { name: "description", content: "All policies, active claims and renewal calendar for Gondwana Holdings Ltd." },
      { property: "og:title", content: "Insurance register — Gondwana Holdings" },
      { property: "og:description", content: "All policies, active claims and renewal calendar for Gondwana Holdings Ltd." },
    ],
  }),
  component: Insurance,
});
