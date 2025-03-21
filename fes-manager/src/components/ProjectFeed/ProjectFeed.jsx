import React, { memo } from "react";
import useProjectStore from "../../store/useProjectStore";

const ProjectCard = memo(({ category, projectId, progress, description, image }) => {
  const { wishlist, toggleWishlist } = useProjectStore();
  const isWishlisted = wishlist.includes(projectId);

  return (
    <div
      className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md"
      role="region"
      aria-labelledby={`project-${projectId}`}
    >
      {/* Category */}
      <p
        id={`project-${projectId}`}
        className="text-xs font-semibold text-gray-700 uppercase"
        aria-label={`Category: ${category}`}
      >
        {category}
      </p>

      {/* Project Image */}
      <div className="w-full h-36 bg-gray-300 rounded-lg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`Project ${projectId}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium" aria-label={`Project ID: ${projectId}`}>
          ID-{projectId}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1" aria-hidden="true">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            aria-label={`Progress: ${progress}%`}
          ></div>
        </div>
      </div>

      {/* Buttons */}
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

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3" aria-label={`Project description: ${description}`}>
        {description}
      </p>
    </div>
  );
});

export default ProjectCard;
