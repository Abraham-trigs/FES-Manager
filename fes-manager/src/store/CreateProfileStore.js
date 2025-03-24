import { create } from "zustand";

// Load from localStorage
const loadStep = () => {
  const savedStep = parseInt(localStorage.getItem("signupStep"), 10);
  return isNaN(savedStep) || savedStep < 1 ? 1 : savedStep; // Ensures step starts at 1
};

const loadFromLocalStorage = () => JSON.parse(localStorage.getItem("signupData")) || {};
const saveToLocalStorage = (data) => localStorage.setItem("signupData", JSON.stringify(data));

const useCreateProfileStore = create((set) => ({
  step: loadStep(),
  userData: {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    organizationName: "",
    role: "",
    preferredCommunication: [],
    ...loadFromLocalStorage(),
  },
  errors: {},

  updateField: (field, value) =>
    set((state) => {
      const updatedUserData = { ...state.userData, [field]: value };
      saveToLocalStorage(updatedUserData);
      return { userData: updatedUserData, errors: { ...state.errors, [field]: "" } };
    }),

  setErrors: (errors) => set({ errors }),

  nextStep: () =>
    set((state) => {
      const newStep = state.step + 1;
      localStorage.setItem("signupStep", newStep);
      return { step: newStep };
    }),

  prevStep: () =>
    set((state) => {
      const newStep = Math.max(1, state.step - 1);
      localStorage.setItem("signupStep", newStep);
      return { step: newStep };
    }),

  resetStep: () =>
    set(() => {
      localStorage.removeItem("signupStep"); // Remove step from storage
      localStorage.removeItem("signupData"); // Remove user data from storage
      return { step: 1, userData: {} }; // Reset state
    }),
}));

export default useCreateProfileStore;
