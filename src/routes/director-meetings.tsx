import { createFileRoute } from "@tanstack/react-router";
import DirectorMeetings from "@/features/bolt/pages/DirectorMeetings";
import { RequireDirector } from "@/features/bolt/components/RoleGuards";

export const Route = createFileRoute("/director-meetings")({
  head: () => ({
    meta: [
      { title: "Director portal — Meridian Holdings Governance" },
      { name: "description", content: "Director portal for Meridian Holdings Limited — minutes for review, board meetings, RSVPs, entities and declarations." },
      { property: "og:title", content: "Director portal — Meridian Holdings Governance" },
      { property: "og:description", content: "Director portal for Meridian Holdings Limited board members." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireDirector>
      <DirectorMeetings />
    </RequireDirector>
  ),
});
