import { create } from "zustand"; 

// Function to load the current step from localStorage
const loadStep = () => {
  const savedStep = parseInt(localStorage.getItem("signupStep"), 10);
  return isNaN(savedStep) || savedStep < 0 ? 0 : savedStep; // Ensures step starts at 1 if no valid step is found
};

// Function to load user data from localStorage
const loadFromLocalStorage = () => JSON.parse(localStorage.getItem("signupData")) || {};

// Function to save user data to localStorage
const saveToLocalStorage = (data) => localStorage.setItem("signupData", JSON.stringify(data));

// Zustand store for managing profile creation state
const useCreateProfileStore = create((set) => ({
  // Initialize step and user data
  step: loadStep(), // Set the initial step from localStorage
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
    ...loadFromLocalStorage(), // Load additional user data if available
  },
  errors: {}, // Errors object to track form validation errors

  // Function to update a specific field in the userData and store it in localStorage
  updateField: (field, value) =>
    set((state) => {
      const updatedUserData = { ...state.userData, [field]: value };
      saveToLocalStorage(updatedUserData); // Save updated data to localStorage
      return { userData: updatedUserData, errors: { ...state.errors, [field]: "" } };
    }),

  // Function to update the errors object
  setErrors: (errors) => set({ errors }),

  // Function to move to the next step in the signup process
  nextStep: () =>
    set((state) => {
      const newStep = state.step + 1;
      localStorage.setItem("signupStep", newStep); // Save the new step to localStorage
      return { step: newStep };
    }),

  // Function to move to the previous step in the signup process
  prevStep: () =>
    set((state) => {
      const newStep = Math.max(1, state.step - 1); // Prevent going below step 1
      localStorage.setItem("signupStep", newStep); // Save the new step to localStorage
      return { step: newStep };
    }),

  // Function to reset the step and user data, removing it from localStorage
  resetStep: () =>
    set(() => {
      localStorage.removeItem("signupStep"); // Remove step from storage
      localStorage.removeItem("signupData"); // Remove user data from storage
      return { step: 0, userData: {} }; // Reset state to initial values
    }),
}));

export default useCreateProfileStore;
