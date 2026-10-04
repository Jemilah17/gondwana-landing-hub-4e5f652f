import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useAuditTrail } from './AuditTrailContext';
import { useUser } from './UserContext';
import { entities } from '../data/entities';
import { filings as seedFilings, type Filing } from '../data/filings';

/**
 * STOPGAP PERSISTENCE — localStorage only.
 *
 * Handoff tracking (consultant assignment, handoff stage, proof receipts) is
 * stored in this React Context and mirrored to localStorage. That survives
 * navigation and refreshes, but it is per-browser: changes made by Fabiola
 * will NOT appear for Jemilah or Hilma.
 *
 * RECOMMENDATION: enable Supabase (Lovable Cloud, the native integration) and
 * move filings into a table with RLS policies so the whole team shares one
 * source of truth. The shape of this context is intentionally close to a
 * table row so the swap is mostly mechanical.
 */

export interface FilingsContextType {
  filings: Filing[];
  /** Hand the filing to the external consultant (marks the handoff date). */
  handOff: (filingId: string) => void;
  /** Consultant reports the filing is done, pending proof of filing. */
  markFiledAwaitingProof: (filingId: string) => void;
  /** CoSec confirms filing with the proof receipt — the filing is closed out. */
  confirmFiled: (filingId: string, receiptNumber: string, filedDate: string) => void;
  /** Filings overdue at a consultant that have not been confirmed as filed. */
  overdueUnconfirmed: Filing[];
}

const STORAGE_KEY = 'gondwana.filings.v1';

const FilingsContext = createContext<FilingsContextType | null>(null);

function readStore(): Record<string, Partial<Filing>> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Partial<Filing>>) : {};
  } catch {
    return {};
  }
}

function writeStore(rows: Filing[]) {
  if (typeof window === 'undefined') return;
  try {
    const store: Record<string, Partial<Filing>> = {};
    for (const f of rows) store[f.id] = f;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota or private mode — changes simply are not persisted */
  }
}

const today = () => new Date().toISOString().slice(0, 10);

// Persisted edits win over seed data; seed rows still appear if never edited.
const hydrate = (): Filing[] => {
  const store = readStore();
  return seedFilings.map(f => (store[f.id] ? { ...f, ...store[f.id] } : f));
};

export function FilingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Filing[]>(() => seedFilings);
  const hydrated = useRef(false);
  const { addEvent } = useAuditTrail();
  const { activeUser } = useUser();
  const stateRef = useRef(state);
  stateRef.current = state;
  const log = (filingId: string, action: (f: Filing) => string) => {
    const f = stateRef.current.find(x => x.id === filingId);
    if (!f) return;
    addEvent({
      actor: activeUser.name,
      entity: f.entityName,
      action: action(f),
      type: 'Filing',
      severity: 'info',
      cluster: f.cluster ?? entities.find(e => e.name === f.entityName)?.cluster ?? '—',
    });
  };

  // Hydrate after mount (SSR-safe): overlay saved edits onto the seed data.
  useEffect(() => {
    setState(hydrate());
    hydrated.current = true;
  }, []);

  // Autosave every change once hydrated.
  useEffect(() => {
    if (!hydrated.current) return;
    writeStore(state);
  }, [state]);

  const handOff = useCallback((filingId: string) => {
    log(filingId, f => `${f.entityName} ${f.type} handed to consultant`);
    setState(prev => prev.map(f =>
      f.id === filingId
        ? { ...f, assignedTo: 'consultant', handoffStage: 'handed_to_consultant', handedOffDate: today() }
        : f,
    ));
  }, [addEvent, activeUser]);

  const markFiledAwaitingProof = useCallback((filingId: string) => {
    setState(prev => prev.map(f =>
      f.id === filingId
        ? { ...f, handoffStage: 'filed_awaiting_proof' }
        : f,
    ));
  }, []);

  const confirmFiled = useCallback((filingId: string, receiptNumber: string, filedDate: string) => {
    log(filingId, f => `${f.entityName} ${f.type} confirmed filed · receipt ${receiptNumber}`);
    setState(prev => prev.map(f =>
      f.id === filingId
        ? {
            ...f,
            status: 'filed',
            filedDate,
            receiptNumber,
            proofReceiptNumber: receiptNumber,
            handoffStage: 'confirmed_filed',
          }
        : f,
    ));
  }, [addEvent, activeUser]);

  const overdueUnconfirmed = state.filter(f => f.handoffStage === 'overdue_unconfirmed');

  return (
    <FilingsContext.Provider value={{ filings: state, handOff, markFiledAwaitingProof, confirmFiled, overdueUnconfirmed }}>
      {children}
    </FilingsContext.Provider>
  );
}

export function useFilings() {
  const ctx = useContext(FilingsContext);
  if (!ctx) throw new Error('useFilings must be used within a FilingsProvider');
  return ctx;
}
