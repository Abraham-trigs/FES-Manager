import React from "react";
import useProjectStore from "../store/useProjectStore";

const ProjectCardButtons = ({ projectId }) => {
  const { wishlist, toggleWishlist } = useProjectStore();
  const isWishlisted = wishlist.includes(projectId);

  return (
    <div className="flex items-center justify-between mt-3">
      <button
        className="bg-darkGreen text-white text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-green-700"
        aria-label="Support this project via FES Aid"
      >
        FES Aid
      </button>
      <button
        className={`text-lg px-3 py-1 rounded-lg transition-all duration-300 ${
          isWishlisted
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => toggleWishlist(projectId)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? "✓" : "+"}
      </button>
      <button
        className="bg-cyanNeon text-darkGreen text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-cyan-500 hover:text-white"
        aria-label="View project details"
      >
        Details
      </button>
    </div>
  );
};

export default ProjectCardButtons;
