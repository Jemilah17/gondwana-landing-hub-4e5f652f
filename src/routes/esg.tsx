import { createFileRoute } from "@tanstack/react-router";
import ESGTracker from "@/features/bolt/pages/ESGTracker";

export const Route = createFileRoute("/esg")({
  component: ESGTracker,
});
