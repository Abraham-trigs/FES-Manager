import { create } from "zustand";

// Load saved step from localStorage
const loadStep = () => {
  const savedStep = parseInt(localStorage.getItem("signupStep"), 10);
  return isNaN(savedStep) || savedStep < 1 ? 1 : savedStep;
};

// Load saved user data from localStorage
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem("signupData");
  return savedData ? JSON.parse(savedData) : {};
};

// Save user data to localStorage
const saveToLocalStorage = (data) => {
  localStorage.setItem("signupData", JSON.stringify(data));
};

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
      return {
        userData: updatedUserData,
        errors: { ...state.errors, [field]: "" },
      };
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

  setStep: (newStep) =>
    set(() => {
      localStorage.setItem("signupStep", newStep);
      return { step: newStep };
    }),

  resetStep: () =>
    set(() => {
      localStorage.removeItem("signupStep");
      localStorage.removeItem("signupData");
      return { step: 1, userData: {} };
    }),

  // reset function: wipes everything (step, userData, errors)
  resetStore: () =>
    set(() => {
      localStorage.removeItem("signupStep");
      localStorage.removeItem("signupData");
      return {
        step: 1,
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
        },
        errors: {},
      };
    }),
}));

export default useCreateProfileStore;
