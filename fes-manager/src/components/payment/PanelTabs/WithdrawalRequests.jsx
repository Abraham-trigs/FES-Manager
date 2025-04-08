// src/components/WalletPanel/tabs/WithdrawalRequests.js
import React from 'react';
import useDonorWallet from '../../../store/DonorWallet';

const WithdrawalRequests = () => {
  const { transactions } = useDonorWallet();

  // Filter only 'withdraw' type transactions
  const withdrawalRequests = transactions.filter((txn) => txn.type === 'withdraw');

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-surface shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-white">Withdrawal Requests</h2>

      {withdrawalRequests.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No pending withdrawal requests.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {withdrawalRequests.map((txn, index) => {
            const formattedTimestamp = new Date(txn.timestamp).toLocaleString();
            const isCompleted = txn.amount <= 0; // Assume withdrawal completes when balance is sufficient

            return (
              <li key={index} className="py-3 flex justify-between items-start">
                <div>
                  <p className="font-semibold capitalize text-gray-800 dark:text-gray-100">Withdrawal</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formattedTimestamp}</p>
                  <p className="text-xs italic text-gray-400 dark:text-gray-500">{txn.description}</p>
                </div>
                <div className={`font-bold ${isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isCompleted ? 'Completed' : 'Pending'}
                </div>
                <div className={`font-bold ${isCompleted ? 'text-green-600' : 'text-red-500'}`}>
                  -{txn.amount.toFixed(2)} FES
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default WithdrawalRequests;
