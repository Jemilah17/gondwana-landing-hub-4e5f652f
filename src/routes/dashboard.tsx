import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/bolt/pages/Dashboard";
import { RequireCoSec } from "@/features/bolt/components/RoleGuards";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <RequireCoSec>
      <Dashboard />
    </RequireCoSec>
  ),
});
