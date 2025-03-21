import React from 'react';

const WelcomeNavBar = () => {
  return (
    <>
      <div className="relative">
        {/* Logo positioned at the top left */}
        <div className="absolute top-2 left-4">
          <img src="/images/logo.png" 
            alt="logo" 
            className="w-[10%] h-auto" />
            
        <p>How it Works</p>
        </div>

        {/* Header background */}
        <div>
          <div className="w-full h-16 bg-darkGreen mx-auto"></div>
          <div className="w-full h-[5px] bg-greenNeon mx-auto m-[3]"></div>
        </div>
      </div>
    </>
  );
};

export default WelcomeNavBar;
