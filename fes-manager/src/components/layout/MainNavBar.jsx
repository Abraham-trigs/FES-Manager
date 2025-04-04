import React from 'react';
import HamburgerMenu from './HamburgerMenu';

const MainNavBar = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="w-full h-[65px] bg-semiGreen dark:bg-dark fixed top-0 left-0 right-0 flex items-center px-2 z-50">
        
        
        {/* Centered Content with Flex Grow */}
        <div className="flex flex-row justify-betwee items-center space-x-3 mr-[-40px]" >
          <div>
            <img src="../images/logo.png" alt="FES logo" className='h-[35px] w-auto'/> 
          </div>


          {/* Filter */}
          <img className='h-[15px] w-auto ' src="../public/images/Filtre.png" alt="filtre symbol"  />  

          {/* Search Bar */}
          <input 
            type="search" 
            placeholder="Account Name or Project ID..." 
            className=" py-3 rounded-md border border-gray-300 dark:border-verydark dark:bg-verydark w-[55%] h-7 focus:outline-none" 
          />
  
          {/* Live Indicator with Circle */}
          <div className="flex items-center space-x-2 ">
            {/* Small Circle */}
            <div className="w-3 h-3 bg-[#1ff72a]  rounded-full "></div>
            {/* LIVE Text */}
            <p className="hidden text-greenNeon font-semibold text-[min{10vw,70px}]">LIVE</p>
          </div>
        </div>

      </div>

      <div>
        
        <HamburgerMenu />
      </div>


      {/* Offset for Fixed Navbar to Prevent Content Overlap */}
      <div className="h-[73px]"></div>
      <div className=" dark:bg-cyaNeon w-full h-[3px] bg-greenNeon mx-auto -mt-[8.5px]"></div>

      
      {/* Green Neon Line Below Navbar */}
    </>
  );
}

export default MainNavBar;
