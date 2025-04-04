import React from 'react';

const WelcomeNavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-0">
      
      {/* Logo & Text */}
      <div className="absolute top-3 left-2 flex items-center space-x-1">
        <img src="/images/logo.png" 
             alt="logo" 
             className="w-[10%] h-auto" />

        <p className="text-cyanNeon font-semibold text-[0.6rem]">
          How it Works
        </p>
      </div>

      {/* Header background */}
      <div>
        <div className="w-full h-[50px] bg-darkGreen mx-auto dark:bg-dark"></div>
        <div className="w-full h-[2px] bg-greenNeon dark:bg-cyaNeon 
        mx-auto m-[3]"></div>
      </div>
      
    </div>
  );
};

export default WelcomeNavBar;
