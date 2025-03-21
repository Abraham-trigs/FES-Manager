import React from 'react';

const ProjectFeedNavBar = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="w-full h-[70px] bg-green mx-auto flex items-center px-4 justify-center space-x-6">
        
        {/* Filter Text */}
        <p className="text-light font-semibold text-[1.2rem]">Filtre</p>

        {/* Search Bar */}
        <input 
          type="search" 
          placeholder="Account Name or Project ID..." 
          className="px-4 py-2 rounded-md border border-gray-300 w-[50%] focus:outline-none" 
        />

        {/* Live Indicator with Circle */}
        <div className="flex items-center space-x-2 -ml-2">
          {/* Small Circle */}
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          {/* LIVE Text */}
          <p className="text-greenNeon font-semibold text-[1.2rem]">LIVE</p>
        </div>

      </div>

      {/* Green Neon Line Below Navbar */}
      <div className="w-full h-[3px] bg-greenNeon mx-auto"></div>
    </>
  );
}

export default ProjectFeedNavBar;
