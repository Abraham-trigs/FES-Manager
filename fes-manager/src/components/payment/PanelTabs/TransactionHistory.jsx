// src/components/WalletPanel/tabs/TransactionHistory.js
import React from 'react';
import useDonorWallet from '../../../store/DonorWallet';

const TransactionHistory = () => {
  const { transactions } = useDonorWallet();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-surface shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-white">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No transactions recorded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((txn, index) => {
            const isDeposit = txn.type === 'deposit';
            const formattedTimestamp = new Date(txn.timestamp).toLocaleString();

            return (
              <li key={index} className="py-3 flex justify-between items-start">
                <div>
                  <p className="font-semibold capitalize text-gray-800 dark:text-gray-100">{txn.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formattedTimestamp}</p>
                  <p className="text-xs italic text-gray-400 dark:text-gray-500">{txn.description}</p>
                </div>
                <div className={`font-bold ${isDeposit ? 'text-green-600' : 'text-red-500'}`}>
                  {isDeposit ? '+' : '-'}{txn.amount.toFixed(2)} FES
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
