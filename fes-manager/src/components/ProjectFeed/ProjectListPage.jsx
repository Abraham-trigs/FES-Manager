import React, { useEffect } from "react";
import Footer from "../Footer";
import ProjectListNavBar from "./ProjectListNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useProjectStore from "../../store/useProjectStore";
import SideBar from "../sideBar";

export const ProjectListPage = () => {
  const { projects, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects(); // Load projects when page loads
  }, [loadProjects]);

  return (
    <>
      <SideBar />
      <ProjectListNavBar />
      <div className="flex flex-wrap gap-4 p-5">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} projectId={project.id} />
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
      <Footer />
    </>
  );
};
