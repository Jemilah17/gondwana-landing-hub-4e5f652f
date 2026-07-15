import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/bolt/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
