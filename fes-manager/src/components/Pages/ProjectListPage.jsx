import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import SideBar from "../layout/SideBar";
import ProjectContainer from "../ProjectCard-UI/ProjectContainer";
export const ProjectListPage = () => {
  const projects = useAddProjectFormStore((state) => state.submittedProjects) || [];

  const uniqueProjects = [
    ...new Map(projects.map((project) => [project.id, project])).values(),
  ];

  const sortedProjects = uniqueProjects.reverse();

  return (
    <>
      <SideBar />

      <ProjectContainer>
        {sortedProjects.length > 0 ? (
          [...sortedProjects]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((project) => (
              <div key={project.id} className="relative">
                <ProjectCard project={project} />
              </div>
            ))
        ) : (
          <p className="text-gray-600 dark:text-text">
            No projects yet. Create one!
          </p>
        )}
      </ProjectContainer>

      <div className="fixed min-h-screen w-full bg-shade dark:bg-dark bg-fixed z-10"></div>
      <MainNavBar />
      <Footer />
    </>
  );
};

export default ProjectListPage;
