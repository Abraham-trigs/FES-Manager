import React from "react";

// HamburgerMenu component - A button to toggle the sidebar menu
const HamburgerMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <button
      className="fixed top-4 right-4 z-[110] p-2 bg-darkGreen text-white rounded-md"
      onClick={toggleSidebar} // Calls the toggleSidebar function when clicked
    >
      <div className="w-6 h-6 flex flex-col justify-between">
        {/* Top bar - Rotates and moves down when menu is open */}
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        
        {/* Middle bar - Hides when menu is open */}
        <span
          className={`block h-1 w-full bg-white rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        
        {/* Bottom bar - Rotates and moves up when menu is open */}
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;
