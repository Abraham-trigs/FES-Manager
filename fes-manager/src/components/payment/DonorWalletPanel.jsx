// src/components/WalletPanel/WalletPanel.js
import React from 'react';
import useDonorWalletPanelStore from '../../store/DonorWalletPanelStore';


// Import all wallet tab components
import DepositFunds from './PanelTabs/DepositFunds';
import ExternalWallets from './PanelTabs/ExternalWallet';
import TransactionHistory from './PanelTabs/TransactionHistory';
import WithdrawalRequests from './PanelTabs/WithdrawalRequests';

const DonorWalletPanel = () => {
  const { activeTab, setActiveTab } = useDonorWalletPanelStore();

  const tabs = [
    'Deposit Funds',
    'Transaction History',
    'External Wallets',  
    'Withdrawal Requests',
  ];

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-teal-900 dark:bg-sidebar dark:text-text text-white p-4 h-screen fixed left-0 top-0 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 mt-[90px]">My Wallet</h2>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`p-2 cursor-pointer transition-colors ${
                activeTab === tab
                  ? 'bg-teal-700 dark:bg-surface dark:hover:bg-verydark'
                  : 'hover:bg-teal-800 dark:hover:bg-dark'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <button className="text-green-400 mt-4">Save Changes</button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-prime shadow-lg ml-[25%] dark:shadow-black">
        {activeTab === 'Deposit Funds' && <DepositFunds />}
        {activeTab === 'Transaction History' && <TransactionHistory />}
        {activeTab === 'Withdrawal Requests' && <WithdrawalRequests />}
        {activeTab === 'Linked External Wallets' && <ExternalWallets />}
      </div>
    </div>
  );
};

export default DonorWalletPanel;
