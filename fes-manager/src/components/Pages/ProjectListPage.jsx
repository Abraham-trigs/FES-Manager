import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import SideBar from "../layout/SideBar";

export const ProjectListPage = () => {
  // Get submitted projects from global store
  const projects = useAddProjectFormStore((state) => state.submittedProjects) || [];

  // Remove duplicate projects by ID
  const uniqueProjects = [
    ...new Map(projects.map((project) => [project.id, project])).values(),
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* Full-page background layer */}
      <div className="absolute min-h-screen w-full bg-shade dark:bg-dark z-10"></div>

      {/* Sidebar - z-50 so it stays above everything */}
      <SideBar />

      {/* Navbar - usually fixed or sticky */}
      <MainNavBar />

      {/*  Main content area */}
      <div
        className="
          pt-[10px]                            // Push down from navbar
          pl-[140px]                           // Offset for sidebar
          flex flex-wrap gap-64 gap-y-[450px]  // Space between cards
          items-start
          relative z-10                        // Ensure content shows above background
        "
      >
        {uniqueProjects.length > 0 ? (
          uniqueProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <></>
          // <p className="text-gray-600 dark:text-text">No projects yet. Create one!</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectListPage;
