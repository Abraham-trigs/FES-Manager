import { create } from 'zustand';

// Utility function to load state from localStorage or return a default value if unavailable
const loadState = (key, defaultValue) => {
  try {
    // Attempt to retrieve and parse the stored value
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
  
  // Randomly select characters to form the ID
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  
  return id; // Returns a randomly generated ID
}


// Create the Zustand store with the necessary actions and state
const useAddProjectFormStore = create((set) => ({
  // Initial state values
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
  submittedProjects: loadState("submittedProjects", []),  // List of all submitted projects
  myArk: loadState("myArk", []),  // List of projects saved by the user
  errors: {
    title: '',
    category: '',
    description: '',
    fundingGoal: '',
    verifierType: '',
  },

  // Function to update the remaining funding after a payment is made for a specific project
  updateRemainingFunding: (projectId, newRemainingFunding) => set((state) => {
    const updatedProjects = state.submittedProjects.map((project) => {
      // Find the project by its ID and update the remaining funding
      if (project.id === projectId) {
        return { ...project, remainingFunding: newRemainingFunding };
      }
      return project; // Return unchanged project if IDs don't match
    });

    // Store the updated projects list in localStorage
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));

    return { submittedProjects: updatedProjects };
  }),

  // Function to handle payments in FEScoin for a specific project
  FESpay: (projectId, amount) => set((state) => {
    const updatedProjects = state.submittedProjects.map((project) => {
      if (project.id === projectId) {
        let remainingBalance = project.remainingFunding; 

        // If remaining funding is invalid, default to funding goal * 100 (FEScoin equivalent)
        if (isNaN(remainingBalance)) {
          remainingBalance = project.fundingGoal * 100; 
        }

        // Validate the payment amount
        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid payment amount.");
          return project;
        }

        // If the payment exceeds remaining balance, adjust the amount
        if (amount > remainingBalance) {
          alert(`The funding goal has been reached. Only ${remainingBalance} will be deducted.`);
          amount = remainingBalance; 
        }

        remainingBalance -= amount; // Deduct the payment from remaining funding

        // Update the remaining funding
        state.updateRemainingFunding(projectId, remainingBalance); 

        return { ...project, remainingFunding: remainingBalance };
      }
      return project; // Return unchanged project if IDs don't match
    });

    // Store the updated projects list in localStorage
    localStorage.setItem("submittedProjects", JSON.stringify(updatedProjects));

    return { submittedProjects: updatedProjects };
  }),

  // User Authentication State (indicates whether the user is logged in)
  isAuthenticated: loadState("isAuthenticated", false),
  user: loadState("user", null),

  // Actions for User Authentication (login and logout)
  login: (userData) => {
    // Store user data and authentication status in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    // Remove user data and authentication status from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
  },

  // Function to set the current step of the form (for multi-step form navigation)
  setStep: (step) => set({ step }),

  // Function to validate the form based on the current step
  validateStep: () => {
    set((state) => {
      const { formData, step, errors } = state;

      // Step-specific validation rules
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

      // Return whether there are any validation errors
      return Object.values(errors).some((error) => error !== "");
    });
  },

  // Function to move to the next step in the form
  nextStep: () => set((state) => {
    const { step } = state;

    // Validate before moving to the next step
    const hasErrors = state.validateStep();
    if (hasErrors) return state;

    return { step: Math.min(step + 1, 4) }; // Ensure the step doesn't exceed 4
  }),

  // Function to move to the previous step in the form
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),  

  // Function to set form data and save it in localStorage
  setFormData: (data) => set((state) => {
    const newFormData = { ...state.formData, ...data };
    localStorage.setItem("formData", JSON.stringify(newFormData));
    return { formData: newFormData };
  }),

  // Function to reset form data (clearing localStorage and state)
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

  // Function to add a new task to the form data
  addTask: (task) => set((state) => {
    const newTasks = [...state.formData.tasks, task];
    const newFormData = { ...state.formData, tasks: newTasks };
    localStorage.setItem("formData", JSON.stringify(newFormData));
    return { formData: newFormData };
  }),

  // Function to add a submitted project to the list and update localStorage
  addSubmittedProject: () => set((state) => {
    const { formData, submittedProjects } = state;
  
    const hasErrors = state.validateStep();
    if (hasErrors) return state;

    // Create a new project object with the form data and generate a unique ID
    const newProject = {
      ...formData,
      fundingGoal: formData.fundingGoal * 100, // Convert funding goal to FEScoin value
      id: generateUniqueId(),
    };

    // Add the new project to the list of submitted projects
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

  // Function to add a project to the user's "MyArk" collection
  addToMyArk: (projectId) => set((state) => {
    const projectToAdd = state.submittedProjects.find((project) => project.id === projectId);
  
    if (projectToAdd) {
      const updatedMyArk = [...state.myArk, projectToAdd];
      localStorage.setItem("myArk", JSON.stringify(updatedMyArk));
      return { myArk: updatedMyArk };
    }
  
    return state;
  }),
  
  // Function to remove a project from the user's "MyArk" collection
  removeFromMyArk: (projectId) => set((state) => {
    const updatedMyArk = state.myArk.filter((project) => project.id !== projectId);
    localStorage.setItem("myArk", JSON.stringify(updatedMyArk));
    return { myArk: updatedMyArk };
  }),
}));

// Export the store to be used in other parts of the application
export default useAddProjectFormStore;
