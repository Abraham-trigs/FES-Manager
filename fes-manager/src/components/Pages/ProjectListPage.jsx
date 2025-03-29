import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import SideBar from "../layout/SideBar";

export const ProjectListPage = () => {
  // Retrieves the list of projects from the global state
  const projects = useAddProjectFormStore((state) => state.projects);

  // Ensure projects exist and filter out duplicates
  const uniqueProjects = Array.isArray(projects) 
    ? projects.reduce((acc, project) => {
        if (!acc.some((p) => p.id === project.id)) {
          acc.push(project);
        }
        return acc;
      }, [])
    : [];

  return (
    <div className="relative min-h-screen">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-50"></div>

      {/* Sidebar for navigation and user actions */}
      <SideBar />

      {/* Navigation bar for project listings */}
      <MainNavBar />

      {/* Displays the list of projects or a message if no projects are available */}
      <div className="mt-4 grid grid-rows-2 gap-9">
        {uniqueProjects.length > 0 ? (
          // If there are projects, display each one using ProjectCard
          uniqueProjects.map((project) => (
            <ProjectCard key={project.id} projectId={project.id} />
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
