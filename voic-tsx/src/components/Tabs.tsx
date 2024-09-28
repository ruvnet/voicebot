import React from 'react';
import { FileText } from 'lucide-react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <ul className="flex justify-center mb-0">
        <li>
          <button
            className={`tablinks ${activeTab === 'MainUI' ? 'active' : ''}`}
            onClick={() => setActiveTab('MainUI')}
          >
            Start
          </button>
        </li>
        <li>
          <button
            className={`tablinks ${activeTab === 'PromptManagement' ? 'active' : ''}`}
            onClick={() => setActiveTab('PromptManagement')}
          >
            Prompts
          </button>
        </li>
        <li>
          <button
            className={`tablinks ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Settings')}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            className={`tablinks documentation-tab ${activeTab === 'Documentation' ? 'active' : ''}`}
            onClick={() => setActiveTab('Documentation')}
          >
            <FileText size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
};