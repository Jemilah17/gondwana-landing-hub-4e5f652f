import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Calendar,
  ShieldCheck,
  Settings,
  ChevronRight,
} from "lucide-react";

import "@/features/shell/tokens.css";
import "@/features/shell/shell.css";

type NavItem = {
  to: string;
  icon: typeof LayoutDashboard;
  label: string;
};

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ to: "/", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    title: "Management",
    items: [
      { to: "/entities", icon: Building2, label: "Entities" },
      { to: "/directors", icon: Users, label: "Directors" },
      { to: "/calendar", icon: Calendar, label: "Board calendar" },
      { to: "/minutes", icon: FileText, label: "Minutes" },
    ],
  },
  {
    title: "Compliance",
    items: [{ to: "/resolutions", icon: ShieldCheck, label: "Resolutions" }],
  },
  {
    title: "System",
    items: [{ to: "/settings", icon: Settings, label: "Settings" }],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">G</div>
        <div>
          <div className="sidebar-brand-title">Gondwana</div>
          <div className="sidebar-brand-sub">Governance</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.title} className="sidebar-section">
            <div className="sidebar-section-title">{section.title}</div>
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to as string}
                className={
                  "sidebar-item" +
                  (isActive(item.to) ? " sidebar-item-active" : "")
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                <ChevronRight size={14} className="sidebar-item-chevron" />
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">FS</div>
          <div>
            <div className="sidebar-user-name">Fabiola Schrywer</div>
            <div className="sidebar-user-role">Company Secretary</div>
          </div>
        </div>
      </div>
    </aside>
  );
}