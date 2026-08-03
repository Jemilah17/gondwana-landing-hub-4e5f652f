import { createFileRoute } from "@tanstack/react-router";
import DirectorMinutes from "@/features/bolt/pages/DirectorMinutes";
import { RequireDirector } from "@/features/bolt/components/RoleGuards";

export const Route = createFileRoute("/director-minutes")({
  head: () => ({
    meta: [
      { title: "Director portal — Gondwana Holdings Governance" },
      { name: "description", content: "Director portal for Gondwana Holdings Limited — minutes for review, board meetings, RSVPs, entities and declarations." },
      { property: "og:title", content: "Director portal — Gondwana Holdings Governance" },
      { property: "og:description", content: "Director portal for Gondwana Holdings Limited board members." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireDirector>
      <DirectorMinutes />
    </RequireDirector>
  ),
});
