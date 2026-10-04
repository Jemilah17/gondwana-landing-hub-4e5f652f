import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { auditEvents as seedEvents, type AuditEvent } from '../data/governance';

/**
 * STOPGAP PERSISTENCE — added events are mirrored to localStorage (per-browser).
 * Move to a shared Lovable Cloud table for a real team-wide, tamper-evident audit log.
 */
const STORAGE_KEY = 'gondwana.audit.v1';

interface AuditTrailContextType {
  events: AuditEvent[];
  addEvent: (event: Omit<AuditEvent, 'id' | 'timestamp'>) => void;
}

const AuditTrailContext = createContext<AuditTrailContextType | null>(null);

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

export function AuditTrailProvider({ children }: { children: ReactNode }) {
  const [added, setAdded] = useState<AuditEvent[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAdded(JSON.parse(raw) as AuditEvent[]);
    } catch { /* ignore */ }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(added)); } catch { /* ignore */ }
  }, [added]);

  const addEvent = useCallback((event: Omit<AuditEvent, 'id' | 'timestamp'>) => {
    const now = new Date();
    setAdded(prev => [{ ...event, id: `AT-${now.getTime().toString(36).toUpperCase()}`, timestamp: stamp(now), createdAt: now.toISOString() } as AuditEvent, ...prev]);
  }, []);

  return (
    <AuditTrailContext.Provider value={{ events: [...added, ...seedEvents], addEvent }}>
      {children}
    </AuditTrailContext.Provider>
  );
}

export function useAuditTrail() {
  const ctx = useContext(AuditTrailContext);
  if (!ctx) throw new Error('useAuditTrail must be used within an AuditTrailProvider');
  return ctx;
}
