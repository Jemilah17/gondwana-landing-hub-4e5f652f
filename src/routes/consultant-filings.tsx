import { createFileRoute } from "@tanstack/react-router";
import ConsultantFilings from "@/features/bolt/pages/ConsultantFilings";
import { RequireConsultant } from "@/features/bolt/components/RoleGuards";

export const Route = createFileRoute("/consultant-filings")({
  head: () => ({
    meta: [
      { title: "My filings — Gondwana Holdings Governance" },
      { name: "description", content: "Filings assigned to the company secretarial consultant — mark filed and upload proof of filing." },
      { property: "og:title", content: "My filings — Gondwana Holdings Governance" },
      { property: "og:description", content: "Filings assigned to the company secretarial consultant — mark filed and upload proof of filing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireConsultant>
      <ConsultantFilings />
    </RequireConsultant>
  ),
});
