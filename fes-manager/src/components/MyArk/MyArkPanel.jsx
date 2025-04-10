// src/components/MyArk/MyArkPanel.js
import React from 'react';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

// Import all MyArk tab components
import SetRecurringFunds from './tabs/SetRecurringFunds';
import ProjectOverview from './tabs/ProjectOverview';
import FundingData from './tabs/FundingData';
import ManageMyProjects from './tabs/ManageMyProjects';

const MyArkPanel = () => {
  const { activeTab, setActiveTab } = useAddProjectFormStore(); // Add store for active tab

  const tabs = [
    'Set Recurring Funds',
    'Project Overview',
    'Funding Data',
    'Manage My Projects',  // New tab for project management
  ];

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-teal-900 dark:bg-sidebar dark:text-text text-white p-4 h-screen fixed left-0 top-0 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 mt-[90px]">My Ark</h2>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer transition-colors ${activeTab === tab
                ? 'bg-teal-700 dark:bg-surface dark:hover:bg-verydark'
                : 'hover:bg-teal-800 dark:hover:bg-dark'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-prime shadow-lg ml-[25%] dark:shadow-black">
        {activeTab === 'Set Recurring Funds' && <SetRecurringFunds />}
        {activeTab === 'Project Overview' && <ProjectOverview />}
        {activeTab === 'Funding Data' && <FundingProgress />}
        {activeTab === 'Manage My Projects' && <ManageMyProjects />} {/* New tab for managing projects */}
      </div>
    </div>
  );
};

export default MyArkPanel;
