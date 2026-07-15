import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const legalMatters = [
  { ref: 'BI-2021-001', entity: 'Gondwana Holdings', type: 'Litigation', counterparty: 'Hollard Insurance', counsel: 'External counsel', opened: '01 Mar 2021', nextAction: 'Court date TBC', exposure: 'Undetermined', status: 'active', lead: 'Hannes Gouws' },
];

const agreements = [
  { ref: 'AGR-001', type: 'Lease', parties: 'Gondwana Holdings / Landlord', entity: 'Gondwana Holdings', effective: '01 Jan 2023', expiry: '31 Dec 2026', notice: '6 months', status: 'active' },
  { ref: 'AGR-002', type: 'Conservation', parties: 'GCN / Ministry', entity: 'Canyon Lodge', effective: '01 Jun 2024', expiry: '31 Aug 2026', notice: '3 months', status: 'expiring soon' },
  { ref: 'AGR-003', type: 'NSX bond', parties: 'GHL / NSX', entity: 'Gondwana Holdings', effective: '01 Mar 2021', expiry: '01 Mar 2026', notice: '6 months', status: 'expiring soon' },
];

export default function LegalMatters() {
  const [selectedMatter, setSelectedMatter] = useState<string | null>(null);

  return (
    <div>
      <Topbar title="Legal matters" />

      <div className="p-6 space-y-6">
        {/* Active matter alert */}
        <div className="bg-orange-tint border border-orange-border rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange flex-shrink-0" />
          <div className="text-[11px] text-primary">
            <strong className="text-orange">1 material legal matter active</strong>
            <span className="text-muted"> — Business Interruption claim v Hollard. Lead: Hannes Gouws. External counsel engaged.</span>
          </div>
        </div>

        {/* Matters table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Ref</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Entity</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Type</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Counterparty</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Counsel</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Opened</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Next action</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Exposure</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {legalMatters.map((m) => (
                <tr
                  key={m.ref}
                  onClick={() => setSelectedMatter(m.ref)}
                  className="hover:bg-background cursor-pointer"
                >
                  <td className="px-4 py-3 text-[11px] text-primary font-medium">{m.ref}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.entity}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.type}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.counterparty}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.counsel}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.opened}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.nextAction}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.exposure}</td>
                  <td className="px-4 py-3"><StatusPill status="active" /></td>
                  <td className="px-4 py-3 text-[11px] text-muted">{m.lead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
