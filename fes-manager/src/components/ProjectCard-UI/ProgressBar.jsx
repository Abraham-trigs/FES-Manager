import React from "react";

const ProgressBar = ({ progress = 0 }) => {
  const clampedProgress = Math.min(100, Math.max(0, isNaN(progress) ? 0 : progress));

  const displayProgress = clampedProgress.toFixed(2);

  const getColor = (value) => {
    if (value < 33) return "bg-red-500";
    if (value < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-5 mt-2 relative overflow-hidden">
      <div
        className={`${getColor(clampedProgress)} h-5 rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${clampedProgress}%` }}
        aria-label={`Progress: ${displayProgress}%`}
      ></div>

      <span
        className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${clampedProgress > 75 ? "text-white" : "text-black"}`}
      >
        {displayProgress}%
      </span>
    </div>
  );
};

export default ProgressBar;
