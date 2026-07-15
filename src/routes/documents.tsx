import { createFileRoute } from "@tanstack/react-router";
import Documents from "@/features/bolt/pages/Documents";

export const Route = createFileRoute("/documents")({
  component: Documents,
});
