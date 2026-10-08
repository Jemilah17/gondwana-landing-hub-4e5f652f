import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Shield, Briefcase, Building2, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

type Level = 'secretariat' | 'director' | 'consultant';

interface Person {
  id: string;
  name: string;
  role: string;
  initials: string;
  bg: string;
  fg: string;
}

const secretariat: Person[] = [
  { id: 'alex', name: 'Alex Reyes', role: 'Group Company Secretary', initials: 'AR', bg: '#FBF0EA', fg: '#D4652A' },
  { id: 'jordan', name: 'Jordan Lee', role: 'Assistant CoSec — Clusters C & D', initials: 'JL', bg: '#EAF5EE', fg: '#2D7A4F' },
  { id: 'taylor', name: 'Taylor Morgan', role: 'Assistant CoSec — Clusters B & E · Incoming', initials: 'TM', bg: '#E8F1FB', fg: '#1A5FA5' },
];

const directors: Person[] = [
  { id: 'riley', name: 'Riley Chen', role: 'Chairperson', initials: 'RC', bg: '#FBF3E3', fg: '#9A6E1A' },
  { id: 'morgan', name: 'Morgan Reed', role: 'Managing Director', initials: 'MR', bg: '#E8F1FB', fg: '#1A5FA5' },
  { id: 'casey', name: 'Casey Brooks', role: 'Audit Risk & Opp Cttee', initials: 'CB', bg: '#EAF5EE', fg: '#2D7A4F' },
  { id: 'avery', name: 'Avery Patel', role: 'Independent NED', initials: 'AP', bg: '#F0EBF8', fg: '#5B3D9A' },
  { id: 'quinn', name: 'Quinn Harper', role: 'Non-Executive Director', initials: 'QH', bg: '#FBF0EA', fg: '#D4652A' },
  { id: 'drew', name: 'Drew Bennett', role: 'Chief Financial Officer', initials: 'DB', bg: '#E1F5EE', fg: '#0F6E56' },
];

const descriptions: Record<Level, string> = {
  secretariat:
    'Full group access to all governance records, statutory registers, compliance filings, and reporting across all 33 Meridian entities.',
  director:
    'Access to your assigned entities, board meeting documents, minutes for review, and RSVP management.',
  consultant:
    'Access to filings assigned to your firm, with handoff status, proof upload, and overdue items across all Meridian entities.',
};

const consultants: Person[] = [
  { id: 'consultant-1', name: 'External CoSec Services', role: 'Company Secretarial Consultant', initials: 'EC', bg: '#EEF1F4', fg: '#4A5560' },
];

export default function SignIn() {
  const navigate = useNavigate();
  const { setActiveUserById } = useUser();
  const [level, setLevel] = useState<Level>('secretariat');
  const [secretarySel, setSecretarySel] = useState('alex');
  const [directorSel, setDirectorSel] = useState('riley');
  const [consultantSel, setConsultantSel] = useState('consultant-1');

  const people =
    level === 'secretariat' ? secretariat : level === 'director' ? directors : consultants;
  const selectedId =
    level === 'secretariat' ? secretarySel : level === 'director' ? directorSel : consultantSel;
  const selected = people.find((p) => p.id === selectedId)!;
  const setSelected =
    level === 'secretariat'
      ? setSecretarySel
      : level === 'director'
        ? setDirectorSel
        : setConsultantSel;

  const handleSignIn = () => {
    setActiveUserById(selectedId);
    navigate({
      to:
        level === 'director'
          ? '/director-dashboard'
          : level === 'consultant'
            ? '/consultant-dashboard'
            : '/dashboard',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#FDFBF7' }}>
      <div
        className="w-full"
        style={{
          maxWidth: 480,
          background: '#FFFFFF',
          border: '0.5px solid #EFECE6',
          borderRadius: 8,
          padding: 32,
        }}
      >
        {/* Logo */}
        <div className="text-center">
          <div style={{ color: '#3D2B1F', fontSize: 22, fontWeight: 500, letterSpacing: '0.18em' }}>MERIDIAN</div>
          <div style={{ color: '#D4652A', fontSize: 12, letterSpacing: '0.22em', marginTop: 2 }}>HOLDINGS LIMITED</div>
          <div style={{ color: '#6B6F68', fontSize: 10, letterSpacing: '0.12em', marginTop: 2 }}>HEAD OFFICE</div>
        </div>

        <div style={{ height: 24 }} />

        {/* Heading */}
        <div className="text-center">
          <div style={{ fontSize: 24, fontWeight: 500, color: '#1C1F1A' }}>Sign in</div>
          <div style={{ fontSize: 13, color: '#6B6F68', marginTop: 4 }}>Select your access level to continue</div>
        </div>

        <div style={{ height: 24 }} />

        {/* Toggle */}
        <div className="flex" style={{ background: '#F5F3EE', borderRadius: 6, padding: 4 }}>
          {([
            { key: 'secretariat' as Level, label: 'Secretariat', Icon: Shield },
            { key: 'director' as Level, label: 'Director', Icon: Briefcase },
            { key: 'consultant' as Level, label: 'Consultant', Icon: Building2 },
          ]).map(({ key, label, Icon }) => {
            const active = level === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setLevel(key)}
                className="flex-1 flex items-center justify-center gap-2 py-2"
                style={{
                  borderRadius: 6,
                  background: active ? '#1C1F1A' : 'transparent',
                  color: active ? '#FFFFFF' : '#6B6F68',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <Icon style={{ width: 14, height: 14 }} />
                {label}
              </button>
            );
          })}
        </div>

        <div style={{ height: 16 }} />

        <p className="text-center" style={{ fontSize: 12, color: '#D4652A', lineHeight: 1.6 }}>
          {descriptions[level]}
        </p>

        <div style={{ height: 16 }} />

        <div style={{ fontSize: 10, color: '#6B6F68', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          {level === 'secretariat'
            ? 'Select administrator'
            : level === 'director'
              ? 'Select director'
              : 'Select consultant'}
        </div>

        <div className="flex flex-col gap-2">
          {people.map((p) => {
            const active = selectedId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className="w-full flex items-center gap-3 text-left"
                style={{
                  padding: 10,
                  borderRadius: 6,
                  background: active ? '#FBF0EA' : '#FFFFFF',
                  border: `0.5px solid ${active ? '#F0C4A8' : '#EFECE6'}`,
                }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 32, height: 32, borderRadius: 9999, background: p.bg, color: p.fg, fontSize: 11, fontWeight: 500 }}
                >
                  {p.initials}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block truncate" style={{ fontSize: 12, fontWeight: 500, color: '#1C1F1A' }}>{p.name}</span>
                  <span className="block truncate" style={{ fontSize: 10, color: '#6B6F68' }}>{p.role}</span>
                </span>
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 14, height: 14, borderRadius: 9999, border: `1px solid ${active ? '#D4652A' : '#D8D4CC'}` }}
                >
                  {active && <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#D4652A' }} />}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ height: 24 }} />

        <button
          type="button"
          onClick={handleSignIn}
          className="w-full flex items-center justify-center gap-2 transition-colors"
          style={{ height: 48, borderRadius: 8, background: '#D4652A', color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#B5531F')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#D4652A')}
        >
          <ArrowRight style={{ width: 16, height: 16 }} />
          Sign in as {selected.name}
        </button>
      </div>

      <div className="text-center" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 10, color: '#6B6F68' }}>Meridian Holdings Limited · Reg. 2017/1055</div>
        <div style={{ fontSize: 10, color: '#6B6F68' }}>Confidential — authorised personnel only</div>
      </div>
    </div>
  );
}
