import React from "react";
import { useParams } from "react-router-dom";
import useProjectStore from "../../store/useProjectStore";

const ProjectDetails = () => {
  // Retrieves the project ID from the URL parameters
  const { id } = useParams();

  // Fetches the project data from the store based on the retrieved ID
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === id)
  );

  // Displays a message if the project is not found
  if (!project) return <p>Project not found.</p>;

  return (
    // Container for project details
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Displays the project title */}
      <h2 className="text-3xl font-bold">{project.title}</h2>

      {/* Displays the project category */}
      <p className="text-gray-600">{project.category}</p>

      {/* Displays the project description */}
      <p className="mt-2">{project.description}</p>

      {/* Displays the project image if available */}
      {project.image && (
        <img src={project.image} alt={project.title} className="mt-4 rounded-lg" />
      )}
    </div>
  );
};

export default ProjectDetails;
