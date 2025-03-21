import React, { memo } from "react";
import useProjectStore from "../../store/useProjectStore";
import ProjectCardButtons from "./ProjectCardButtons";
import ProgressBar from "./ProgressBar";

const ProjectCard = memo(({ projectId }) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) {
    return (
      <div className="p-4 border rounded-lg text-center text-red-500">
        Project Not Found
      </div>
    );
  }

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
        aria-label={`Category: ${project.category}`}
      >
        {project.category}
      </p>

      {/* Project Image */}
      <div className="w-full h-36 bg-gray-300 rounded-lg overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
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
        <ProgressBar progress={project.progress} />
      </div>

      {/* Buttons */}
      <ProjectCardButtons projectId={projectId} />

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3" aria-label={`Project description: ${project.description}`}>
        {project.description}
      </p>
    </div>
  );
});

export default ProjectCard;
