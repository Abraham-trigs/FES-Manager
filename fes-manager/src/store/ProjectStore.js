// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useProjectStore = create(
//   persist(
//     (set, get) => ({
//       projects: [],
//       myArk: [],

//       formData: {
//         title: "",
//         category: "",
//         description: "",
//         image: "",
//         fundingGoal: 0,
//         currentFunds: 0,
//         fesCoins: 0,  // No longer need dollars
//         tasks: [],
//         verified: false,
//         verificationDocs: null,
//         location: "",
//         beneficiaries: "",
//         completionDate: "",
//         contactPerson: "",
//         contactEmail: "",
//         contactPhone: "",
//       },

//       step: 1,

//       convertToFES: (usdAmount) => Math.floor(usdAmount * 90), // For backward compatibility, if needed.

//       setStep: (step) => set({ step }),

//       updateFormData: (field, value) =>
//         set((state) => ({
//           formData: { ...state.formData, [field]: value },
//         })),

//       addTask: (task) =>
//         set((state) => ({
//           formData: { ...state.formData, tasks: [...state.formData.tasks, task] },
//         })),

//       removeTask: (taskIndex) =>
//         set((state) => ({
//           formData: {
//             ...state.formData,
//             tasks: state.formData.tasks.filter((_, index) => index !== taskIndex),
//           },
//         })),

//       finalizeProject: () => {
//         set((state) => {
//           const newProject = {
//             id: Date.now().toString(),
//             ...state.formData,
//             fesCoins: state.formData.fundingGoal,  // Store funding in FES Coins
//           };

//           return {
//             projects: [...state.projects, newProject],
//             formData: {
//               title: "",
//               category: "",
//               description: "",
//               image: "",
//               fundingGoal: 0,
//               currentFunds: 0,
//               fesCoins: 0,
//               tasks: [],
//               verified: false,
//               verificationDocs: null,
//               location: "",
//               beneficiaries: "",
//               completionDate: "",
//               contactPerson: "",
//               contactEmail: "",
//               contactPhone: "",
//             },
//             step: 1,
//           };
//         });
//       },

//       updateProjectFunding: (projectId, amount, deductBudget = false) => {
//         set((state) => {
//           const updatedProjects = state.projects.map((project) => {
//             if (project.id !== projectId) return project;

//             const newFunds = Math.min(project.fundingGoal, project.currentFunds + amount);
//             return {
//               ...project,
//               currentFunds: newFunds,
//               fundingGoal: deductBudget ? Math.max(0, project.fundingGoal - amount) : project.fundingGoal,
//             };
//           });

//           return { projects: updatedProjects };
//         });
//       },

//       addProject: (newProject) => {
//         set((state) => ({
//           projects: [...state.projects, newProject],
//         }));
//       },
//     }),
//     {
//       name: "project-store",
//       getStorage: () => localStorage,
//     }
//   )
// );

// export default useProjectStore;
