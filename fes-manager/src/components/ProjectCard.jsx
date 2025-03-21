import React from "react";

const ProjectCard = () => {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg overflow-hidden p-4">
      {/* Category */}
      <p className="text-xs font-semibold text-gray-700 uppercase">Education</p>

      {/* Image Placeholder */}
      <div className="w-full h-36 bg-gray-300 rounded-lg"></div>

      {/* Progress Bar */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium">ID-2345624</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-3">
        <button className="bg-darkGreen text-white text-xs px-4 py-1 rounded-lg">
          FES Aid
        </button>
        <button className="bg-gray-200 text-gray-700 text-lg px-3 py-1 rounded-lg">
          +
        </button>
        <button className="bg-cyanNeon text-darkGreen text-xs px-4 py-1 rounded-lg">
          Details
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3">
        With your support, Sarah can afford school fees and learning materials to...
      </p>
    </div>
  );
};

export default ProjectCard;
