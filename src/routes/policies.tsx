import { createFileRoute } from "@tanstack/react-router";
import PolicyRegister from "@/features/bolt/pages/PolicyRegister";

export const Route = createFileRoute("/policies")({
  component: PolicyRegister,
});
