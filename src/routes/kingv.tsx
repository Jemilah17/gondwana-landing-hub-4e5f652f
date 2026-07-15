import { createFileRoute } from "@tanstack/react-router";
import KingVFramework from "@/features/bolt/pages/KingVFramework";

export const Route = createFileRoute("/kingv")({
  component: KingVFramework,
});
