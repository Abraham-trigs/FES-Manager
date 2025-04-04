import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import SideBar from "../layout/SideBar";

export const ProjectListPage = () => {
  // Retrieves the list of projects from the global state with a fallback to an empty array
  const projects = useAddProjectFormStore((state) => state.submittedProjects) || [];

  // Filter out duplicates based on project ID using Map for better performance
  const uniqueProjects = [
    ...new Map(projects.map((project) => [project.id, project])).values(),
  ];

  return (
    <div className="relative min-h-screen">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade dark:bg-dark -z-50"></div>

      {/* Sidebar for navigation and user actions */}
      <SideBar />

      {/* Navigation bar for project listings */}
      <MainNavBar />

      {/* Displays the list of projects or a message if no projects are available */}
      <div className="mt-4 grid grid-rows-6 gap-[440px] items-start">
        {uniqueProjects.length > 0 ? (
          // Pass the full project object instead of just projectId
          uniqueProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          // If no projects are available
          <p className="text-gray-600">No projects yet. Create one!</p>
        )}
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );


};

export default ProjectListPage;
