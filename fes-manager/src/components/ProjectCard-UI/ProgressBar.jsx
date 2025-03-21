import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    // Wrapper for the progress bar
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1" aria-hidden="true">
      
      {/* Represents the progress visually based on the given percentage */}
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
        aria-label={`Progress: ${progress}%`}
      ></div>
    </div>
  );
};

export default ProgressBar;
