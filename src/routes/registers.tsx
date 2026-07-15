import { createFileRoute } from "@tanstack/react-router";
import Registers from "@/features/bolt/pages/Registers";

export const Route = createFileRoute("/registers")({
  component: Registers,
});
