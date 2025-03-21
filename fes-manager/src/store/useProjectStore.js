import { create } from "zustand";

const useProjectStore = create((set, get) => ({
  wishlist: [],

  // Toggle wishlist
  toggleWishlist: (projectId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(projectId)
        ? state.wishlist.filter((id) => id !== projectId)
        : [...state.wishlist, projectId],
    })),

  // Load projects from localStorage safely
  projects: (() => {
    try {
      return JSON.parse(localStorage.getItem("projects")) || [];
    } catch (error) {
      console.error("Error loading projects from localStorage:", error);
      return [];
    }
  })(),
  isLoaded: false,

  // Function to load projects and store in Zustand & localStorage
  loadProjects: async () => {
    if (get().isLoaded) return;

    try {
      const response = await fetch("/projects.json");
      const data = await response.json();

      set({ projects: data, isLoaded: true });
      localStorage.setItem("projects", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  },

  // Function to add a new project dynamically
  addProject: (newProject) => {
    set((state) => {
      const updatedProjects = [newProject, ...state.projects];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects, isLoaded: true };
    });
  },
}));

export default useProjectStore;
