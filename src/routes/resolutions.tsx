import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/features/shell/Placeholder";

export const Route = createFileRoute("/resolutions")({
  component: () => (
    <Placeholder title="Resolutions" sub="Board and shareholder resolutions" />
  ),
});