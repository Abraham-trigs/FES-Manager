import { create } from "zustand";

const useProjectStore = create((set, get) => ({
  // **Project List (Stored in LocalStorage)**
  projects: JSON.parse(localStorage.getItem("projects") || "[]"),

  // **Saved Projects (MyArk)**
  myArk: JSON.parse(localStorage.getItem("myArk") || "[]"),

  // **Active Form Data for Creating a Project**
  formData: {
    title: "", // Default value
    category: "", // Default value
    description: "", // Default value
    image: "", // Default value
    fundingGoal: "", // Default value
    currentFunds: "", // Default value
    fesCoins: "", // Default value
    tasks: [], // Default value
    verified: false, // Default value
    verificationDocs: null, // Default value
    location: "", // Default value
    beneficiaries: "", // Default value
    completionDate: "", // Default value
    contactPerson: "", // Default value
    contactEmail: "", // Default value
    contactPhone: "", // Default value
  },

  // **Step for Multi-Step Project Form**
  step: 1,

  // **Converts USD to FES Coins (1 USD = 90 FES Coins)**
  convertToFES: (usdAmount) => Math.floor(usdAmount * 90),

  // **Set Form Step**
  setStep: (step) => set({ step }),

  // **Update Form Data Fields**
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // **Add & Remove Tasks in the Project Form**
  addTask: (task) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tasks: [...state.formData.tasks, task],
      },
    })),
  
  removeTask: (taskIndex) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tasks: state.formData.tasks.filter((_, index) => index !== taskIndex),
      },
    })),

  // **Save Finalized Project (Moves from Form to Live Projects)**
  finalizeProject: () => {
    set((state) => {
      const newProject = {
        id: Date.now().toString(),
        ...state.formData,
        fesCoins: state.convertToFES(state.formData.fundingGoal), // Convert USD to FES
      };
      
      // Save project in state and localStorage
      const updatedProjects = [...state.projects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      return {
        projects: updatedProjects,
        formData: { ...state.formData, fesCoins: "" }, // Reset form data
        step: 1, // Reset form step
      };
    });
  },

  // **Toggle Projects in MyArk**
  toggleMyArk: (projectId) => {
    set((state) => {
      const updatedMyArk = state.myArk.includes(projectId)
        ? state.myArk.filter((id) => id !== projectId) // Remove
        : [...state.myArk, projectId]; // Add

      localStorage.setItem("myArk", JSON.stringify(updatedMyArk));
      return { myArk: updatedMyArk };
    });
  },

  // **Update Project Funding (FES Aid Donations)**
  updateProjectFunding: (projectId, amount) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId
          ? { ...project, currentFunds: project.currentFunds + amount }
          : project
      );

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects };
    });
  },

  // **Add Project to the Project List**
  addProject: (newProject) => {
    set((state) => {
      const updatedProjects = [...state.projects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects };
    });
  },
}));

export default useProjectStore;
