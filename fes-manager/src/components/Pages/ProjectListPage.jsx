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

  // Reverse the order of uniqueProjects so that the newest project appears first
  const sortedProjects = uniqueProjects.reverse();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* Full-page background layer */}
      <div className="absolute min-h-screen w-full bg-shade dark:bg-dark bg-fixed z-10"></div> {/* Added bg-fixed for stable background */}

      {/* Sidebar - z-50 so it stays above everything */}
      <SideBar />

      {/* Navbar - usually fixed or sticky */}
      <MainNavBar />

      {/* Main content area */}
      <div
        className="pt-[10px]                            // Push down from navbar
          pl-[140px]                           // Offset for sidebar
          flex flex-wrap gap-64 gap-y-[1xz/......50px]  // Space between cards
          items-start
          relative z-10                        // Ensure content shows above background
          h-screen                            // Set height to ensure the content area fills the screen
          overflow-y-auto                      // Enable vertical scrolling for the project cards
        "
      >
        {sortedProjects.length > 0 ? (
          sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          // You can add a fallback message here if no projects exist
          <p className="text-gray-600 dark:text-text">No projects yet. Create one!</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectListPage;
