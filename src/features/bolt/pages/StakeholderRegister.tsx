import Topbar from '../components/layout/Topbar';

const stakeholders = [
  { group: 'Shareholders', contact: 'Fabiola', method: 'AGM, circulars, NSX', frequency: 'Annual', last: 'Feb 2026 GM', issues: 'Share placement', response: 'Approved', next: 'AGM 2027', responsible: 'Fabiola' },
  { group: 'FIC Namibia', contact: 'Fabiola', method: 'Formal correspondence', frequency: 'As required', last: 'June 2026', issues: 'Remediation', response: 'Ongoing', next: 'As required', responsible: 'Fabiola' },
  { group: 'BIPA', contact: 'Fabiola', method: 'Portal submissions', frequency: 'Annual', last: 'Ongoing', issues: 'Filings', response: 'On track', next: 'Ongoing', responsible: 'Fabiola' },
  { group: 'NTB', contact: 'Hilma/Jemilah', method: 'Levy payments, returns', frequency: 'Annual', last: 'Ongoing', issues: 'Compliance', response: 'Filed', next: 'Ongoing', responsible: 'Hilma/Jemilah' },
  { group: 'NSX', contact: 'Fabiola', method: 'Bond disclosures', frequency: 'Per listing req.', last: 'Q1 2026', issues: 'Bond maturity', response: 'Refinancing', next: 'Q3 2026', responsible: 'Fabiola' },
  { group: 'Ernst & Young', contact: 'James Mnyupe', method: 'Audit engagement', frequency: 'Annual', last: 'FY close', issues: 'Audit', response: 'Completed', next: 'FY 2026', responsible: 'James Mnyupe' },
  { group: 'Conservation partners', contact: 'Gys Joubert', method: 'Meetings, reports', frequency: 'Quarterly', last: 'Q2 2026', issues: 'Projects', response: 'On track', next: 'Q3 2026', responsible: 'Gys Joubert' },
  { group: 'Gondwana Care Trust', contact: 'Gys Joubert', method: 'Trustee meetings', frequency: 'Bi-annual', last: 'Mar 2026', issues: 'Trust business', response: 'Completed', next: 'Sep 2026', responsible: 'Gys Joubert' },
  { group: 'Staff', contact: 'Gys Joubert', method: 'Town halls, comms', frequency: 'Ongoing', last: 'Monthly', issues: 'Updates', response: 'Ongoing', next: 'Monthly', responsible: 'Gys Joubert' },
];

export default function StakeholderRegister() {
  return (
    <div>
      <Topbar title="Stakeholder register" />

      <div className="p-6">
        {/* Engagement table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Stakeholder group</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Key contacts</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Method</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Frequency</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Last engagement</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Issues raised</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Response</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Next</th>
                <th className="px-3 py-3 text-left text-[10px] text-muted uppercase">Responsible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stakeholders.map((s, idx) => (
                <tr key={idx} className="hover:bg-background">
                  <td className="px-3 py-2.5 text-[11px] text-primary font-medium">{s.group}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.contact}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.method}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.frequency}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.last}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.issues}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.response}</td>
                  <td className="px-3 py-2.5 text-[11px] text-orange font-medium">{s.next}</td>
                  <td className="px-3 py-2.5 text-[11px] text-muted">{s.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
