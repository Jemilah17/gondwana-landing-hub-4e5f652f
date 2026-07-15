import { createFileRoute } from "@tanstack/react-router";
import AuditTrail from "@/features/bolt/pages/AuditTrail";

export const Route = createFileRoute("/audit-trail")({
  component: AuditTrail,
});
