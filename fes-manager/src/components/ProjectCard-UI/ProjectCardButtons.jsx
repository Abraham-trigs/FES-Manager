import React, { useCallback } from "react";
import useProjectStore from "../../store/ProjectStore";

const ProjectCardButtons = ({ projectId, isInMyArkPage }) => {
  const toggleMyArk = useProjectStore((state) => state.toggleMyArk);
  const myArk = useProjectStore((state) => state.myArk);

  // Check if the project is in MyArk
  const isInMyArk = myArk.includes(projectId);

  // Handle Adding/Removing Project from MyArk
  const handleMyArkToggle = useCallback(() => {
    toggleMyArk(projectId);
  }, [toggleMyArk, projectId]);

  return (
    <div className="flex justify-between mt-2">
      {/* If in MyArk, show delete button */}
      {isInMyArkPage ? (
        <button
          onClick={handleMyArkToggle}
          className="p-2 bg-red-500 text-white rounded"
          aria-label="Remove from MyArk"
        >
          🗑️
        </button>
      ) : (
        // Otherwise, show MyArk add button (✓ becomes inactive)
        <button
          onClick={!isInMyArk ? handleMyArkToggle : undefined}
          disabled={isInMyArk} // Inactive once clicked
          className={`p-2 rounded transition-colors duration-200 ${
            isInMyArk
              ? "bg-green-500 text-white opacity-50 cursor-not-allowed"
              : "bg-gray-200 text-black"
          }`}
          aria-label="Add to MyArk"
        >
          {isInMyArk ? "✓" : "+"}
        </button>
      )}
      
      {/* FES Aid Button */}
      <button className="p-2 bg-blue-500 text-white rounded" aria-label="FES Aid">
        FES Aid
      </button>
    </div>
  );
};

export default ProjectCardButtons;
