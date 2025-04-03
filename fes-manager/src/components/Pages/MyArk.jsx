import React from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";
import Footer from "../layout/Footer";
import ProjectCard from "../ProjectCard-UI/ProjectCard";

const MyArk = () => {
  const myArk = useAddProjectFormStore((state) => state.myArk);

  return (
    <div>
      <SideBar />
      <MainNavBar />

      <div className="myark-container">
        {myArk.length > 0 ? (
          myArk.map((project) => <ProjectCard key={project.id} project={project} />) // Render each project
        ) : (
          <p>No projects added to MyArk yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyArk;
