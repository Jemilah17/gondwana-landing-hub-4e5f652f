import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import BoardCommitteesTab from '../tabs/BoardCommitteesTab';
import KingVDisclosureTab from '../tabs/KingVDisclosureTab';
import DirectorSkillsMatrixTab from '../tabs/DirectorSkillsMatrixTab';
import PolicyRegisterTab from '../tabs/PolicyRegisterTab';
import EnterpriseRiskTab from '../tabs/EnterpriseRiskTab';
import EthicsConductTab from '../tabs/EthicsConductTab';
import RemunerationTab from '../tabs/RemunerationTab';
import StakeholderRegisterTab from '../tabs/StakeholderRegisterTab';
import DirectorRotationTab from '../tabs/DirectorRotationTab';

const tabs = [
  { id: 'committees', label: 'Board committees' },
  { id: 'kingv', label: 'King V Disclosure' },
  { id: 'skills', label: 'Director skills matrix' },
  { id: 'policies', label: 'Policy register' },
  { id: 'risk', label: 'Enterprise risk register' },
  { id: 'ethics', label: 'Ethics & conduct' },
  { id: 'remuneration', label: 'Remuneration governance' },
  { id: 'stakeholders', label: 'Stakeholder register' },
  { id: 'rotation', label: 'Director rotation' },
];

export default function Governance() {
  const [activeTab, setActiveTab] = useState('committees');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'committees':
        return <BoardCommitteesTab />;
      case 'kingv':
        return <KingVDisclosureTab />;
      case 'skills':
        return <DirectorSkillsMatrixTab />;
      case 'policies':
        return <PolicyRegisterTab />;
      case 'risk':
        return <EnterpriseRiskTab />;
      case 'ethics':
        return <EthicsConductTab />;
      case 'remuneration':
        return <RemunerationTab />;
      case 'stakeholders':
        return <StakeholderRegisterTab />;
      case 'rotation':
        return <DirectorRotationTab />;
      default:
        return <BoardCommitteesTab />;
    }
  };

  return (
    <div>
      <Topbar title="Governance" />

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-orange -mb-px'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
