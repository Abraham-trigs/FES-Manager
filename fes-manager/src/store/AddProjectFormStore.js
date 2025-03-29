import { create } from "zustand";

const useAddProjectFormStore = create((set) => {
  // Load stored projects from localStorage on store initialization
  const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  return {
    // Tracks the current step in the project form
    step: 1,

    // Initial form data for project creation
    formData: {
      title: "", // Project title
      category: "", // Project category
      description: "", // Project description
      image: "", // Project image URL
      fundingGoal: 0, // Total budget for the project
      currentFunds: 0, // Amount of funds received so far
      fesCoins: 0, // Automatically calculated FES Coins (based on fundingGoal)
      tasks: [], // List of project tasks
      verified: null, // Verification status
      verificationDocs: null, // Verification documents
      location: "", // Project location
      beneficiaries: "", // Target beneficiaries
      completionDate: "", // Expected project completion date
      contactPerson: "", // Contact person for the project
      contactEmail: "", // Email of the contact person
      contactPhone: "", // Phone number of the contact person
      schoolName: "", // School name (if applicable)
      schoolAddress: "", // School address
      schoolContactPerson: "", // Contact person for the school
      schoolEmail: "", // School email
      schoolPhone: "", // School phone number
      schoolInvoice: null, // Invoice document for the school
      organizationName: "", // Organization name (if applicable)
      organizationAddress: "", // Organization address
      organizationContactPerson: "", // Contact person for the organization
      organizationEmail: "", // Organization email
      organizationPhone: "", // Organization phone number
      agreementDocs: null, // Agreement documents for the organization
    },

    // Stores all created projects (loaded from localStorage)
    projects: storedProjects,

    // Updates the current form step
    setStep: (step) => set({ step }),

    // Updates form data for a specific field
    updateFormData: (field, value) =>
      set((state) => {
        const updatedData = {
          ...state.formData,
          [field]: value,
        };

        // Automatically update fesCoins if fundingGoal changes
        if (field === "fundingGoal") {
          updatedData.fesCoins = value * 110;
        }

        return { formData: updatedData };
      }),

    // Adds a new task to the project
    addTask: (task) =>
      set((state) => ({
        formData: {
          ...state.formData,
          tasks: [...state.formData.tasks, task],
        },
      })),

    // Removes a task from the project by index
    removeTask: (taskIndex) =>
      set((state) => ({
        formData: {
          ...state.formData,
          tasks: state.formData.tasks.filter((_, index) => index !== taskIndex),
        },
      })),

    // Adds a new project and stores it in localStorage
    addProject: (newProject) =>
      set((state) => {
        const projectWithFesCoins = {
          ...newProject,
          fesCoins: newProject.fundingGoal * 110, // Auto calculate FES Coins
        };

        const updatedProjects = [...state.projects, projectWithFesCoins];
        localStorage.setItem("projects", JSON.stringify(updatedProjects));

        return { projects: updatedProjects };
      }),

    // Resets the form data to its initial state
    resetFormData: () =>
      set({
        formData: {
          title: "",
          category: "",
          description: "",
          image: "",
          fundingGoal: 0,
          currentFunds: 0,
          fesCoins: 0, // Reset FES Coins
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
        step: 1,
      }),

    // Updates the funding amount for a project
    updateProjectFunding: (projectId, amount) =>
      set((state) => {
        const updatedProjects = state.projects.map((project) => {
          if (project.id === projectId) {
            const newFunds = project.currentFunds + amount;

            // Ensure funds do not exceed the funding goal
            if (newFunds > project.fundingGoal) return project;

            return {
              ...project,
              currentFunds: newFunds,
            };
          }
          return project;
        });

        // Save updated projects to localStorage
        localStorage.setItem("projects", JSON.stringify(updatedProjects));

        return { projects: updatedProjects };
      }),
  };
});

export default useAddProjectFormStore;
