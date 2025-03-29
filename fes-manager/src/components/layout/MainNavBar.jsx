import React from 'react';
import HamburgerMenu from './HamburgerMenu';

const MainNavBar = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="w-full h-[70px] bg-semiGreen fixed top-0 left-0 right-0 flex items-center px-2 z-50">
        
        {/* Logo Positioned to the Far Left */}
        <div className="absolute left-2">
          <img src="../images/logo.png" alt="FES logo" className='h-[35px] w-auto'/> 
        </div>
        
        {/* Centered Content with Flex Grow */}
        <div className="flex flex-grow justify-center space-x-7 items-center">

          {/* Filter */}
          <img className='h-[15px] w-auto -mr-2' src="../public/images/Filtre.png" alt="filtre symbol"  />  

          {/* Search Bar */}
          <input 
            type="search" 
            placeholder="Account Name or Project ID..." 
            className=" py-3 rounded-md border border-gray-300 w-[55%] h-9 focus:outline-none" 
          />
  
          {/* Live Indicator with Circle */}
          <div className="flex items-center space-x-2 ">
            {/* Small Circle */}
            <div className="w-3 h-3 bg-orange-500 rounded-full -ml-[20px]"></div>
            {/* LIVE Text */}
            <p className="hidden text-greenNeon font-semibold text-[min{10vw,70px}]">LIVE</p>
            </div>

            <div className=' '>
            <HamburgerMenu />
            </div>
        </div>
      </div>

      {/* Offset for Fixed Navbar to Prevent Content Overlap */}
      <div className="h-[73px]"></div>
      
      {/* Green Neon Line Below Navbar */}
      <div className="w-full h-[3px] bg-greenNeon mx-auto -mt-[2.3px]"></div>
    </>
  );
}

export default MainNavBar;
