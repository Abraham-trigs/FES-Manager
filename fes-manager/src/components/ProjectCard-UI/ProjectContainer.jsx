import React from "react";

const ProjectContainer = ({ children }) => {
  return (
    <div className="absolute w-full mt-8">
      <div className="relative py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
};

export default ProjectContainer;
