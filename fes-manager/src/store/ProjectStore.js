// import { create } from "zustand";

// const useAddProjectFormStore = create((set) => {
//   // Load from localStorage
//   const savedData = JSON.parse(localStorage.getItem("addProjectForm")) || {};

//   return {
//     // Form steps
//     step: savedData.step || 1,
//     setStep: (step) => {
//       set({ step });
//       localStorage.setItem("addProjectForm", JSON.stringify({ ...savedData, step }));
//     },

//     // Initial form data
//     formData: {
//       title: savedData.title || "",
//       category: savedData.category || "",
//       description: savedData.description || "",
//       image: savedData.image || "",
//       fundingGoal: savedData.fundingGoal || "",
//       currentFunds: savedData.currentFunds || "",
//       tasks: savedData.tasks || [],
//       verified: savedData.verified ?? null,
//       verificationDocs: savedData.verificationDocs || null,
//       implementationPlan: savedData.implementationPlan || "",
//       impactMetrics: savedData.impactMetrics || "",
//       timeline: savedData.timeline || "",
//     },

//     // Function to update form data
//     updateFormData: (field, value) =>
//       set((state) => {
//         const updatedFormData = { ...state.formData, [field]: value };
//         localStorage.setItem("addProjectForm", JSON.stringify(updatedFormData));
//         return { formData: updatedFormData };
//       }),

//     // Task management
//     addTask: (task) =>
//       set((state) => {
//         const updatedTasks = [...state.formData.tasks, task];
//         localStorage.setItem("addProjectForm", JSON.stringify({ ...state.formData, tasks: updatedTasks }));
//         return { formData: { ...state.formData, tasks: updatedTasks } };
//       }),
//     removeTask: (index) =>
//       set((state) => {
//         const updatedTasks = [...state.formData.tasks];
//         updatedTasks.splice(index, 1);
//         localStorage.setItem("addProjectForm", JSON.stringify({ ...state.formData, tasks: updatedTasks }));
//         return { formData: { ...state.formData, tasks: updatedTasks } };
//       }),

//     // Validation method
//     validateStep: () => {
//       return set((state) => {
//         const errors = {};
//         const { formData, step } = state;

//         if (step === 1) {
//           if (!formData.title) errors.title = "Title is required";
//           if (!formData.category) errors.category = "Category is required";
//           if (!formData.description) errors.description = "Description is required";
//         }
//         if (step === 2) {
//           if (!formData.fundingGoal) errors.fundingGoal = "Funding goal is required";
//           if (!formData.currentFunds) errors.currentFunds = "Current funds are required";
//           if (formData.tasks.length === 0) errors.tasks = "At least one task is required";
//         }
//         if (step === 3) {
//           if (formData.verified === null) errors.verified = "Verification status is required";
//           if (formData.verified && !formData.verificationDocs) {
//             errors.verificationDocs = "Upload verification document";
//           }
//         }
        
//         return { errors };
//       });
//     },

//     errors: {},

//     // Reset form
//     resetForm: () => {
//       localStorage.removeItem("addProjectForm");
//       set({
//         step: 1,
//         formData: {
//           title: "",
//           category: "",
//           description: "",
//           image: "",
//           fundingGoal: "",
//           currentFunds: "",
//           tasks: [],
//           verified: null,
//           verificationDocs: null,
//           implementationPlan: "",
//           impactMetrics: "",
//           timeline: "",
//         },
//         errors: {},
//       });
//     },
//   };
// });

// export default useAddProjectFormStore;





// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // const useProjectStore = create(
// //   persist(
// //     (set, get) => ({
// //       projects: [],
// //       myArk: [],

// //       formData: {
// //         title: "",
// //         category: "",
// //         description: "",
// //         image: "",
// //         fundingGoal: 0,
// //         currentFunds: 0,
// //         fesCoins: 0,  // No longer need dollars
// //         tasks: [],
// //         verified: false,
// //         verificationDocs: null,
// //         location: "",
// //         beneficiaries: "",
// //         completionDate: "",
// //         contactPerson: "",
// //         contactEmail: "",
// //         contactPhone: "",
// //       },

// //       step: 1,

// //       convertToFES: (usdAmount) => Math.floor(usdAmount * 90), // For backward compatibility, if needed.

// //       setStep: (step) => set({ step }),

// //       updateFormData: (field, value) =>
// //         set((state) => ({
// //           formData: { ...state.formData, [field]: value },
// //         })),

// //       addTask: (task) =>
// //         set((state) => ({
// //           formData: { ...state.formData, tasks: [...state.formData.tasks, task] },
// //         })),

// //       removeTask: (taskIndex) =>
// //         set((state) => ({
// //           formData: {
// //             ...state.formData,
// //             tasks: state.formData.tasks.filter((_, index) => index !== taskIndex),
// //           },
// //         })),

// //       finalizeProject: () => {
// //         set((state) => {
// //           const newProject = {
// //             id: Date.now().toString(),
// //             ...state.formData,
// //             fesCoins: state.formData.fundingGoal,  // Store funding in FES Coins
// //           };

// //           return {
// //             projects: [...state.projects, newProject],
// //             formData: {
// //               title: "",
// //               category: "",
// //               description: "",
// //               image: "",
// //               fundingGoal: 0,
// //               currentFunds: 0,
// //               fesCoins: 0,
// //               tasks: [],
// //               verified: false,
// //               verificationDocs: null,
// //               location: "",
// //               beneficiaries: "",
// //               completionDate: "",
// //               contactPerson: "",
// //               contactEmail: "",
// //               contactPhone: "",
// //             },
// //             step: 1,
// //           };
// //         });
// //       },

// //       updateProjectFunding: (projectId, amount, deductBudget = false) => {
// //         set((state) => {
// //           const updatedProjects = state.projects.map((project) => {
// //             if (project.id !== projectId) return project;

// //             const newFunds = Math.min(project.fundingGoal, project.currentFunds + amount);
// //             return {
// //               ...project,
// //               currentFunds: newFunds,
// //               fundingGoal: deductBudget ? Math.max(0, project.fundingGoal - amount) : project.fundingGoal,
// //             };
// //           });

// //           return { projects: updatedProjects };
// //         });
// //       },

// //       addProject: (newProject) => {
// //         set((state) => ({
// //           projects: [...state.projects, newProject],
// //         }));
// //       },
// //     }),
// //     {
// //       name: "project-store",
// //       getStorage: () => localStorage,
// //     }
// //   )
// // );

// // export default useProjectStore;
