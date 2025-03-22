import React from "react";
import Footer from "../Footer";
import ProjectListNavBar from "./ProjectListNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useProjectStore from "../../store/useProjectStore";
import SideBar from "../sideBar";

export const ProjectListPage = () => {
  // Retrieves the list of projects from the global state
  const projects = useProjectStore((state) => state.projects);

  return (
    <>
      <div className="bg-shade">
        {/* Sidebar for navigation and user actions */}
        <SideBar />

        {/* Navigation bar for project listings */}
        <ProjectListNavBar />

        {/* Displays the list of projects or a message if no projects are available */}
        <div className="flex flex-wrap gap-4 p-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} projectId={project.id} />
            ))
          ) : (
            <p>No projects yet. Create one!</p>
          )}
        </div>

        {/* Footer section */}
        <Footer />
      </div>
    </>
  );
};
