import React from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";
import Footer from "../layout/Footer";
import ProjectCard from "../ProjectCard-UI/ProjectCard";
import MyArkPanel from "../MyArk/MyArkPanel";

const MyArk = () => {
  // Accessing 'myArkIds' (only project IDs) from Zustand store
  const myArkIds = useAddProjectFormStore((state) => state.myArkIds); // Get 'myArkIds' from the store
  const submittedProjects = useAddProjectFormStore((state) => state.submittedProjects); // Get all submitted projects

  // Filtering submitted projects to only include those in 'myArkIds'
  const myArkProjects = submittedProjects.filter((project) =>
    myArkIds.includes(project.id)
  );

  return (
    <div className="flex">
      <SideBar />
      <MainNavBar />

      <div className="relative flex w-full">
        {/* Fixed Panel */}
        <div className="myark-panel-wrapper fixed left-0 top-0 bottom-0 w-64 p-4 z-10">
          <MyArkPanel />
        </div>

        {/* Scrollable Project Cards */}
        <div className="project-cards-wrapper ml-96 w-full h-full overflow-y-visible p-24 ">
          {myArkProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-56">
              {myArkProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p>No projects added to MyArk yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyArk;
