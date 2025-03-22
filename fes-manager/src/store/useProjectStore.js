import { create } from "zustand";

// Zustand store for managing project data and wishlist
const useProjectStore = create((set, get) => ({
  // Initializes projects state from localStorage or defaults to an empty array
  projects: JSON.parse(localStorage.getItem("projects") || "[]"),

  // Initializes wishlist state from localStorage or defaults to an empty array
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),

  // Adds a new project to the store and updates localStorage
  addProject: (newProject) => {
    set((state) => {
      const updatedProjects = [...state.projects, newProject];

      // Save updated projects to localStorage
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      return { projects: updatedProjects };
    });
  },

  // Toggles a project in the wishlist (adds or removes)
  toggleWishlist: (projectId) => {
    set((state) => {
      const updatedWishlist = state.wishlist.includes(projectId)
        ? state.wishlist.filter((id) => id !== projectId) // Remove from wishlist
        : [...state.wishlist, projectId]; // Add to wishlist

      // Save updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      return { wishlist: updatedWishlist };
    });
  },
}));

export default useProjectStore;
