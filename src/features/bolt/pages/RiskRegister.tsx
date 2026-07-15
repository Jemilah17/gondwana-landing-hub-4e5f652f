import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import Drawer from '../components/ui/Drawer';
import { risks } from '../data/governance';
import { AlertTriangle } from 'lucide-react';

export default function RiskRegister() {
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);

  const risk = selectedRisk ? risks.find(r => r.id === selectedRisk) : null;

  const getCellColor = (score: number) => {
    if (score >= 15) return 'bg-red text-white';
    if (score >= 10) return 'bg-orange text-white';
    if (score >= 5) return 'bg-amber text-white';
    return 'bg-green/20 text-green';
  };

  return (
    <div>
      <Topbar title="Enterprise risk register" />

      <div className="p-6">
        {/* 5x5 Heat map */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="text-[12px] font-medium text-primary mb-4">Risk heat map (Likelihood x Impact)</h3>
          <div className="flex gap-2">
            <div className="flex flex-col justify-between pr-2 text-[10px] text-muted text-right py-2">
              <span>5</span>
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span className="pt-2">Impact</span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1">
                {[...Array(25)].map((_, idx) => {
                  const impact = 5 - Math.floor(idx / 5);
                  const likelihood = (idx % 5) + 1;
                  const score = likelihood * impact;
                  return (
                    <div
                      key={idx}
                      className={`aspect-square flex items-center justify-center text-[10px] font-medium rounded ${getCellColor(score)}`}
                    >
                      {score}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted px-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="text-center text-[10px] text-muted mt-1">Likelihood</div>
            </div>
          </div>
        </div>

        {/* Risk table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">#</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Category</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Description</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Owner</th>
                <th className="px-3 py-3 text-center text-[10px] text-muted uppercase">L</th>
                <th className="px-3 py-3 text-center text-[10px] text-muted uppercase">I</th>
                <th className="px-3 py-3 text-center text-[10px] text-muted uppercase">Inherent</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Mitigation</th>
                <th className="px-3 py-3 text-center text-[10px] text-muted uppercase">Residual</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Committee</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {risks.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRisk(r.id)}
                  className={`hover:bg-background cursor-pointer ${
                    r.status === 'critical' || r.status === 'high' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-3 py-2 text-[11px] text-muted">{r.id}</td>
                  <td className="px-3 py-2 text-[11px] text-primary">{r.category}</td>
                  <td className="px-3 py-2 text-[11px] text-primary">
                    <div className="flex items-start gap-1">
                      {r.status === 'critical' && <AlertTriangle className="w-3 h-3 text-red flex-shrink-0" />}
                      <span className="truncate max-w-[180px]">{r.description}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-muted">{r.owner}</td>
                  <td className="px-3 py-2 text-center text-[11px] text-muted">{r.likelihood}</td>
                  <td className="px-3 py-2 text-center text-[11px] text-muted">{r.impact}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-medium ${getCellColor(r.inherentScore)}`}>
                      {r.inherentScore}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-muted truncate max-w-[120px]">{r.mitigation}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-medium ${getCellColor(r.residualScore)}`}>
                      {r.residualScore}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-muted">{r.committee}</td>
                  <td className="px-3 py-2">
                    <StatusPill status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right sidebar */}
        <div className="fixed right-0 top-[88px] bottom-0 w-[200px] bg-card border-l border-border p-4 overflow-y-auto hidden xl:block">
          <div className="space-y-4">
            <div className="bg-orange-tint rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-orange mb-2">Overall risk profile</h4>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange rounded-full" />
                <span className="text-[11px] text-primary">Elevated</span>
              </div>
            </div>
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Top 5 risks</h4>
              <div className="space-y-1 text-[10px] text-muted">
                <div className="text-red">1. FATF grey-listing</div>
                <div className="text-orange">2. Hollard BI claim</div>
                <div className="text-orange">3. NSX bond</div>
                <div className="text-amber">4. Cybersecurity</div>
                <div className="text-amber">5. Cross-border</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk detail drawer */}
      <Drawer
        isOpen={!!selectedRisk}
        onClose={() => setSelectedRisk(null)}
        title={risk?.description?.split(' —')[0] || ''}
      >
        {risk && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-muted">Category</span>
                <p className="text-[12px] text-primary">{risk.category}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted">Owner</span>
                <p className="text-[12px] text-primary">{risk.owner}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-muted">Full description</span>
              <p className="text-[12px] text-primary mt-1">{risk.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-[10px] text-muted">Inherent score</div>
                <div className={`text-lg font-medium ${risk.inherentScore >= 15 ? 'text-red' : risk.inherentScore >= 10 ? 'text-orange' : 'text-amber'}`}>
                  {risk.inherentScore}
                </div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-[10px] text-muted">Residual score</div>
                <div className={`text-lg font-medium ${risk.residualScore >= 8 ? 'text-amber' : 'text-green'}`}>
                  {risk.residualScore}
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-muted">Mitigation</span>
              <p className="text-[12px] text-primary mt-1">{risk.mitigation}</p>
            </div>

            <div className="pt-4">
              <button className="w-full px-4 py-2 bg-orange text-white rounded-lg text-[11px] font-medium">
                View details
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
