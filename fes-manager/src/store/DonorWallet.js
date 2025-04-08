// src/store/DonorWallet.js
import { create } from 'zustand';

const useDonorWallet = create((set) => ({
  balance: 200, // Initial wallet balance
  transactions: [], // Initial empty transactions
  externalWallets: [], // New array to store linked external wallets

  // Method to handle deposit
  deposit: (amount) => set((state) => {
    const updatedBalance = state.balance + amount;
    return {
      balance: updatedBalance,
      transactions: [
        ...state.transactions,
        {
          type: 'deposit',
          amount,
          timestamp: new Date().toLocaleString(),
          description: 'Deposit into donor wallet',
        },
      ],
    };
  }),

  // Method to handle withdrawal
  withdraw: (amount) => set((state) => {
    if (state.balance < amount) {
      return state; // Don't update if insufficient balance
    }
    const updatedBalance = state.balance - amount;
    return {
      balance: updatedBalance,
      transactions: [
        ...state.transactions,
        {
          type: 'withdraw',
          amount,
          timestamp: new Date().toLocaleString(),
          description: 'Withdrawal from donor wallet',
        },
      ],
    };
  }),

  // Method to set initial balance (e.g., after loading from API)
  setBalance: (balance) => set({ balance }),

  // Method to load transactions (e.g., after loading from API)
  setTransactions: (transactions) => set({ transactions }),

  // Method to add an external wallet
  addExternalWallet: (wallet) => set((state) => ({
    externalWallets: [...state.externalWallets, wallet], // Add new wallet to the array
  })),

  // Method to remove an external wallet
  removeExternalWallet: (wallet) => set((state) => ({
    externalWallets: state.externalWallets.filter((w) => w !== wallet), // Filter out the wallet
  })),
}));

export default useDonorWallet;
