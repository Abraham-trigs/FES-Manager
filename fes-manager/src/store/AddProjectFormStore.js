import { create } from 'zustand';

// Utility function to load state from localStorage or return a default value if unavailable
const loadState = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Function to generate a unique 5-character ID consisting of uppercase letters and numbers
function generateUniqueId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

// Zustand store for managing the Add Project multi-step form and other related logic
const useAddProjectFormStore = create((set, get) => ({
  step: 1,
  formData: loadState("formData", {
    title: '',
    category: '',
    description: '',
    fundingGoal: 0,
    tasks: [],
    verifierType: '',
    uploadedDocs: {
      nationalId: null,
      letterOfEndorsement: null,
      endorserNationalId: null,
      governmentAuthorization: null,
      signeeNationalId: null,
    },
  }),
  submittedProjects: loadState("submittedProjects", []),
  myArk: loadState("myArk", []),

  errors: {
    title: '',
    category: '',
    description: '',
    fundingGoal: '',
    verifierType: '',
    tasks: [],
  },

  isVisible: true,

  setVisibility: (visible) => set({ isVisible: visible }),

  updateRemainingFunding: (projectId, newRemainingFunding) => {
    const { submittedProjects } = get();
    const updatedProjects = submittedProjects.map((project) =>
      project.id === projectId ? { ...project, remainingFunding: newRemainingFunding } : project
    );
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));
    set({ submittedProjects: updatedProjects });
  },

  FESpay: (projectId, amount) => {
    const { submittedProjects, updateRemainingFunding } = get();

    const updatedProjects = submittedProjects.map((project) => {
      if (project.id === projectId) {
        let remainingBalance = project.remainingFunding ?? (project.fundingGoal || 0);

        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid payment amount.");
          return project;
        }

        if (amount > remainingBalance) {
          alert(`The funding goal has been reached. Only ${remainingBalance} will be deducted.`);
          amount = remainingBalance;
        }

        const newBalance = remainingBalance - amount;
        updateRemainingFunding(projectId, newBalance);
        return { ...project, remainingFunding: newBalance };
      }
      return project;
    });

    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));
    set({ submittedProjects: updatedProjects });
  },

  isAuthenticated: loadState("isAuthenticated", false),
  user: loadState("user", null),

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
  },

  setStep: (step) => set({ step }),

  validateStep: () => {
    const { step, formData } = get();
    const newErrors = {
      title: '',
      category: '',
      description: '',
      fundingGoal: '',
      verifierType: '',
      tasks: [],
    };

    // Validation logic based on current step
    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.category) newErrors.category = "Category is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        break;

      case 2:
        if (formData.fundingGoal <= 0) newErrors.fundingGoal = "Funding goal must be greater than zero.";
        if (!formData.tasks.length) newErrors.tasks.push("At least one task is required.");
        formData.tasks.forEach((task, index) => {
          if (!task.name) newErrors.tasks.push(`Task ${index + 1} name is required.`);
          if (task.amount <= 0) newErrors.tasks.push(`Task ${index + 1} amount must be greater than zero.`);
        });
        break;

      case 3:
        if (!formData.verifierType) newErrors.verifierType = "Verifier type is required.";
        break;

      default:
        break;
    }

    set({ errors: newErrors });

    // Return true if there are any validation errors
    return Object.values(newErrors).some((val) =>
      Array.isArray(val) ? val.length > 0 : val !== ''
    );
  },

  nextStep: () => {
    const hasErrors = get().validateStep();
    if (!hasErrors) {
      set((state) => ({ step: Math.min(state.step + 1, 4) }));
    }
  },

  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  setFormData: (data) => {
    const newFormData = { ...get().formData, ...data };
    localStorage.setItem("formData", JSON.stringify(newFormData));
    set({ formData: newFormData });
  },

  resetFormData: () => {
    localStorage.removeItem("formData");
    set({
      formData: {
        title: '',
        category: '',
        description: '',
        fundingGoal: 0,
        tasks: [],
        verifierType: '',
        uploadedDocs: {
          nationalId: null,
          letterOfEndorsement: null,
          endorserNationalId: null,
          governmentAuthorization: null,
          signeeNationalId: null,
        },
      },
      errors: {
        title: '',
        category: '',
        description: '',
        fundingGoal: '',
        verifierType: '',
        tasks: [],
      },
    });
  },

  addTask: (task) => {
    const updatedTasks = [...get().formData.tasks, task];
    const updatedFormData = { ...get().formData, tasks: updatedTasks };
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    set({ formData: updatedFormData });
  },

  addSubmittedProject: () => {
    const { formData, submittedProjects } = get();
    const hasErrors = get().validateStep();
    if (hasErrors) return;

    const newProject = {
      ...formData,
      fundingGoal: formData.fundingGoal * 100,
      id: generateUniqueId(),
    };

    const updatedProjects = [...submittedProjects, newProject];
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));
    localStorage.removeItem("formData");

    set({
      submittedProjects: updatedProjects,
      formData: {
        title: '',
        category: '',
        description: '',
        fundingGoal: 0,
        tasks: [],
        verifierType: '',
        uploadedDocs: {
          nationalId: null,
          letterOfEndorsement: null,
          endorserNationalId: null,
          governmentAuthorization: null,
          signeeNationalId: null,
        },
      },
      errors: {
        title: '',
        category: '',
        description: '',
        fundingGoal: '',
        verifierType: '',
        tasks: [],
      },
    });
  },

  addToMyArk: (projectId) => {
    const { myArk, submittedProjects } = get();
    if (myArk.some((p) => p.id === projectId)) return;

    const projectToAdd = submittedProjects.find((p) => p.id === projectId);
    if (!projectToAdd) {
      console.warn("Project not found:", projectId);
      return;
    }

    const updatedMyArk = [...myArk, projectToAdd];
    localStorage.setItem("myArk", JSON.stringify(updatedMyArk));
    set({ myArk: updatedMyArk });
  },
}));

export default useAddProjectFormStore;
