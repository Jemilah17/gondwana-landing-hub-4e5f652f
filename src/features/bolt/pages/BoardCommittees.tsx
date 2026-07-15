import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { committees } from '../data/governance';
import { Users, Calendar, FileText } from 'lucide-react';

export default function BoardCommittees() {
  const [selectedCommittee, setSelectedCommittee] = useState(committees[0].id);
  const [activeDetailTab, setActiveDetailTab] = useState('members');

  const committee = committees.find(c => c.id === selectedCommittee);

  return (
    <div>
      <Topbar title="Board committees" />

      <div className="p-6">
        {/* Committee cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {committees.map((comm) => (
            <div
              key={comm.id}
              onClick={() => setSelectedCommittee(comm.id)}
              className={`bg-card border rounded-lg overflow-hidden cursor-pointer ${
                comm.id === selectedCommittee
                  ? 'border-orange'
                  : 'border-border hover:bg-background'
              }`}
            >
              <div className={`border-l-4 ${comm.stripeColor} py-3 px-4`}>
                <div className="flex items-start justify-between">
                  <h3 className="text-[11px] font-medium text-primary">{comm.name}</h3>
                  {comm.termsOfReference === 'review due' && (
                    <StatusPill status="review due" />
                  )}
                </div>
                <div className="mt-2 space-y-1 text-[10px] text-muted">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Chair: {comm.chair} · {comm.members.length} members
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Meets: {comm.meets} · Quorum: {comm.quorum}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    TOR: <StatusPill status={comm.termsOfReference === 'current' ? 'current' : 'review due'} />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex gap-2">
                  <button className="text-[10px] text-orange font-medium">View minutes</button>
                  <button className="text-[10px] text-muted">Manage members</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Committee detail */}
        {committee && (
          <div className="bg-card border border-border rounded-lg">
            <div className="px-4 py-3 border-b border-border bg-background flex items-center justify-between">
              <h3 className="text-[12px] font-medium text-primary">{committee.name}</h3>
            </div>

            {/* Detail tabs */}
            <div className="flex border-b border-border px-4">
              {['Members', 'TOR', 'Meeting history', 'Board reporting'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDetailTab(tab.toLowerCase().replace(' ', ''))}
                  className={`px-3 py-2 text-[11px] font-medium border-b-2 -mb-px ${
                    activeDetailTab === tab.toLowerCase().replace(' ', '')
                      ? 'text-orange border-orange'
                      : 'text-muted border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeDetailTab === 'members' && (
                <div className="grid grid-cols-2 gap-3">
                  {committee.members.map((member) => (
                    <div key={member} className="flex items-center gap-2 p-2 bg-background rounded-lg">
                      <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center text-white text-[11px]">
                        {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-[11px] text-primary">{member}</div>
                        {member === committee.chair && (
                          <div className="text-[10px] text-orange">Chair</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === 'meetinghistory' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <div className="text-[11px] text-primary">Q2 2026</div>
                      <div className="text-[10px] text-muted">Last meeting</div>
                    </div>
                    <span className="px-2 py-1 bg-green/10 text-green rounded text-[10px]">Completed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-tint rounded-lg border border-orange-border">
                    <div>
                      <div className="text-[11px] text-primary">28 Aug 2026</div>
                      <div className="text-[10px] text-muted">Next meeting</div>
                    </div>
                    <span className="px-2 py-1 bg-orange/10 text-orange rounded text-[10px]">Scheduled</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
