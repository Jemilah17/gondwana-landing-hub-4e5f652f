import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { AlertTriangle } from 'lucide-react';

const screeningResults = [
  { entity: 'Gondwana Holdings', date: '25 Jun 2026', database: 'FIC', result: 'clear' },
  { entity: 'Canyon Lodge', date: '25 Jun 2026', database: 'UN', result: 'flag', flagged: true },
  { entity: 'Gondwana Travel Centre', date: '25 Jun 2026', database: 'OFAC', result: 'flag', flagged: true },
  { entity: 'Swakopmund Guesthouse', date: '25 Jun 2026', database: 'PEP', result: 'flag', flagged: true },
  { entity: 'Namib Desert Lodge', date: '25 Jun 2026', database: 'UN', result: 'clear' },
];

const escalationSteps = [
  { step: 1, title: 'Initial flag detected', detail: 'Automated screening', status: 'done' },
  { step: 2, title: 'CoSec preliminary review', detail: 'Fabiola confirmed match', status: 'done' },
  { step: 3, title: 'MLCO referral', detail: 'EDD package being compiled', status: 'active' },
  { step: 4, title: 'STR submission to FIC', detail: 'Pending', status: 'pending' },
  { step: 5, title: 'Board notification', detail: 'Pending resolution', status: 'pending' },
  { step: 6, title: 'Regulatory close-out', detail: 'Record retention', status: 'pending' },
];

export default function Sanctions() {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <div>
      <Topbar title="Sanctions screening" />

      <div className="p-6">
        {/* Critical alert */}
        <div className="bg-red-tint border border-red/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red flex-shrink-0" />
          <div>
            <strong className="text-red text-[12px]">3 active flags requiring review</strong>
            <p className="text-[11px] text-muted mt-1">
              UN Consolidated List match, OFAC SDN partial match, PEP exposure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Screening results */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border bg-background">
                <h3 className="text-[12px] font-medium text-primary">FIC Namibia & UN screening</h3>
              </div>
              <div className="divide-y divide-border">
                {screeningResults.filter(s => ['FIC', 'UN'].includes(s.database)).map((s, idx) => (
                  <div key={idx} className={`px-4 py-3 flex items-center justify-between ${s.flagged ? 'bg-orange-tint' : ''}`}>
                    <div>
                      <div className="text-[11px] text-primary">{s.entity}</div>
                      <div className="text-[10px] text-muted">{s.date} · {s.database}</div>
                    </div>
                    <StatusPill status={s.result === 'clear' ? 'filed' : 'overdue'} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border bg-background">
                <h3 className="text-[12px] font-medium text-primary">OFAC SDN & PEP screening</h3>
              </div>
              <div className="divide-y divide-border">
                {screeningResults.filter(s => ['OFAC', 'PEP'].includes(s.database)).map((s, idx) => (
                  <div key={idx} className={`px-4 py-3 flex items-center justify-between ${s.flagged ? 'bg-orange-tint' : ''}`}>
                    <div>
                      <div className="text-[11px] text-primary">{s.entity}</div>
                      <div className="text-[10px] text-muted">{s.date} · {s.database}</div>
                    </div>
                    <StatusPill status={s.result === 'clear' ? 'filed' : 'overdue'} />
                  </div>
                ))}
              </div>
            </div>

            {/* Flags detail */}
            <div className="bg-red-tint border border-red/30 rounded-lg p-4">
              <h4 className="text-[11px] font-medium text-red mb-2">Flags detail</h4>
              <div className="space-y-2 text-[10px] text-primary">
                <div><span className="text-red font-medium">1.</span> Director name match — UN Consolidated List · Canyon Lodge</div>
                <div><span className="text-red font-medium">2.</span> Beneficial owner — OFAC SDN partial match · Gondwana Travel Centre</div>
                <div><span className="text-red font-medium">3.</span> PEP exposure — associate · Swakopmund Guesthouse</div>
              </div>
            </div>
          </div>

          {/* Right column - Escalation path */}
          <div className="bg-card border border-border rounded-lg">
            <div className="px-4 py-3 border-b border-border bg-background">
              <h3 className="text-[12px] font-medium text-primary">Escalation path (FIC Act s.27)</h3>
            </div>
            <div className="p-4">
              <div className="relative">
                {escalationSteps.map((step, idx) => (
                  <div key={step.step} className="flex gap-3 pb-6 last:pb-0">
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium ${
                          step.status === 'done'
                            ? 'bg-green text-white'
                            : step.status === 'active'
                            ? 'bg-orange text-white'
                            : 'bg-muted/20 text-muted'
                        }`}
                      >
                        {step.step}
                      </div>
                      {idx < escalationSteps.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-8 w-0.5 h-full -translate-x-1/2 ${
                            step.status === 'done' ? 'bg-green' : 'bg-border'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="text-[11px] font-medium text-primary">{step.title}</div>
                      <div className="text-[10px] text-muted">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-border rounded-lg text-[11px] text-muted hover:bg-background">
                Draft STR report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
