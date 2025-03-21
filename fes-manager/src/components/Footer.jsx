import React from 'react';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full">

      
      {/* Footer background */}
      <div>
        <div className="w-full h-[3px] bg-greenNeon"></div>
        <div className="w-full h-[50px] bg-darkGreen flex justify-center items-center">
          <p className="text-cyanNeon text-lg text-[0.5rem]">
            &copy; 2025 powered by LEGEND FOUNDATION
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
