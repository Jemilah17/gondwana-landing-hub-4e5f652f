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
  // Consultants have no pages yet — bounce to sign-in rather than into the
  // director portal, which would redirect straight back (redirect loop).
  const awayTo = activeUser.type === 'consultant' ? '/sign-in' : '/director-dashboard';

  useEffect(() => {
    if (!ok) navigate({ to: awayTo, replace: true });
  }, [ok, awayTo, navigate]);

  if (!ok) return null;
  return <>{children}</>;
}

export function RequireDirector({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const ok = activeUser.type === 'director';
  const awayTo = activeUser.type === 'consultant' ? '/sign-in' : '/dashboard';

  useEffect(() => {
    if (!ok) navigate({ to: awayTo, replace: true });
  }, [ok, awayTo, navigate]);

  if (!ok) return null;
  return <>{children}</>;
}

export function RequireConsultant({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const ok = activeUser.type === 'consultant';

  useEffect(() => {
    if (!ok) navigate({ to: '/dashboard', replace: true });
  }, [ok, navigate]);

  if (!ok) return null;
  return <>{children}</>;
}
