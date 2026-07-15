import { createFileRoute } from "@tanstack/react-router";
import Entities from "@/features/bolt/pages/Entities";

export const Route = createFileRoute("/entities")({
  component: Entities,
});
