import { createFileRoute } from "@tanstack/react-router";
import PlaceholderPage from "@/features/bolt/pages/PlaceholderPage";

export const Route = createFileRoute("/aml-kyc")({
  component: () => <PlaceholderPage title="Aml kyc" />,
});
