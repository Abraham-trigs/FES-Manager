import React from "react";
import useProjectStore from "../store/useProjectStore";

const ProjectCard = ({ category, projectId, progress, description, image }) => {
  const { wishlist, toggleWishlist } = useProjectStore();
  const isWishlisted = wishlist.includes(projectId);

  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-xl">
      {/* Category */}
      <p className="text-xs font-semibold text-gray-700 uppercase">{category}</p>

      {/* Project Image */}
      <div className="w-full h-36 bg-gray-300 rounded-lg overflow-hidden">
        {image ? (
          <img src={image} alt={category} className="w-full h-full object-cover" />
        ) : null}
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium">ID-{projectId}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-3">
        <button className="bg-darkGreen text-white text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-green-700">
          FES Aid
        </button>
        <button
          className={`text-lg px-3 py-1 rounded-lg transition-all duration-300 ${
            isWishlisted
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => toggleWishlist(projectId)}
        >
          {isWishlisted ? "✓" : "+"}
        </button>
        <button className="bg-cyanNeon text-darkGreen text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:bg-cyan-500 hover:text-white">
          Details
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3">{description}</p>
    </div>
  );
};

export default ProjectCard;
