import { createFileRoute } from "@tanstack/react-router";
import Remuneration from "@/features/bolt/pages/Remuneration";

export const Route = createFileRoute("/remuneration")({
  component: Remuneration,
});
