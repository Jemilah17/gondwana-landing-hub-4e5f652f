import { createFileRoute } from "@tanstack/react-router";
import AgreementsRegister from "@/features/bolt/pages/AgreementsRegister";

export const Route = createFileRoute("/agreements")({
  component: AgreementsRegister,
});
