// Refactor the store (Firebase-related code removal)
const useAddProjectFormStore = create((set) => ({
  // Initial state values (no Firebase dependencies)
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

  // User Authentication State (not Firebase anymore)
  isAuthenticated: loadState("isAuthenticated", false),
  user: loadState("user", null),

  // Replaced Firebase login with basic localStorage-based auth system
  login: (userData) => {
    // Save user data and auth state in localStorage (not Firebase)
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    set({ user: userData, isAuthenticated: true });
  },

  // Refactored logout function (still using localStorage, no Firebase)
  logout: () => {
    // Remove user data and auth state from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
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

  // The rest of your functions (like setStep, validateStep, nextStep, etc.)
  // These are fine and don't need Firebase cleanup. They work with state and localStorage, which is good for persistence.

}));
