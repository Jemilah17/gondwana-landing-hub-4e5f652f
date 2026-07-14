export function Placeholder({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="page">
      <div className="topbar">
        <div>
          <div className="topbar-title">{title}</div>
          <div className="topbar-sub">{sub}</div>
        </div>
      </div>
      <div className="page-body">
        <div className="placeholder-card">
          <p>This section is coming soon.</p>
          <p className="muted">Module under construction.</p>
        </div>
      </div>
    </div>
  );
}