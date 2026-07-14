import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/features/shell/Placeholder";

export const Route = createFileRoute("/calendar")({
  component: () => (
    <Placeholder title="Board calendar" sub="Upcoming board activity" />
  ),
});