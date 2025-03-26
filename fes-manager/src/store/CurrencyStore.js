import { create } from "zustand";

const useCurrencyStore = create((set) => ({
  isFES: false, // Default to USD
  toggleCurrency: () => set((state) => ({ isFES: !state.isFES })),
}));

export default useCurrencyStore;
