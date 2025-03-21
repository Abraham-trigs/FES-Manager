import React from 'react';

const WelcomeNavBar = () => {
  return (
    <>
      <div className="relative bg-green">
        
        {/* Logo & Text*/}
        <div className="absolute top-3 left-4 flex items-center space-x-4">
          <img src="/images/logo.png" 
               alt="logo" 
               className="w-[10%] h-auto" />

          <p className="text-cyanNeon text-lg font-semibold">
            How it Works
          </p>
        </div>

        {/* Header background */}
        <div>
          <div className="w-full h-[70px] bg-darkGreen mx-auto"></div>
          <div className="w-full h-[5px] bg-greenNeon mx-auto m-[3]"></div>
        </div>
        
      </div>
    </>
  );
};

export default WelcomeNavBar;
