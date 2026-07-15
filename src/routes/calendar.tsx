import { createFileRoute } from "@tanstack/react-router";
import Calendar from "@/features/bolt/pages/Calendar";

export const Route = createFileRoute("/calendar")({
  component: Calendar,
});
