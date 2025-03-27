import React, { memo } from "react";
import { Link } from "react-router-dom";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import ProgressBar from "./ProgressBar";
import ProjectCardButtons from "./ProjectCardButtons";

const ProjectCard = memo(({ projectId }) => {
  const project = useAddProjectFormStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) return null;

  // Calculate donation percentage directly
  const progress = (project.currentFunds / project.fundingGoal) * 100;

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md">
      <p className="text-xs font-semibold text-gray-700 uppercase">
        {project.category || "Uncategorized"}
      </p>

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

      <div className="mt-3">
        <p className="text-sm text-gray-700 font-medium">ID-{projectId}</p>
        <ProgressBar progress={progress} />
      </div>

      <p className="text-sm font-semibold text-gray-900 mt-2">
        Total Budget: <span className="text-blue-500">{project.fesCoins} FES Coins</span>
      </p>

      <ProjectCardButtons projectId={projectId} />

      <p className="text-sm text-gray-700 mt-3">
        {project.description || "No description available."}
      </p>

      <Link
        to={`/project/${project.id}`}
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 transition text-white py-1 px-3 rounded"
      >
        Details
      </Link>
    </div>
  );
});

export default ProjectCard;
