import { createFileRoute } from "@tanstack/react-router";
import Alerts from "@/features/bolt/pages/Alerts";

export const Route = createFileRoute("/alerts")({
  component: Alerts,
});
