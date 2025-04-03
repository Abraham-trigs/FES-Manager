import { create } from 'zustand';

// Load from localStorage (if available)
const loadState = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Function to generate a unique 5-character ID (mix of letters and numbers)
function generateUniqueId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  
  return id;
}

const useAddProjectFormStore = create((set) => ({
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
  errors: {
    title: '',
    category: '',
    description: '',
    fundingGoal: '',
    verifierType: '',
  },

  // Function to handle payments per project
  FESpay: (projectId, amount) => set((state) => {
    const updatedProjects = state.submittedProjects.map((project) => {
      if (project.id === projectId) {
        let remainingBalance = project.remainingFunding;
  
        // Check if remainingFunding is valid (not NaN)
        if (isNaN(remainingBalance)) {
          remainingBalance = project.fundingGoal; // Default to fundingGoal if invalid
        }
  
        // Check if the amount is a valid number (not NaN) and greater than zero
        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid payment amount.");
          return project; // Return the original project if the amount is invalid
        }
  
        // Check if the amount exceeds the remaining balance
        if (amount > remainingBalance) {
          alert(`The funding goal has been reached. Only ${remainingBalance} will be deducted.`);
          amount = remainingBalance; // Adjust amount to the remaining balance
        }
  
        // Deduct the amount from the remaining balance
        remainingBalance -= amount;
  
        // Update the project with the new remaining balance
        return { ...project, remainingFunding: remainingBalance };
      }
      return project; // Return unmodified project if no match
    });
  
    // Update localStorage with the new data
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));
  
    // Return updated state with the new list of projects
    return { submittedProjects: updatedProjects };
  }),
      
  // User Authentication State
  isAuthenticated: loadState("isAuthenticated", false),
  user: loadState("user", null),

  // Actions for User Authentication
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
    set((state) => {
      const { formData, step, errors } = state;

      switch (step) {
        case 1:
          if (!formData.title) errors.title = "Title is required.";
          if (!formData.category) errors.category = "Category is required.";
          if (!formData.description) errors.description = "Description is required.";
          break;

        case 2:
          if (formData.fundingGoal <= 0) errors.fundingGoal = "Funding goal must be greater than zero.";
          break;

        case 3:
          if (!formData.verifierType) errors.verifierType = "Verifier type is required.";
          break;

        default:
          break;
      }

      set({ errors });

      return Object.values(errors).some((error) => error !== "");
    });
  },

  nextStep: () => set((state) => {
    const { step } = state;

    const hasErrors = state.validateStep();
    if (hasErrors) return state;

    return { step: Math.min(step + 1, 4) };
  }),

  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),  

  setFormData: (data) => set((state) => {
    const newFormData = { ...state.formData, ...data };
    localStorage.setItem("formData", JSON.stringify(newFormData));
    return { formData: newFormData };
  }),

  resetFormData: () => set(() => {
    localStorage.removeItem("formData");
    return {
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
      },
    };
  }),

  addTask: (task) => set((state) => {
    const newTasks = [...state.formData.tasks, task];
    const newFormData = { ...state.formData, tasks: newTasks };
    localStorage.setItem("formData", JSON.stringify(newFormData));
    return { formData: newFormData };
  }),

  addSubmittedProject: () => set((state) => {
    const { formData, submittedProjects } = state;
  
    const hasErrors = state.validateStep();
    if (hasErrors) return state;

    const newProject = {
      ...formData,
      id: generateUniqueId(),
    };

    const updatedProjects = [...submittedProjects, newProject];
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));
    localStorage.removeItem("formData");
  
    return {
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
      },
    };
  }),
}));

export default useAddProjectFormStore;
