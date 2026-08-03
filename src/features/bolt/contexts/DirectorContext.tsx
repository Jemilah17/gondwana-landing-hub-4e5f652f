import { createContext, useContext, useState, ReactNode } from 'react';

export type MinutesChoice = 'approve' | 'corrections' | 'comment';
export type RsvpChoice = 'in-person' | 'remote' | 'apologies';

export interface MinutesReview {
  id: string;
  title: string;
  meta: string;
  sentBy: string;
  sentAgo: string;
  respondBy: string;
  status: 'pending' | 'submitted';
  choice?: MinutesChoice;
  note?: string;
}

export interface Rsvp {
  status: 'pending' | 'confirmed';
  choice?: RsvpChoice;
  detail?: string;
}

export interface Declaration {
  id: string;
  name: string;
  description: string;
  due: string;
  status: 'due' | 'submitted';
}

interface DirectorContextType {
  minutes: MinutesReview[];
  submitMinutesResponse: (id: string, choice: MinutesChoice, note: string) => void;
  rsvp: Rsvp;
  setRsvp: (rsvp: Rsvp) => void;
  declarations: Declaration[];
  submitDeclaration: (id: string) => void;
  packDistributed: boolean;
}

const DirectorContext = createContext<DirectorContextType | undefined>(undefined);

export function DirectorProvider({ children }: { children: ReactNode }) {
  const [minutes, setMinutes] = useState<MinutesReview[]>([
    {
      id: 'feb-2026-gm',
      title: 'February 2026 General Meeting',
      meta: '26 February 2026 · Dave Smuts · GM',
      sentBy: 'Fabiola Schrywer',
      sentAgo: '2 days ago',
      respondBy: '26 Jul 2026',
      status: 'pending',
    },
  ]);
  const [rsvp, setRsvp] = useState<Rsvp>({ status: 'pending' });
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: 'coi-2026',
      name: 'Annual conflict of interest declaration',
      description: 'Declaration of interests per King V and the Companies Act',
      due: '31 August 2026',
      status: 'due',
    },
    {
      id: 'bo-2026',
      name: 'Beneficial ownership confirmation',
      description: 'Confirm your beneficial holdings across Gondwana entities',
      due: '15 September 2026',
      status: 'due',
    },
    {
      id: 'fit-proper',
      name: 'Fit and proper attestation',
      description: 'Submitted 12 March 2026',
      due: '12 March 2027',
      status: 'submitted',
    },
  ]);

  const submitMinutesResponse = (id: string, choice: MinutesChoice, note: string) => {
    setMinutes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'submitted', choice, note } : m)),
    );
  };

  const submitDeclaration = (id: string) => {
    setDeclarations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'submitted' } : d)),
    );
  };

  return (
    <DirectorContext.Provider
      value={{
        minutes,
        submitMinutesResponse,
        rsvp,
        setRsvp,
        declarations,
        submitDeclaration,
        packDistributed: true,
      }}
    >
      {children}
    </DirectorContext.Provider>
  );
}

export function useDirector() {
  const ctx = useContext(DirectorContext);
  if (!ctx) throw new Error('useDirector must be used within a DirectorProvider');
  return ctx;
}
