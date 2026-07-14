import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/features/shell/Placeholder";

export const Route = createFileRoute("/settings")({
  component: () => (
    <Placeholder title="Settings" sub="Workspace configuration" />
  ),
});