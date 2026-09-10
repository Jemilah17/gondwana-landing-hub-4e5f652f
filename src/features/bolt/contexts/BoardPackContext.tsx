import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * STOPGAP PERSISTENCE — localStorage only.
 *
 * Board pack progress (uploaded documents, chosen template, recipients, note,
 * compiled/distributed flags) is stored in this React Context and mirrored to
 * localStorage, keyed by pack ID. That survives navigating away and page
 * refreshes, but it is per-browser: work saved by Fabiola will NOT appear for
 * Jemilah or Hilma, and it is lost if the browser storage is cleared.
 *
 * RECOMMENDATION: enable Supabase (Lovable Cloud, the native integration) and
 * move board packs into a `board_packs` / `board_pack_documents` table with
 * file uploads in Storage. That gives real multi-user persistence, an audit
 * trail, and shared state across the CoSec team. The shape of this context is
 * intentionally close to a table row so the swap is mostly mechanical.
 *
 * Note: uploaded File objects themselves cannot be serialised to localStorage,
 * so only file names survive a refresh — another reason to move to Storage.
 */

export interface DocRow {
  id: number;
  name: string;
  description: string;
  optional?: boolean;
  file?: string;
  blob?: File;
}

export interface BoardPackRecord {
  id: string;
  meeting: string;
  date: string;
  time: string;
  venue: string;
  entity: string;
  chairperson: string;
  template: string;
}

export interface BoardPackState {
  pack: BoardPackRecord;
  docs: DocRow[];
  recipients: string[];
  note: string;
  compiled: boolean;
  distributed: string | null;
  savedAt: string | null;
}

interface BoardPackContextValue {
  state: BoardPackState;
  /** Patch the active pack's working state (kept in memory, mirrored to localStorage). */
  update: (patch: Partial<Omit<BoardPackState, 'pack'>> | ((prev: BoardPackState) => Partial<Omit<BoardPackState, 'pack'>>)) => void;
  /** Replace the active pack with a fresh one and reset its working state. */
  startPack: (pack: BoardPackRecord, docs: DocRow[], recipients: string[]) => void;
  /** Explicit "Save progress" — writes now and stamps savedAt. Returns the stamp. */
  saveProgress: () => string;
}

const STORAGE_KEY = 'gondwana.boardPacks.v1';

const BoardPackContext = createContext<BoardPackContextValue | null>(null);

// localStorage cannot hold File objects — strip them before writing.
const serialise = (state: BoardPackState) => ({
  ...state,
  docs: state.docs.map(({ blob: _blob, ...d }) => d),
});

function readStore(): Record<string, BoardPackState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, BoardPackState>) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, BoardPackState>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota or private mode — progress simply is not persisted */
  }
}

export function BoardPackProvider({
  initialState,
  children,
}: {
  initialState: BoardPackState;
  children: ReactNode;
}) {
  const [state, setState] = useState<BoardPackState>(initialState);
  const hydrated = useRef(false);

  // Hydrate after mount (SSR-safe): restore the saved snapshot for this pack ID.
  useEffect(() => {
    const saved = readStore()[initialState.pack.id];
    if (saved) setState({ ...saved, pack: { ...initialState.pack, ...saved.pack } });
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave every change once hydrated, so navigating away never loses work.
  useEffect(() => {
    if (!hydrated.current) return;
    const store = readStore();
    store[state.pack.id] = serialise(state);
    writeStore(store);
  }, [state]);

  const update = useCallback<BoardPackContextValue['update']>((patch) => {
    setState(prev => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  }, []);

  const startPack = useCallback<BoardPackContextValue['startPack']>((pack, docs, recipients) => {
    setState({ pack, docs, recipients, note: '', compiled: false, distributed: null, savedAt: null });
  }, []);

  const saveProgress = useCallback(() => {
    const stamp = new Date().toISOString();
    setState(prev => {
      const next = { ...prev, savedAt: stamp };
      const store = readStore();
      store[next.pack.id] = serialise(next);
      writeStore(store);
      return next;
    });
    return stamp;
  }, []);

  return (
    <BoardPackContext.Provider value={{ state, update, startPack, saveProgress }}>
      {children}
    </BoardPackContext.Provider>
  );
}

export function useBoardPack() {
  const ctx = useContext(BoardPackContext);
  if (!ctx) throw new Error('useBoardPack must be used within a BoardPackProvider');
  return ctx;
}
