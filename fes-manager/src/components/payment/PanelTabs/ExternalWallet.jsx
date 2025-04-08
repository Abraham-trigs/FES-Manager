// src/components/WalletPanel/tabs/LinkedExternalWallets.js
import React, { useState } from 'react';
import useDonorWallet from '../../../store/DonorWallet'; // Zustand store for wallet state

const ExternalWallets = () => {
  const { externalWallets, addExternalWallet, removeExternalWallet } = useDonorWallet(); // Destructure from Zustand store
  const [newWallet, setNewWallet] = useState(''); // State for new wallet input

  // Function to handle adding a new wallet
  const handleAddWallet = () => {
    if (newWallet.trim() === '') return; // Prevent adding empty wallets

    // Add the new wallet to the Zustand store
    addExternalWallet(newWallet);
    setNewWallet(''); // Clear the input field
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-surface shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-white">Linked External Wallets</h2>

      {/* Add new wallet input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded mb-3"
          value={newWallet}
          placeholder="Add external wallet (e.g., crypto, PayPal)"
          onChange={(e) => setNewWallet(e.target.value)} // Update input value
        />
        <button
          onClick={handleAddWallet} // Trigger wallet addition
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Wallet
        </button>
      </div>

      {/* Wallet list */}
      <div>
        {externalWallets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No linked wallets yet.</p> // If no wallets exist
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {externalWallets.map((wallet, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="text-lg text-gray-800 dark:text-gray-100">{wallet}</div> {/* Display wallet */}
                <button
                  onClick={() => removeExternalWallet(wallet)} // Remove wallet on click
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExternalWallets;
