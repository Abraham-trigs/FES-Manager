import React from "react";

const ProgressBar = ({ progress }) => {
  // Determine color based on progress
  const getColor = (progress) => {
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-5 mt-2 relative">
      {/* Progress Bar */}
      <div
        className={`${getColor(progress)} h-5 rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${progress}%` }}
        aria-label={`Progress: ${progress}%`}
      ></div>
      
      {/* Numeric Progress Display */}
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
