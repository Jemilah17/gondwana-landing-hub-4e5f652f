import { createFileRoute } from "@tanstack/react-router";
import Filings from "@/features/bolt/pages/Filings";

export const Route = createFileRoute("/filings")({
  component: Filings,
});
