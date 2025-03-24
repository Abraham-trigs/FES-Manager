import {create} from 'zustand';

const useLoginStore = create((set) => ({
  showLoginForm: false,
  setShowLoginForm: (value) => set({ showLoginForm: value }), // Function to set visibility of the login form
}));

export default useLoginStore;
