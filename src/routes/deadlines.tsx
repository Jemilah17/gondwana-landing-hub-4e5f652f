import { createFileRoute } from "@tanstack/react-router";
import Deadlines from "@/features/bolt/pages/Deadlines";

export const Route = createFileRoute("/deadlines")({
  component: Deadlines,
});
