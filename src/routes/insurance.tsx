import { createFileRoute } from "@tanstack/react-router";
import Insurance from "@/features/bolt/pages/Insurance";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance register — Meridian Holdings" },
      { name: "description", content: "All policies, active claims and renewal calendar for Meridian Holdings Ltd." },
      { property: "og:title", content: "Insurance register — Meridian Holdings" },
      { property: "og:description", content: "All policies, active claims and renewal calendar for Meridian Holdings Ltd." },
    ],
  }),
  component: Insurance,
});
