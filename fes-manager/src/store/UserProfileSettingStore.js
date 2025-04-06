import { create } from "zustand";

// Zustand store for managing user profile settings and preferences
const useProfileSettingStore = create((set) => ({
  // The currently selected tab in the profile settings UI
  activeTab: "Personal Information",

  // Setter function to update the active tab
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Default user data and preferences
  userData: {
    fullName: "",                  // User's full name
    email: "",                     // Email address
    phone: "",                     // Phone number
    country: "",                   // Country selection
    theme: "Light Mode",           // UI theme: "Light Mode" or "Dark Mode"
    fontSize: "Medium",            // Font size preference
    notifications: {
      email: true,                 // Enable email notifications
      sms: false,                  // Disable SMS notifications
    },
    projectFeedSort: "Latest",     // Sorting method for project feed
    showSupportedProjects: false, // Whether to show supported projects
    hideDonations: false,         // Whether to hide donation history
    anonymousContributions: false,// Whether user contributes anonymously
    donationPreferences: {
      presetAmounts: [10, 50, 100], // Preset donation options
      recurring: "None",            // Recurring donation setting
    },
    language: "English",          // Preferred UI language
    currency: "USD",              // Preferred currency
  },

  /**
   * Updates a single field within userData.
   * Special case: when updating the theme, also apply it to the DOM
   * and store it in localStorage for persistence.
   */
  updateUserData: (field, value) =>
    set((state) => {
      const updatedUserData = { ...state.userData, [field]: value };

      if (field === "theme") {
        localStorage?.setItem("theme", value); // Save selected theme
        setThemeClass(value);                  // Apply theme to DOM
      }

      return { userData: updatedUserData };
    }),

  /**
   * Initializes the UI theme based on value stored in localStorage.
   * This should be called on app load (client-side only).
   */
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "Light Mode";

      set((state) => {
        const updatedUserData = { ...state.userData, theme: savedTheme };
        setThemeClass(savedTheme); // Apply stored theme to DOM
        return { userData: updatedUserData };
      });
    }
  },
}));

/**
 * Utility function to apply the selected theme class
 * to the root HTML element (used by Tailwind CSS)
 */
function setThemeClass(theme) {
  if (theme === "Dark Mode") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export default useProfileSettingStore;
