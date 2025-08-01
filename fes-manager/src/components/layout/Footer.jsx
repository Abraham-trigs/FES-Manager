import React from "react";

const Footer = () => {
  return (
    // Footer container positioned at the bottom of the screen
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Footer background and content */}
      <div>
        {/* Thin green line at the top of the footer */}
        <div className="w-full h-[2px] bg-cyanNeon dark:bg-cyaNeon "></div>

        {/* Main footer section with background and centered text */}
        <div className="w-full h-[30px] bg-darkGreen dark:bg-dark flex justify-center items-center">
          <p className="text-cyanNeon dark:text-clear text-[0.5rem] ">
            <span className="text-white">FES-Manager + TymUp:</span> Funding
            hope. Building futures. Together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
