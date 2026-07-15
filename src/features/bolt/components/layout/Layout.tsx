import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationBanner from './NotificationBanner';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Sidebar />
      <div className="ml-[180px]">
        <NotificationBanner />
        <main className="min-h-[calc(100vh-40px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
