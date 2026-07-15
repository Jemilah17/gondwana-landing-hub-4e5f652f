import { Users, FileText, Calendar } from 'lucide-react';

const committees = [
  {
    id: 1,
    name: 'Audit, Risk & Opportunity Committee',
    chair: 'James Mnyupe',
    members: ['James Mnyupe', 'Dave Smuts', 'David Namalenga'],
    termsOfReference: 'Approved',
    nextMeeting: '2026-07-15',
    quorum: 3,
    minutesHistory: [
      { date: '2026-06-20', attendees: 5, keyDecisions: 'Approved Q2 financial statements' },
      { date: '2026-05-18', attendees: 4, keyDecisions: 'Risk tolerance framework adopted' },
      { date: '2026-04-22', attendees: 5, keyDecisions: 'Internal audit plan approved' },
    ],
  },
  {
    id: 2,
    name: 'People Committee',
    chair: 'Fabiola Schrywer',
    members: ['Fabiola Schrywer', 'Gys Joubert', 'Hannes Gouws'],
    termsOfReference: 'Approved',
    nextMeeting: '2026-07-22',
    quorum: 2,
    minutesHistory: [
      { date: '2026-06-15', attendees: 3, keyDecisions: 'Approved talent acquisition strategy' },
      { date: '2026-05-20', attendees: 3, keyDecisions: 'Reviewed remuneration bands' },
      { date: '2026-04-18', attendees: 2, keyDecisions: 'Succession planning initiated' },
    ],
  },
  {
    id: 3,
    name: 'Sustainability Committee',
    chair: 'James Mnyupe',
    members: ['James Mnyupe', 'Jaco Visser', 'Fabiola Schrywer'],
    termsOfReference: 'Under Review',
    nextMeeting: '2026-07-28',
    quorum: 2,
    minutesHistory: [
      { date: '2026-06-10', attendees: 3, keyDecisions: 'Adopted carbon reduction targets' },
      { date: '2026-05-12', attendees: 2, keyDecisions: 'Community engagement plan approved' },
      { date: '2026-04-14', attendees: 3, keyDecisions: 'ESG reporting framework adopted' },
    ],
  },
];

export default function BoardCommittees() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-primary">Board Committees</h2>
          <p className="text-sm text-muted mt-1">Governance oversight committees for Gondwana Holdings Limited</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {committees.map((committee) => (
          <div key={committee.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Committee Header */}
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-primary">{committee.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-muted" />
                <span className="text-sm text-muted">Chair: {committee.chair}</span>
              </div>
            </div>

            {/* Committee Details */}
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide mb-1">Members</p>
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
