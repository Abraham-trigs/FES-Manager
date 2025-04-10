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
    <div>
      <SideBar />
      <MainNavBar />

      <div className="myark-container">
        {myArkProjects.length > 0 ? (
          myArkProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>No projects added to MyArk yet.</p>
        )}
      </div>
      <MyArkPanel />

      <Footer />
    </div>
  );
};

export default MyArk;
