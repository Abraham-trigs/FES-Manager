import { create } from "zustand";

const useProjectFormStore = create((set) => ({
  step: 1, // Controls form steps
  formData: {
    title: "",
    category: "",
    description: "",
    image: "",
    fundingGoal: "",
    currentFunds: "",
    tasks: [],
    verified: false,
    verificationDocs: null,
    location: "",
    beneficiaries: "",
    completionDate: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    // Implementation details (based on category)
    schoolName: "",
    schoolAddress: "",
    schoolContactPerson: "",
    schoolEmail: "",
    schoolPhone: "",
    organizationName: "",
    organizationAddress: "",
    organizationContactPerson: "",
    organizationEmail: "",
    organizationPhone: "",
  },
  setStep: (step) => set({ step }),
  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
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
}));

export default useProjectFormStore;
