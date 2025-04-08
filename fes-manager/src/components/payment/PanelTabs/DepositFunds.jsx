import React, { useState } from 'react';
import useDonorWallet from '../../../store/DonorWallet'; // Zustand wallet store
import CurrencyConverter from '../../Convertor/CurrencyConverter';

const DepositFunds = () => {
  // Access balance and deposit action from Zustand
  const { balance, deposit } = useDonorWallet();

  // Local UI states
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = () => {
    const numericAmount = parseFloat(amount);

    // Basic validations
    if (!amount.trim()) {
      setError('Please enter an amount.');
      setSuccess('');
      return;
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Amount must be a positive number.');
      setSuccess('');
      return;
    }

    // Call deposit action
    deposit(numericAmount);
    setSuccess(`Successfully deposited ${numericAmount.toFixed(2)} FES.`);
    setError('');
    setAmount('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-surface shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-white">Deposit Funds</h2>
      
      {/* Display Current Balance with Currency Conversion */}
      <div className="mb-4">
        <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
          Current Balance: <span className="text-green-600">{balance.toFixed(2)} FES</span>
        </p>
        <CurrencyConverter amount={balance} /> {/* Show the currency conversion here */}
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-verydark dark:border-dark dark:text-white"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <button
        onClick={handleDeposit}
        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors w-full"
      >
        Deposit Now
      </button>
    </div>
  );
};

export default DepositFunds;
