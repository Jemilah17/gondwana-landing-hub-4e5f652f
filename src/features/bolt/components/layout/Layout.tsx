import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import NotificationBanner from './NotificationBanner';
import DirectorSidebar from './DirectorSidebar';
import DirectorBanner from './DirectorBanner';
import { useUser } from '../../contexts/UserContext';

export default function Layout({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const isDirector = activeUser.type === 'director';

  return (
    <div className="min-h-screen bg-background font-inter">
      {isDirector ? <DirectorSidebar /> : <Sidebar />}
      <div className="ml-[180px]">
        {isDirector ? <DirectorBanner /> : <NotificationBanner />}
        <main className="min-h-[calc(100vh-40px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
