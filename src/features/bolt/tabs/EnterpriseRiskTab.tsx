import { AlertTriangle } from 'lucide-react';

const risks = [
  {
    id: 1,
    category: 'Regulatory',
    description: 'FATF grey-listing risk — Namibia placed on FATF grey list Feb 2024, enhanced AML/CFT scrutiny',
    owner: 'James Mnyupe',
    likelihood: 4,
    impact: 5,
    inherentScore: 20,
    mitigation: 'Enhanced compliance monitoring, additional reporting to FIC, board-level oversight',
    residualLikelihood: 2,
    residualImpact: 4,
    residualScore: 8,
    status: 'critical',
  },
  {
    id: 2,
    category: 'Insurance',
    description: 'Hollard BI claim litigation — Business interruption claim disputed, litigation ongoing',
    owner: 'Gys Joubert',
    likelihood: 3,
    impact: 5,
    inherentScore: 15,
    mitigation: 'External counsel engaged, contingency provision made, quarterly litigation updates to board',
    residualLikelihood: 2,
    residualImpact: 4,
    residualScore: 8,
    status: 'high',
  },
  {
    id: 3,
    category: 'Treasury',
    description: 'NSX bond maturity — N$50m bond matures Mar 2027, refinancing required',
    owner: 'Dave Smuts',
    likelihood: 3,
    impact: 4,
    inherentScore: 12,
    mitigation: 'Early engagement with bondholders, alternative facility discussions with Bank Windhoek',
    residualLikelihood: 2,
    residualImpact: 3,
    residualScore: 6,
    status: 'high',
  },
  {
    id: 4,
    category: 'Operations',
    description: 'Cross-border Chobe/Zambezi regulatory divergence — varying tourism regs across borders',
    owner: 'Hannes Gouws',
    likelihood: 3,
    impact: 3,
    inherentScore: 9,
    mitigation: 'Dedicated compliance officer for each jurisdiction, quarterly regulatory review',
    residualLikelihood: 2,
    residualImpact: 2,
    residualScore: 4,
    status: 'medium',
  },
  {
    id: 5,
    category: 'People',
    description: 'Key person risk — Gys Joubert (CEO) succession not formalised',
    owner: 'Fabiola Schrywer',
    likelihood: 2,
    impact: 4,
    inherentScore: 8,
    mitigation: 'Succession planning framework initiated Q2 2026, interim CEO designated',
    residualLikelihood: 1,
    residualImpact: 3,
    residualScore: 3,
    status: 'medium',
  },
];

const getCellColor = (score: number) => {
  if (score >= 15) return 'bg-red text-white';
  if (score >= 10) return 'bg-orange text-white';
  if (score >= 5) return 'bg-amber text-primary';
  return 'bg-green-tint text-primary';
};

const statusConfig = {
  critical: { label: 'Critical', bg: 'bg-red/10', text: 'text-red', border: 'border-red' },
  high: { label: 'High', bg: 'bg-orange-tint', text: 'text-orange', border: 'border-orange' },
  medium: { label: 'Medium', bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber' },
  low: { label: 'Low', bg: 'bg-green/10', text: 'text-green', border: 'border-green' },
};

export default function EnterpriseRiskTab() {
  const criticalCount = risks.filter(r => r.status === 'critical').length;
  const highCount = risks.filter(r => r.status === 'high').length;
  const mediumCount = risks.filter(r => r.status === 'medium').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-medium text-primary">Enterprise Risk Register</h2>
          <p className="text-sm text-muted mt-1">Strategic and operational risks for Gondwana Holdings Limited</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-red">{criticalCount}</div>
            <div className="text-xs text-muted">Critical</div>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-orange">{highCount}</div>
            <div className="text-xs text-muted">High</div>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-amber">{mediumCount}</div>
            <div className="text-xs text-muted">Medium</div>
          </div>
        </div>
      </div>

      {/* 5x5 Heat Map */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary mb-4">Risk Heat Map (Inherent Risk)</h3>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md">
            <thead>
              <tr>
                <th className="w-20"></th>
                {[1, 2, 3, 4, 5].map(i => (
                  <th key={i} className="px-2 py-1 text-center text-xs font-medium text-muted">
                    Impact {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[5, 4, 3, 2, 1].map(likelihood => (
                <tr key={likelihood}>
                  <td className="px-2 py-1 text-xs font-medium text-muted">L{likelihood}</td>
                  {[1, 2, 3, 4, 5].map(impact => {
                    const score = likelihood * impact;
                    const hasRisk = risks.some(r => r.likelihood === likelihood && r.impact === impact);
                    return (
                      <td key={impact} className="px-1 py-1">
                        <div className={`h-10 flex items-center justify-center rounded text-xs font-medium ${getCellColor(score)}`}>
                          {hasRisk ? score : ''}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-3">L = Likelihood</p>
      </div>

      {/* Risk Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Owner</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">L</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">I</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Inherent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Mitigation</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Residual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {risks.map((risk) => (
                <tr
                  key={risk.id}
                  className={`hover:bg-background ${
                    risk.status === 'critical' || risk.status === 'high' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-primary">{risk.category}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    <div className="flex items-start gap-2">
                      {risk.status === 'critical' && (
                        <AlertTriangle className="w-4 h-4 text-red flex-shrink-0 mt-0.5" />
                      )}
                      <span>{risk.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">{risk.owner}</td>
                  <td className="px-4 py-3 text-center text-sm text-primary">{risk.likelihood}</td>
                  <td className="px-4 py-3 text-center text-sm text-primary">{risk.impact}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${getCellColor(risk.inherentScore)}`}>
                      {risk.inherentScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{risk.mitigation}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${getCellColor(risk.residualScore)}`}>
                      {risk.residualScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
