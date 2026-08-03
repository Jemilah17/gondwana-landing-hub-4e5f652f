import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { Home, Building2, FileText, Calendar, FileCheck, LogOut, ArrowLeft } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useDirector } from '../../contexts/DirectorContext';
import { users } from '../../data/users';

export default function DirectorSidebar() {
  const { activeUser, setActiveUserById } = useUser();
  const { minutes, rsvp } = useDirector();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const pendingMinutes = minutes.filter((m) => m.status === 'pending').length;
  const pendingRsvp = rsvp.status === 'pending' ? 1 : 0;

  const items = [
    { to: '/director-dashboard', icon: Home, label: 'My dashboard', badge: 0 },
    { to: '/director-entities', icon: Building2, label: 'My entities', badge: 0 },
    { to: '/director-minutes', icon: FileText, label: 'Minutes for review', badge: pendingMinutes },
    { to: '/director-meetings', icon: Calendar, label: 'Board meetings', badge: pendingRsvp },
    { to: '/director-declarations', icon: FileCheck, label: 'My declarations', badge: 0 },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[180px] bg-primary z-40 flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="w-[26px] h-[26px] bg-orange rounded flex items-center justify-center text-white text-sm font-medium">
          G
        </div>
        <div>
          <div className="text-white text-[13px] font-medium">Gondwana</div>
          <div className="text-white/40 text-[10px]">Collection Namibia</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-1 text-[9px] text-white/40 uppercase tracking-wider">Director portal</div>
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-4 py-2 mx-2 rounded ${
              pathname === item.to
                ? 'bg-orange text-white'
                : 'text-white/55 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-[12px] flex-1">{item.label}</span>
            {item.badge > 0 && (
              <span className="bg-white/20 text-white text-[10px] px-1.5 rounded">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className={`w-7 h-7 ${activeUser.avatarColor} rounded-full flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0`}>
            {activeUser.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[11px] font-medium truncate">{activeUser.name}</div>
            <div className="text-white/50 text-[10px] truncate">{activeUser.role}</div>
          </div>
        </div>
        <button
          onClick={() => navigate({ to: '/sign-in' })}
          className="w-full flex items-center gap-2 px-2 py-2 rounded text-left text-white/55 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span className="text-[12px]">Switch to CoSec view</span>
        </button>
        <button
          onClick={() => {
            setActiveUserById(users[0].id);
            navigate({ to: '/sign-in' });
          }}
          className="w-full flex items-center gap-2 px-2 py-2 rounded text-left text-white/55 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="text-[12px]">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
