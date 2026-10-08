import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/features/bolt/pages/Settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Meridian Governance" },
      { name: "description", content: "Access control, notification preferences and application information for the Meridian governance dashboard." },
      { property: "og:title", content: "Settings — Meridian Governance" },
      { property: "og:description", content: "Access control, notification preferences and application information." },
    ],
  }),
  component: Settings,
});
