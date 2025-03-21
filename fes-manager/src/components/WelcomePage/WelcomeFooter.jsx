import React from 'react';

const WelcomeFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      {/* Footer background */}
      <div>
        <div className="w-full h-[5px] bg-greenNeon"></div>
        
        {/* Centered Text */}
        <div className="w-full h-[50px] bg-darkGreen flex justify-center items-center">
          <p className="text-cyanNeon text-lg font-semibold text-[0.7rem]">
            &copy; 2025 powered by LEGEND FOUNDATION
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFooter;
