import { create } from "zustand";

const useAddProjectFormStore = create((set) => ({
  // Controls the current step of the multi-step form
  step: 1,

  // Stores form data for project creation
  formData: {
    title: "",
    category: "",
    description: "",
    image: "",
    fundingGoal: "",
    currentFunds: "",
    tasks: [],
    verified: null,
    verificationDocs: null,
    location: "",
    beneficiaries: "",
    completionDate: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    schoolName: "",
    schoolAddress: "",
    schoolContactPerson: "",
    schoolEmail: "",
    schoolPhone: "",
    schoolInvoice: null,
    organizationName: "",
    organizationAddress: "",
    organizationContactPerson: "",
    organizationEmail: "",
    organizationPhone: "",
    agreementDocs: null,
  },

  // Initialize projects as an empty array
  projects: [],

  // Updates the current step of the form
  setStep: (step) => set({ step }),

  // Updates a specific field in the form data
  updateFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
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

  // Add a new project to the project list (e.g., when the form is submitted)
  addProject: (newProject) => set((state) => {
    const updatedProjects = [...state.projects, newProject];
    return { projects: updatedProjects };
  }),

  // Resets the form fields after project submission
  resetFormData: () => set({
    formData: {
      title: "",
      category: "",
      description: "",
      image: "",
      fundingGoal: "",
      currentFunds: "",
      tasks: [],
      verified: null,
      verificationDocs: null,
      location: "",
      beneficiaries: "",
      completionDate: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      schoolName: "",
      schoolAddress: "",
      schoolContactPerson: "",
      schoolEmail: "",
      schoolPhone: "",
      schoolInvoice: null,
      organizationName: "",
      organizationAddress: "",
      organizationContactPerson: "",
      organizationEmail: "",
      organizationPhone: "",
      agreementDocs: null,
    },
    step: 1, // Reset to the first step after project submission
  }),

  // Optional: Initialize projects from localStorage if they exist
  initializeProjectsFromStorage: () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects) {
      set({ projects: storedProjects });
    }
  },

  // Optional: Save the projects to localStorage whenever they change
  saveProjectsToStorage: () => {
    set((state) => {
      localStorage.setItem("projects", JSON.stringify(state.projects));
      return { projects: state.projects };
    });
  },

}));

export default useAddProjectFormStore;
