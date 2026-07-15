import { createFileRoute } from "@tanstack/react-router";
import Governance from "@/features/bolt/pages/Governance";

export const Route = createFileRoute("/governance")({
  component: Governance,
});
