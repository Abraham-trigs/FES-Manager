import { create } from "zustand";

const useCurrencyStore = create((set) => ({
  isFES: false, // Default to USD
  toggleCurrency: () => set((state) => ({ isFES: !state.isFES })), // Toggle between FES and USD
  setCurrency: (currency) => set({ isFES: currency === "FES" }), // Set the currency directly (FES or USD)
}));

export default useCurrencyStore;
