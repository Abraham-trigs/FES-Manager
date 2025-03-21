import React, { memo } from "react";
import ProgressBar from "./ProgressBar";
import ProjectCardButtons from "./ProjecCardtButtons";

const ProjectCard = memo(({ category, projectId, progress, description, image }) => {
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
        <ProgressBar progress={progress} />
      </div>

      {/* Buttons */}
      <ProjectCardButtons projectId={projectId} />

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3" aria-label={`Project description: ${description}`}>
        {description}
      </p>
    </div>
  );
});

export default ProjectCard;
