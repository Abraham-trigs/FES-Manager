import React from "react";
import useProjectStore from "../../store/ProjectStore";
import ProjectCard from "../ProjectCard-UI/ProjectCard";

const MyArk = () => {
  const myArk = useProjectStore((state) => state.myArk);
  const toggleMyArk = useProjectStore((state) => state.toggleMyArk);

  return (
    <div className="p-4 bg-teal-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">My Ark</h2>
      {myArk.length === 0 ? (
        <p className="text-gray-500 text-center">No projects in My Ark.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {myArk.map((projectId) => (
            <div key={projectId} className="flex justify-center">
              <ProjectCard projectId={projectId} isInMyArkPage={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArk;
