import { create } from "zustand";

const useProjectStore = create((set) => ({
  wishlist: [],
  toggleWishlist: (projectId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(projectId)
        ? state.wishlist.filter((id) => id !== projectId)
        : [...state.wishlist, projectId],
    })),
}));

export default useProjectStore;
