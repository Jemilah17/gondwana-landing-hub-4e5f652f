import { createFileRoute } from "@tanstack/react-router";
import StakeholderRegister from "@/features/bolt/pages/StakeholderRegister";

export const Route = createFileRoute("/stakeholders")({
  component: StakeholderRegister,
});
