import { createFileRoute } from "@tanstack/react-router";
import RiskRegister from "@/features/bolt/pages/RiskRegister";

export const Route = createFileRoute("/risk")({
  component: RiskRegister,
});
