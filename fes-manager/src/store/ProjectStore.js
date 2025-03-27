import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProjectStore = create(
  persist(
    (set, get) => ({
      // **Project List**
      projects: [],
      myArk: [],
      
      // **Active Form Data**
      formData: {
        title: "",
        category: "",
        description: "",
        image: "",
        fundingGoal: 0,
        currentFunds: 0,
        fesCoins: 0,
        tasks: [],
        verified: false,
        verificationDocs: null,
        location: "",
        beneficiaries: "",
        completionDate: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
      },

      // **Multi-Step Form Step**
      step: 1,

      // **USD to FES Conversion (1 USD = 90 FES Coins)**
      convertToFES: (usdAmount) => Math.floor(usdAmount * 90),

      // **Set Form Step**
      setStep: (step) => set({ step }),

      // **Update Form Data Fields**
      updateFormData: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      // **Add & Remove Tasks**
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

      // **Save & Finalize Project**
      finalizeProject: () => {
        set((state) => {
          const newProject = {
            id: Date.now().toString(),
            ...state.formData,
            fesCoins: state.convertToFES(state.formData.fundingGoal),
          };

          // Update Projects List
          const updatedProjects = [...state.projects, newProject];

          return {
            projects: updatedProjects,
            formData: {
              title: "",
              category: "",
              description: "",
              image: "",
              fundingGoal: 0,
              currentFunds: 0,
              fesCoins: 0,
              tasks: [],
              verified: false,
              verificationDocs: null,
              location: "",
              beneficiaries: "",
              completionDate: "",
              contactPerson: "",
              contactEmail: "",
              contactPhone: "",
            },
            step: 1,
          };
        });
      },

      // **Toggle Projects in MyArk**
      toggleMyArk: (projectId) => {
        set((state) => {
          const updatedMyArk = state.myArk.includes(projectId)
            ? state.myArk.filter((id) => id !== projectId)
            : [...state.myArk, projectId];

          return { myArk: updatedMyArk };
        });
      },

      // **Check if Project is in MyArk**
      isInMyArk: (projectId) => get().myArk.includes(projectId),

      // **Update Project Funding (with Safe Limits)**
      updateProjectFunding: (projectId, amount, deductBudget = false) => {
        set((state) => {
          const updatedProjects = state.projects.map((project) => {
            if (project.id !== projectId) return project;

            const newFunds = Math.min(
              project.fundingGoal,
              project.currentFunds + amount
            );

            return {
              ...project,
              currentFunds: newFunds, // Ensure it never exceeds fundingGoal
              fundingGoal: deductBudget
                ? Math.max(0, project.fundingGoal - amount)
                : project.fundingGoal,
            };
          });

          return { projects: updatedProjects };
        });
      },

      // **Add a New Project**
      addProject: (newProject) => {
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      },
    }),
    {
      name: "project-store",
      getStorage: () => localStorage,
    }
  )
);

export default useProjectStore;
