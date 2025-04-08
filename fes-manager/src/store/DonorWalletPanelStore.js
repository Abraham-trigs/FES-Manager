import { create } from 'zustand';

// Zustand store to manage which tab is active in the wallet panel
const useDonorWalletPanelStore = create((set) => ({
  activeTab: 'Deposit Funds', // default tab
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useDonorWalletPanelStore;
