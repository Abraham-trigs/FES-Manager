import { create } from "zustand";

const useProfileSettingStore = create((set) => ({
    activeTab: "Personal Information", // ✅ Added activeTab
    setActiveTab: (tab) => set({ activeTab: tab }), // ✅ Added setActiveTab

    userData: {
        fullName: "",
        email: "",
        phone: "",
        country: "",
        theme: "Light Mode",
        fontSize: "Medium",
        notifications: {
            email: true,
            sms: false,
        },
        projectFeedSort: "Latest",
        showSupportedProjects: false,
        hideDonations: false,
        anonymousContributions: false,
        donationPreferences: {
            presetAmounts: [10, 50, 100],
            recurring: "None",
        },
        language: "English",
        currency: "USD",
    },
    updateUserData: (field, value) =>
        set((state) => ({
            userData: { ...state.userData, [field]: value },
        })),
}));

export default useProfileSettingStore;
