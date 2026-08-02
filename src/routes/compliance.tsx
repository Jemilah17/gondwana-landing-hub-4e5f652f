import { createFileRoute } from "@tanstack/react-router";
import Sanctions from "@/features/bolt/pages/Sanctions";

export const Route = createFileRoute("/compliance")({
  component: Sanctions,
});
