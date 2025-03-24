import { create } from "zustand";

// Zustand store for managing profile settings
const useProfileSettingStore = create((set) => ({
    // Active tab for profile settings section
    activeTab: "Personal Information", // Sets the initial active tab to "Personal Information"
    setActiveTab: (tab) => set({ activeTab: tab }), // Function to update the active tab

    // User data state containing various preferences and settings
    userData: {
        fullName: "",
        email: "",
        phone: "",
        country: "",
        theme: "Light Mode", // Default theme is Light Mode
        fontSize: "Medium", // Default font size is Medium
        notifications: {
            email: true, // Email notifications are enabled by default
            sms: false,  // SMS notifications are disabled by default
        },
        projectFeedSort: "Latest", // Default project feed sorting is by latest
        showSupportedProjects: false, // By default, supported projects are hidden
        hideDonations: false, // Donations are visible by default
        anonymousContributions: false, // Anonymous contributions are disabled by default
        donationPreferences: {
            presetAmounts: [10, 50, 100], // Default preset donation amounts
            recurring: "None", // No recurring donation by default
        },
        language: "English", // Default language is English
        currency: "USD", // Default currency is USD
    },

    // Function to update a specific field in the user data
    updateUserData: (field, value) =>
        set((state) => ({
            userData: { ...state.userData, [field]: value }, // Update the user data with the new value
        })),
}));

export default useProfileSettingStore;
