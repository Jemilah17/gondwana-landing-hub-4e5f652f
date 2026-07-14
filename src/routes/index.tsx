import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="page">
      <div className="topbar">
        <div>
          <div className="topbar-title">Dashboard</div>
          <div className="topbar-sub">
            Governance overview for Gondwana Holdings Limited
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="placeholder-card">
          <p>Welcome to the Gondwana Holdings governance dashboard.</p>
          <p className="muted">
            Navigate to <strong>Minutes</strong> under Management to manage
            meeting minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
