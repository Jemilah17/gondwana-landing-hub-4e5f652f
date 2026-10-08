import { createFileRoute } from "@tanstack/react-router";
import ConsultantDashboard from "@/features/bolt/pages/ConsultantDashboard";
import { RequireConsultant } from "@/features/bolt/components/RoleGuards";

export const Route = createFileRoute("/consultant-dashboard")({
  head: () => ({
    meta: [
      { title: "Consultant portal — Meridian Holdings Governance" },
      { name: "description", content: "Consultant portal for Meridian Holdings Limited — assigned filings, handoff status and overdue items." },
      { property: "og:title", content: "Consultant portal — Meridian Holdings Governance" },
      { property: "og:description", content: "Assigned filings, handoff status and overdue items for the company secretarial consultant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireConsultant>
      <ConsultantDashboard />
    </RequireConsultant>
  ),
});
