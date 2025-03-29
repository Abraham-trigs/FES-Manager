import { create } from "zustand";

const useAddProjectFormStore = create((set) => {
  const savedData = JSON.parse(localStorage.getItem("addProjectForm")) || {};
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  const generateId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 7; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `FES${randomPart}`;
  };

  return {
    step: savedData.step || 1,
    setStep: (step) => {
      set({ step });
      localStorage.setItem("addProjectForm", JSON.stringify({ ...savedData, step }));
    },

    showPaymentForm: false, // Added state to manage payment modal
    setShowPaymentForm: (value) => set({ showPaymentForm: value }), // Function to toggle modal

    formData: {
      title: savedData.title || "",
      category: savedData.category || "",
      description: savedData.description || "",
      image: savedData.image || "",
      fundingGoal: savedData.fundingGoal || "",
      tasks: savedData.tasks || [],
      verified: savedData.verified ?? null,
      verificationDocs: savedData.verificationDocs || null,
      implementationPlan: savedData.implementationPlan || "",
      impactMetrics: savedData.impactMetrics || "",
      timeline: savedData.timeline || "",
      location: savedData.location || "",
      beneficiaries: savedData.beneficiaries || "",
      completionDate: savedData.completionDate || "",
      contactPerson: savedData.contactPerson || "",
      contactEmail: savedData.contactEmail || "",
      contactPhone: savedData.contactPhone || "",
    },

    projects: savedProjects,

    updateFormData: (field, value) =>
      set((state) => {
        const updatedFormData = { ...state.formData, [field]: value };
        localStorage.setItem("addProjectForm", JSON.stringify(updatedFormData));
        return { formData: updatedFormData };
      }),

    addProject: (newProject) =>
      set((state) => {
        const updatedProjects = [...state.projects, newProject];
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        return { projects: updatedProjects };
      }),

    addTask: (task) =>
      set((state) => {
        const updatedTasks = [...state.formData.tasks, task];
        const updatedFormData = { ...state.formData, tasks: updatedTasks };
        localStorage.setItem("addProjectForm", JSON.stringify(updatedFormData)); // Save to localStorage
        return { formData: updatedFormData };
      }),

    removeTask: (index) =>
      set((state) => {
        const updatedTasks = state.formData.tasks.filter((_, i) => i !== index);
        const updatedFormData = { ...state.formData, tasks: updatedTasks };
        localStorage.setItem("addProjectForm", JSON.stringify(updatedFormData)); // Save to localStorage
        return { formData: updatedFormData };
      }),

    makePayment: (amount) =>
      set((state) => {
        const updatedProjects = state.projects.map((project, index) => {
          if (index === 0) { // Assuming we're updating the first project
            return { ...project, fundingGoal: Math.max(project.fundingGoal - amount, 0) };
          }
          return project;
        });

        localStorage.setItem("projects", JSON.stringify(updatedProjects)); 
        return { projects: updatedProjects }; 
      }),

    validateStep: () => {
      return set((state) => {
        const errors = {};
        const { formData, step } = state;

        if (step === 1) {
          if (!formData.title.trim()) errors.title = "Title is required";
          if (!formData.category.trim()) errors.category = "Category is required";
          if (!formData.description.trim()) errors.description = "Description is required";
        }
        if (step === 2) {
          if (!formData.fundingGoal || isNaN(formData.fundingGoal)) 
            errors.fundingGoal = "Funding goal must be a valid number";
        }
        if (step === 3) {
          if (formData.verified === null) errors.verified = "Verification status is required";
          if (formData.verified && !formData.verificationDocs) {
            errors.verificationDocs = "Upload verification document";
          }
        }
        
        return { errors };
      });
    },

    errors: {},

    resetFormData: () => {
      localStorage.removeItem("addProjectForm");
      set({
        step: 1,
        formData: {
          title: "",
          category: "",
          description: "",
          image: "",
          fundingGoal: "",
          tasks: [],
          verified: null,
          verificationDocs: null,
          implementationPlan: "",
          impactMetrics: "",
          timeline: "",
          location: "",
          beneficiaries: "",
          completionDate: "",
          contactPerson: "",
          contactEmail: "",
          contactPhone: "",
        },
        errors: {},
      });
    },
  };
});

export default useAddProjectFormStore;
