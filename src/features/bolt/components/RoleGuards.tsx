import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '../contexts/UserContext';

export function RequireDirector({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const ok = activeUser.type === 'director';

  useEffect(() => {
    if (!ok) navigate({ to: '/dashboard', replace: true });
  }, [ok, navigate]);

  if (!ok) return null;
  return <>{children}</>;
}

export function RequireCoSec({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const ok = activeUser.type === 'cosec';

  useEffect(() => {
    if (!ok) navigate({ to: '/director-dashboard', replace: true });
  }, [ok, navigate]);

  if (!ok) return null;
  return <>{children}</>;
}
