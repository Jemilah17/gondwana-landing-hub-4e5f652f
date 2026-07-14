import { createFileRoute } from "@tanstack/react-router";
import Minutes from "@/features/minutes/Minutes";

export const Route = createFileRoute("/minutes")({
  head: () => ({
    meta: [
      { title: "Minutes — Gondwana Governance" },
      {
        name: "description",
        content:
          "Meeting minutes register and approval workflow for Gondwana Governance.",
      },
    ],
  }),
  component: Minutes,
});