import { createFileRoute } from "@tanstack/react-router";
import Minutes from "@/features/bolt/pages/Minutes";

export const Route = createFileRoute("/minutes")({
  component: Minutes,
});