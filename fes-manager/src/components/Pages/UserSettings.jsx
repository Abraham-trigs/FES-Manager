import React from "react";
import Footer from "../Footer";
import ProjectListNavBar from "../ProjectFeed/ProjectListNavBar";
import SideBar from "../sideBar";

const UserSettings = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      {/* Sidebar for navigation */}
      <SideBar />

      {/* Navigation bar */}
      <ProjectListNavBar />

      <div className="flex-grow flex flex-col  items-center justify-center text-darkGreen z-10">
        <h2 className="text-2xl font-bold"> Settings Page </h2>
        <p>(Under Development)</p>
      </div>



      {/* Footer Section */}
      <Footer />
    </div>

    </>
    
  )
};

export default UserSettings;
