import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";
import UserProfileSettingsPanel from "../UserProfileSetting/UserProfileSettingsPanel";


const UserProfileSettings = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade 
      -z-10 dark:bg-dark"></div>

      {/* Sidebar for navigation */}
      <SideBar />

      {/* Navigation bar */}
      <MainNavBar />
      <UserProfileSettingsPanel />
      
      {/* Footer Section */}
      <Footer />
    </div>

    </>
    
  )
};

export default UserProfileSettings;
