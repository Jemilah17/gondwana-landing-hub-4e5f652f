import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { DollarSign } from 'lucide-react';

const directorsFees = [
  { director: 'Riley Chen', role: 'Chairperson', boardFee: '$10,000', committeeFee: '$5,000', meetings: 8, totalYtd: '$80,000' },
  { director: 'Morgan Reed', role: 'MD', boardFee: '$10,000', committeeFee: '$5,000', meetings: 10, totalYtd: '$100,000' },
  { director: 'Casey Brooks', role: 'AROC Chair', boardFee: '$10,000', committeeFee: '$5,000', meetings: 12, totalYtd: '$120,000' },
  { director: 'Avery Patel', role: 'People Chair', boardFee: '$10,000', committeeFee: '$5,000', meetings: 9, totalYtd: '$90,000' },
  { director: 'Quinn Harper', role: 'NED', boardFee: '$10,000', committeeFee: '$5,000', meetings: 7, totalYtd: '$70,000' },
  { director: 'Drew Bennett', role: 'CFO', boardFee: '$10,000', committeeFee: '$5,000', meetings: 9, totalYtd: '$90,000' },
];

export default function Remuneration() {
  return (
    <div>
      <Topbar title="Remuneration governance" />

      <div className="p-6 space-y-6">
        {/* Policy card */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-tint rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-[12px] font-medium text-primary">Directors remuneration policy</h3>
              <p className="text-[11px] text-muted mt-1">Approved by Board Resolution OR-2022-004</p>
            </div>
            <StatusPill status="current" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-background rounded-lg p-3">
              <span className="text-[10px] text-muted">Version</span>
              <p className="text-[12px] text-primary">v2.0</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <span className="text-[10px] text-muted">Approval date</span>
              <p className="text-[12px] text-primary">2 Jun 2022</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <span className="text-[10px] text-muted">Next advisory vote</span>
              <p className="text-[12px] text-primary">AGM 2026</p>
            </div>
          </div>
        </div>

        {/* Directors fees table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-background">
            <h3 className="text-[12px] font-medium text-primary">Directors fees structure</h3>
            <p className="text-[11px] text-muted mt-1">Per meeting fees as per OR-2022-004</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Director</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Role</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Board fee</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Committee fee</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Meetings YTD</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Total YTD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {directorsFees.map((d, idx) => (
                <tr key={idx} className="hover:bg-background">
                  <td className="px-4 py-3 text-[11px] text-primary font-medium">{d.director}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{d.role}</td>
                  <td className="px-4 py-3 text-[11px] text-primary">{d.boardFee}</td>
                  <td className="px-4 py-3 text-[11px] text-primary">{d.committeeFee}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{d.meetings}</td>
                  <td className="px-4 py-3 text-[11px] text-primary font-medium">{d.totalYtd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advisory shareholder vote tracker */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-[12px] font-medium text-primary mb-3">Advisory shareholder vote tracker</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-muted">Next AGM</span>
              <p className="text-[12px] text-primary">June 2027</p>
            </div>
            <div>
              <span className="text-[10px] text-muted">Planned vote</span>
              <p className="text-[12px] text-primary">Advisory — Remuneration policy</p>
            </div>
          </div>
        </div>

        {/* Fee waiver history */}
        <div className="bg-amber-tint border border-amber/30 rounded-lg p-4">
          <h4 className="text-[11px] font-medium text-amber mb-2">Fee waiver history</h4>
          <p className="text-[11px] text-muted">Directors fees waived April 2020 – June 2022 during COVID-19 pandemic.</p>
        </div>
      </div>
    </div>
  );
}
