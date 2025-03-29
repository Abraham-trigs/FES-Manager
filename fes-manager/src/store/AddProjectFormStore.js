import { create } from "zustand";

const useAddProjectFormStore = create((set) => {
  const savedData = JSON.parse(localStorage.getItem("addProjectForm")) || {};
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  return {
    step: savedData.step || 1,
    setStep: (step) => {
      set({ step });
      localStorage.setItem("addProjectForm", JSON.stringify({ ...savedData, step }));
    },

    formData: {
      title: savedData.title || "",
      category: savedData.category || "",
      description: savedData.description || "",
      image: savedData.image || "",
      fundingGoal: savedData.fundingGoal || "", // ✅ Keep fundingGoal, remove currentFunds
      tasks: savedData.tasks || [],
      verified: savedData.verified ?? null,
      verificationDocs: savedData.verificationDocs || null,
      implementationPlan: savedData.implementationPlan || "",
      impactMetrics: savedData.impactMetrics || "",
      timeline: savedData.timeline || "",
    },

    projects: savedProjects,

    updateFormData: (field, value) =>
      set((state) => {
        const updatedFormData = { ...state.formData, [field]: value };
        localStorage.setItem("addProjectForm", JSON.stringify(updatedFormData));
        return { formData: updatedFormData };
      }),

    addTask: (task) =>
      set((state) => {
        const updatedTasks = [...state.formData.tasks, task];
        localStorage.setItem("addProjectForm", JSON.stringify({ ...state.formData, tasks: updatedTasks }));
        return { formData: { ...state.formData, tasks: updatedTasks } };
      }),

    removeTask: (index) =>
      set((state) => {
        const updatedTasks = [...state.formData.tasks];
        updatedTasks.splice(index, 1);
        localStorage.setItem("addProjectForm", JSON.stringify({ ...state.formData, tasks: updatedTasks }));
        return { formData: { ...state.formData, tasks: updatedTasks } };
      }),

    addProject: () =>
      set((state) => {
        const newProject = { ...state.formData, id: Date.now() };
        const updatedProjects = [...state.projects, newProject];
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

    resetForm: () => {
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
        },
        errors: {},
      });
    },
  };
});

export default useAddProjectFormStore;
