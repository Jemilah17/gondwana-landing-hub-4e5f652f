import { createFileRoute } from "@tanstack/react-router";
import LegalMatters from "@/features/bolt/pages/LegalMatters";

export const Route = createFileRoute("/legal")({
  component: LegalMatters,
});
