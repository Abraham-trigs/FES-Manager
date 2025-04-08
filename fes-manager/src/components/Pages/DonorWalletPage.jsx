import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";
import DonorWalletPanel from "../payment/DonorWalletPanel";



const DonorWalletPage = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      {/* Sidebar for navigation */}
      <SideBar />

      {/* Navigation bar */}
      <MainNavBar />

      <DonorWalletPanel />
      {/* Footer Section */}
      <Footer />
    </div>

    </>
    
  )
}

export default DonorWalletPage;
