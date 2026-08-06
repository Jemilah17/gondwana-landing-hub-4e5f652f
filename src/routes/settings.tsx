import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/features/bolt/pages/Settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Gondwana Governance" },
      { name: "description", content: "Access control, notification preferences and application information for the Gondwana governance dashboard." },
      { property: "og:title", content: "Settings — Gondwana Governance" },
      { property: "og:description", content: "Access control, notification preferences and application information." },
    ],
  }),
  component: Settings,
});
