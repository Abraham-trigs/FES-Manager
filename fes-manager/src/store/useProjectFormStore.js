import { create } from "zustand";

// Zustand store for managing the project form state
const useProjectFormStore = create((set) => ({
  // Controls the current step of the multi-step form
  step: 1,

  // Stores form data for project creation
  formData: {
    title: "", // Project title
    category: "", // Project category
    description: "", // Project description
    image: "", // Image URL for the project
    fundingGoal: "", // Total budget required for the project
    currentFunds: "", // Current amount raised
    tasks: [], // List of tasks within the project
    verified: false, // Verification status of the project
    verificationDocs: null, // Uploaded verification document
    location: "", // Project location
    beneficiaries: "", // Who benefits from the project
    completionDate: "", // Expected completion date
    contactPerson: "", // Contact person for verification
    contactEmail: "", // Email of the contact person
    contactPhone: "", // Phone number of the contact person

    // Implementation details based on selected category
    schoolName: "", // School name (if applicable)
    schoolAddress: "", // School address (if applicable)
    schoolContactPerson: "", // Contact person for the school
    schoolEmail: "", // Contact email for the school
    schoolPhone: "", // Contact phone number for the school

    organizationName: "", // Organization name (if applicable)
    organizationAddress: "", // Organization address
    organizationContactPerson: "", // Organization's contact person
    organizationEmail: "", // Organization's contact email
    organizationPhone: "", // Organization's contact phone number
  },

  // Updates the current step of the form
  setStep: (step) => set({ step }),

  // Updates a specific field in the form data
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Adds a task to the project's task list
  addTask: (task) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tasks: [...state.formData.tasks, task],
      },
    })),

  // Removes a task from the project's task list by index
  removeTask: (taskIndex) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tasks: state.formData.tasks.filter((_, index) => index !== taskIndex),
      },
    })),
}));

export default useProjectFormStore;
