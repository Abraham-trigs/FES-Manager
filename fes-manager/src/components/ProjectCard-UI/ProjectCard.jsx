import React, { memo } from "react";
import { Link } from "react-router-dom";
import useProjectStore from "../../store/ProjectStore";
import ProgressBar from "./ProgressBar";
import ProjectCardButtons from "./ProjectCardButtons";

const ProjectCard = memo(({ projectId }) => {
  // Get project data from the store
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) return null;

  return (
    <div
      className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden p-4 
      transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md"
    >
      {/* Project Category */}
      <p className="text-xs font-semibold text-gray-700 uppercase">
        {project.category || "Uncategorized"}
      </p>

      {/* Project Image or Fallback */}
      <div className="w-full h-36 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={`Project ${projectId}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-500 text-xs">No Image Available</span>
        )}
      </div>

      {/* Project ID and Progress */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium">ID-{projectId}</p>
        <ProgressBar progress={project.progress ?? 0} />
      </div>

      {/* Project Budget */}
      <p className="text-sm font-semibold text-gray-900 mt-2">
        Total Budget: <span className="text-blue-500">${project.fundingGoal || "N/A"}</span>
      </p>

      {/* Interaction Buttons */}
      <ProjectCardButtons projectId={projectId} />

      {/* Project Description */}
      <p className="text-sm text-gray-700 mt-3">
        {project.description || "No description available."}
      </p>

      {/* Project Details Button */}
      <Link
        to={`/project/${project.id}`}
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 transition 
        text-white py-1 px-3 rounded"
      >
        Details
      </Link>
    </div>
  );
});

export default ProjectCard;
