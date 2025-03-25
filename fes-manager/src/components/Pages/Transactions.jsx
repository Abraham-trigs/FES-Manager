import React from "react";
import Footer from "../layout/Footer";
import MainNavBar from "../layout/MainNavBar";
import SideBar from "../layout/SideBar";

const Transactions = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      {/* Sidebar for navigation */}
      <SideBar />

      {/* Navigation bar */}
      <MainNavBar />

      <div className="flex-grow flex flex-col  items-center justify-center text-darkGreen z-10">
        <h2 className="text-2xl font-bold"> Transaction Page </h2>
        <p>(Under Development)</p>
      </div>


      {/* Footer Section */}
      <Footer />
    </div>

    </>
    
  )
};

export default Transactions;
