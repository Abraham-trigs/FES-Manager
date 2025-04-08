import React, { useState } from 'react';
import useDonorWallet from '../../store/DonorWallet';


const DonorWallet = () => {
  // Access Zustand store state and methods
  const { balance, transactions, deposit, withdraw } = useDonorWallet();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Handle deposit and withdrawal actions
  const handleTransaction = (type) => {
    const numericAmount = parseFloat(amount);

    if (amount.trim() === '') {
      setError('Amount cannot be empty.');
      return;
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (type === 'withdraw' && numericAmount > balance) {
      setError('Insufficient balance.');
      return;
    }

    // Call appropriate action from store
    if (type === 'deposit') {
      deposit(numericAmount);
    } else {
      withdraw(numericAmount);
    }

    // Reset amount and error
    setAmount('');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4"> Donor Wallet</h2>
      <p className="text-lg font-medium mb-2">Balance: <span className="text-green-600">{balance.toFixed(2)} FES</span></p>

      <input
        type="number"
        className="w-full border px-4 py-2 rounded mb-3"
        value={amount}
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex justify-between space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => handleTransaction('deposit')}
        >
          Deposit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleTransaction('withdraw')}
        >
          Withdraw
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2"> Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="text-sm divide-y mt-2">
          {transactions.map((txn, index) => {
            const formattedTimestamp = new Date(txn.timestamp).toLocaleString(); // Format the timestamp
            return (
              <li key={index} className="py-2 flex justify-between items-start">
                <div>
                  <p className="font-medium capitalize">{txn.type}</p>
                  <p className="text-gray-500">{formattedTimestamp}</p>
                </div>
                <div className={`font-semibold ${txn.type === 'deposit' ? 'text-green-600' : 'text-red-500'}`}>
                  {txn.type === 'deposit' ? '+' : '-'}{txn.amount.toFixed(2)} FES
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DonorWallet;
