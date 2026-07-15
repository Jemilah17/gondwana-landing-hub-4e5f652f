import { AlertTriangle } from 'lucide-react';

const risks = [
  {
    id: 1,
    category: 'Regulatory',
    description: 'FATF grey-listing impact on Namibian financial services',
    owner: 'James Mnyupe',
    likelihood: 4,
    impact: 5,
    inherentScore: 20,
    mitigation: 'Enhanced AML/CFT compliance program, regulator liaison',
    residualLikelihood: 2,
    residualImpact: 4,
    residualScore: 8,
    rating: 'critical',
  },
  {
    id: 2,
    category: 'Financial',
    description: 'Hollard business interruption claim dispute',
    owner: 'Dave Smuts',
    likelihood: 3,
    impact: 5,
    inherentScore: 15,
    mitigation: 'Legal counsel engaged, alternative recovery paths',
    residualLikelihood: 2,
    residualImpact: 4,
    residualScore: 8,
    rating: 'high',
  },
  {
    id: 3,
    category: 'Financial',
    description: 'NSX bond maturity November 2026',
    owner: 'Dave Smuts',
    likelihood: 4,
    impact: 4,
    inherentScore: 16,
    mitigation: 'Refinancing negotiations, cash flow optimization',
    residualLikelihood: 2,
    residualImpact: 3,
    residualScore: 6,
    rating: 'high',
  },
  {
    id: 4,
    category: 'Operational',
    description: 'Cross-border Chobe/Zambezi operational risks',
    owner: 'Gys Joubert',
    likelihood: 3,
    impact: 3,
    inherentScore: 9,
    mitigation: 'Local compliance teams, insurance coverage',
    residualLikelihood: 2,
    residualImpact: 2,
    residualScore: 4,
    rating: 'medium',
  },
  {
    id: 5,
    category: 'People',
    description: 'Key person risk - Gys Joubert succession',
    owner: 'Fabiola Schrywer',
    likelihood: 3,
    impact: 3,
    inherentScore: 9,
    mitigation: 'Succession planning in progress, deputy appointments',
    residualLikelihood: 2,
    residualImpact: 2,
    residualScore: 4,
    rating: 'medium',
  },
];

const getScoreColor = (score: number) => {
  if (score >= 15) return 'bg-red text-white';
  if (score >= 10) return 'bg-orange text-white';
  if (score >= 5) return 'bg-amber text-white';
  return 'bg-green/20 text-green';
};

const getRatingBadge = (rating: string) => {
  const config = {
    critical: { label: 'Critical', bg: 'bg-red/10', text: 'text-red' },
    high: { label: 'High', bg: 'bg-orange/10', text: 'text-orange' },
    medium: { label: 'Medium', bg: 'bg-amber/10', text: 'text-amber' },
    low: { label: 'Low', bg: 'bg-green/10', text: 'text-green' },
  };
  return config[rating as keyof typeof config];
};

export default function EnterpriseRisk() {
  const criticalCount = risks.filter(r => r.rating === 'critical').length;
  const highCount = risks.filter(r => r.rating === 'high').length;

  // Generate 5x5 heatmap
  const heatmap = [];
  for (let impact = 5; impact >= 1; impact--) {
    for (let likelihood = 1; likelihood <= 5; likelihood++) {
      const score = likelihood * impact;
      heatmap.push({ likelihood, impact, score });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-medium text-primary">Enterprise Risk Register</h2>
          <p className="text-sm text-muted mt-1">Risk identification and assessment for Gondwana Holdings Limited</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-red/10 border border-red/30 rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-red">{criticalCount}</div>
            <div className="text-xs text-red">Critical</div>
          </div>
          <div className="bg-orange/10 border border-orange/30 rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-orange">{highCount}</div>
            <div className="text-xs text-orange">High</div>
          </div>
        </div>
      </div>

      {/* 5x5 Heat Map */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary mb-4">Risk Heat Map (Likelihood x Impact)</h3>
        <div className="flex gap-2">
          <div className="flex flex-col justify-between pr-2 text-xs text-muted">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span className="pt-2">Impact</span>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-1">
              {heatmap.map((cell, idx) => (
                <div
                  key={idx}
                  className={`w-full aspect-square flex items-center justify-center text-xs font-medium rounded ${getScoreColor(cell.score)}`}
                >
                  {cell.score}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted px-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <div className="text-center text-xs text-muted mt-1">Likelihood</div>
          </div>
        </div>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {risks.map((risk) => (
                <tr
                  key={risk.id}
                  className={`hover:bg-background ${
                    risk.rating === 'critical' || risk.rating === 'high' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-primary">{risk.category}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    <div className="flex items-start gap-2">
                      {risk.rating === 'critical' && <AlertTriangle className="w-4 h-4 text-red flex-shrink-0 mt-0.5" />}
                      <span>{risk.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{risk.owner}</td>
                  <td className="px-4 py-3 text-center text-sm text-primary">{risk.likelihood}</td>
                  <td className="px-4 py-3 text-center text-sm text-primary">{risk.impact}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${getScoreColor(risk.inherentScore)}`}>
                      {risk.inherentScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted max-w-xs">{risk.mitigation}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${getScoreColor(risk.residualScore)}`}>
                      {risk.residualScore}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${getRatingBadge(risk.rating).bg} ${getRatingBadge(risk.rating).text}`}>
                      {getRatingBadge(risk.rating).label}
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
