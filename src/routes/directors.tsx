import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/features/shell/Placeholder";

export const Route = createFileRoute("/directors")({
  component: () => <Placeholder title="Directors" sub="Director register" />,
});