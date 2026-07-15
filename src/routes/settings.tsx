import { createFileRoute } from "@tanstack/react-router";
import PlaceholderPage from "@/features/bolt/pages/PlaceholderPage";

export const Route = createFileRoute("/settings")({
  component: () => <PlaceholderPage title="Settings" />,
});
