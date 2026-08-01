import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import {
  Home, Building2, FileText, Book, Calendar, Folder, Shield,
  AlertCircle, Clock, Bell, Users, AlertTriangle, FileCheck,
  Scale, FileSearch, Users as UsersIcon, BarChart3, Settings,
  History, DollarSign
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { users } from '../../data/users';
import { useState } from 'react';

const navSections = [
  {
    label: 'Management',
    items: [
      { to: '/dashboard', icon: Home, label: 'Dashboard' },
      { to: '/entities', icon: Building2, label: 'Entities', badge: 33 },
      { to: '/filings', icon: FileText, label: 'Filings', badge: 7 },
      { to: '/registers', icon: Book, label: 'Registers' },
      { to: '/calendar', icon: Calendar, label: 'Board calendar' },
      { to: '/minutes', icon: FileText, label: 'Minutes' },
    ],
  },
  {
    label: 'Compliance',
    items: [
      { to: '/sanctions', icon: Shield, label: 'Sanctions', alert: true },
      { to: '/aml-kyc', icon: AlertCircle, label: 'AML / KYC' },
      { to: '/deadlines', icon: Clock, label: 'Deadlines' },
      { to: '/alerts', icon: Bell, label: 'Alerts', badge: 5 },
    ],
  },
  {
    label: 'Governance',
    items: [
      { to: '/governance', icon: Users, label: 'Governance', badge: 8 },
      { to: '/risk', icon: AlertTriangle, label: 'Risk register' },
      { to: '/policies', icon: FileText, label: 'Policy register' },
      { to: '/stakeholders', icon: UsersIcon, label: 'Stakeholder register' },
      { to: '/remuneration', icon: DollarSign, label: 'Remuneration' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { to: '/agreements', icon: FileSearch, label: 'Agreements register' },
      { to: '/legal', icon: Scale, label: 'Legal matters' },
      { to: '/insurance', icon: Shield, label: 'Insurance' },
    ],
  },
  {
    label: 'Reporting',
    items: [
      { to: '/esg', icon: BarChart3, label: 'ESG tracker' },
      { to: '/audit-trail', icon: History, label: 'Audit trail' },
      { to: '/documents', icon: Folder, label: 'Documents' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar() {
  const { activeUser, setActiveUserById } = useUser();
  const [expanded] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <aside className={`fixed left-0 top-0 bottom-0 bg-primary z-40 flex flex-col ${expanded ? 'w-[180px]' : 'w-16'} transition-all duration-300`}>
      {/* Logo block */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-[26px] h-[26px] bg-orange rounded flex items-center justify-center text-white text-sm font-medium">
          G
        </div>
        {expanded && (
          <div>
            <div className="text-white text-[13px] font-medium">Gondwana</div>
            <div className="text-white/40 text-[10px]">Collection Namibia</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {expanded && (
              <div className="px-4 mb-1 text-[9px] text-white/40 uppercase tracking-wider">
                {section.label}
              </div>
            )}
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded ${
                  pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to))
                    ? 'bg-orange text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {expanded && (
                  <>
                    <span className="text-[12px] flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-white/20 text-white text-[10px] px-1.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.alert && (
                      <span className="w-2 h-2 bg-red rounded-full" />
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* User switcher */}
      <div className="border-t border-white/10 p-2">
        {expanded && (
          <div className="text-[9px] text-white/40 uppercase px-2 mb-2">Active session</div>
        )}
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setActiveUserById(user.id)}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded text-left ${
              activeUser.id === user.id
                ? 'bg-white/10'
                : 'hover:bg-white/5'
            }`}
          >
            <div
              className={`w-7 h-7 ${user.avatarColor} rounded-full flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0`}
            >
              {user.initials}
            </div>
            {expanded && (
              <div className="flex-1 min-w-0">
                <div className="text-white text-[11px] font-medium truncate">{user.name}</div>
                <div className="text-white/50 text-[10px] truncate">{user.role}</div>
              </div>
            )}
          </button>
        ))}
        <button
          onClick={() => {
            setActiveUserById(users[0].id);
            navigate({ to: '/sign-in' });
          }}
          className="w-full flex items-center gap-2 px-2 py-2 mt-1 rounded text-left text-white/55 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {expanded && <span className="text-[12px]">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
