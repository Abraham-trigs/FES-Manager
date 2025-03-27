import React, { memo } from "react";
import { Link } from "react-router-dom"; 
import useProjectStore from "../../store/ProjectStore";
import ProgressBar from "./ProgressBar";
import ProjectCardButtons from "./ProjectCardButtons";

const ProjectCard = memo(({ projectId, isInMyArkPage }) => {
  // Retrieves project data from the store based on projectId
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  // Prevents rendering if the project does not exist
  if (!project) return null;

  return (
    // Container for the project card
    <div
      className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md"
      role="region"
      aria-labelledby={`project-${projectId}`}
    >
      {/* Displays the category of the project */}
      <p
        id={`project-${projectId}`}
        className="text-xs font-semibold text-gray-700 uppercase"
        aria-label={`Category: ${project.category}`}
      >
        {project.category}
      </p>

      {/* Displays project image if available */}
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

      {/* Displays project ID and progress */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium" aria-label={`Project ID: ${projectId}`}>
          ID-{projectId}
        </p>
        <ProgressBar progress={project.progress} />
      </div>

      {/* Renders project interaction buttons (wishlist, FES Aid, delete if in MyArk) */}
      <ProjectCardButtons projectId={projectId} isInMyArkPage={isInMyArkPage} />

      {/* Displays a short project description */}
      <p className="text-sm text-gray-700 mt-3" aria-label={`Project description: ${project.description}`}>
        {project.description}
      </p>

      {/* Navigates to the full project details page */}
      <Link
        to={`/project/${project.id}`}
        className="mt-4 inline-block bg-blue-500 text-white py-1 px-3 rounded"
      >
        Details
      </Link>
    </div>
  );
});

export default ProjectCard;
