import { Users, FileText, Calendar } from 'lucide-react';

const committees = [
  {
    id: 1,
    name: 'Audit, Risk & Opportunity Committee',
    chair: 'James Mnyupe',
    members: ['James Mnyupe', 'Dave Smuts', 'David Namalenga', 'Hannes Gouws', 'Jaco Visser'],
    termsOfReference: 'Approved',
    nextMeeting: '2026-08-28',
    quorum: 3,
    minutesHistory: [
      { date: '2026-06-20', attendees: 5, keyDecisions: 'Approved Q2 financial statements and risk tolerance framework' },
      { date: '2026-05-18', attendees: 4, keyDecisions: 'Risk appetite statement adopted' },
      { date: '2026-04-22', attendees: 5, keyDecisions: 'Internal audit plan for FY2026 approved' },
    ],
  },
  {
    id: 2,
    name: 'People Committee',
    chair: 'Fabiola Schrywer',
    members: ['Fabiola Schrywer', 'Gys Joubert', 'Hannes Gouws', 'David Namalenga'],
    termsOfReference: 'Approved',
    nextMeeting: '2026-11-15',
    quorum: 2,
    minutesHistory: [
      { date: '2026-06-15', attendees: 4, keyDecisions: 'Approved talent acquisition strategy' },
      { date: '2026-05-20', attendees: 3, keyDecisions: 'Reviewed remuneration bands for senior management' },
      { date: '2026-04-18', attendees: 4, keyDecisions: 'Succession planning framework initiated' },
    ],
  },
  {
    id: 3,
    name: 'Sustainability Committee',
    chair: 'Hannes Gouws',
    members: ['Hannes Gouws', 'James Mnyupe', 'Fabiola Schrywer', 'Gys Joubert'],
    termsOfReference: 'Review due 2026-09-30',
    nextMeeting: '2026-09-25',
    quorum: 2,
    minutesHistory: [
      { date: '2026-06-10', attendees: 3, keyDecisions: 'Adopted carbon reduction targets for 2030' },
      { date: '2026-05-12', attendees: 4, keyDecisions: 'Community engagement plan approved' },
      { date: '2026-04-14', attendees: 3, keyDecisions: 'ESG reporting framework adopted' },
    ],
  },
];

export default function BoardCommitteesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Board Committees</h2>
        <p className="text-sm text-muted mt-1">Governance oversight committees for Gondwana Holdings Limited (33 entities)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {committees.map((committee) => (
          <div key={committee.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Committee Header */}
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-primary text-sm">{committee.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-muted" />
                <span className="text-sm text-muted">Chair: {committee.chair}</span>
              </div>
            </div>

            {/* Committee Details */}
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide mb-1">Members ({committee.members.length})</p>
                <div className="flex flex-wrap gap-1">
                  {committee.members.map((member) => (
                    <span key={member} className="px-2 py-1 bg-background text-xs text-primary border border-border rounded">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide mb-1">Terms of Reference</p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded ${
                    committee.termsOfReference === 'Approved'
                      ? 'bg-green/10 text-green'
                      : 'bg-orange-tint text-orange'
                  }`}>
                    {committee.termsOfReference}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide mb-1">Quorum</p>
                  <span className="text-sm text-primary">{committee.quorum} members</span>
                </div>
              </div>

              <div className="bg-orange-tint border-l-2 border-orange p-3 rounded-r">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange" />
                  <span className="text-xs text-muted">Next Meeting</span>
                </div>
                <p className="text-sm font-medium text-primary mt-1">
                  {new Date(committee.nextMeeting).toLocaleDateString('en-NA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Minutes History */}
            <div className="border-t border-border">
              <div className="p-3 bg-background">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted" />
                  <span className="text-xs text-muted uppercase tracking-wide">Minutes History</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {committee.minutesHistory.map((meeting, idx) => (
                  <div key={idx} className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary">
                        {new Date(meeting.date).toLocaleDateString('en-NA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-xs text-muted">{meeting.attendees} attendees</span>
                    </div>
                    <p className="text-xs text-muted mt-1">{meeting.keyDecisions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
