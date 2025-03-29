import React from 'react'

const ProjectCard = () => {
  return (
    <>
    <div className='flex flex-col '>
      <div className='w-[200px] h-[100px] bg-light rounded-3x position'> </div>
      <div className='w-[200px] h-[300px] bg-white rounded-3x  '> </div>
    </div>

    </>
  )
}

export default ProjectCard;




















// import React, { memo, useState } from "react";
// import { Link } from "react-router-dom";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";
// import ProgressBar from "./ProgressBar";
// import ProjectCardButtons from "./ProjectCardButtons";

// const ProjectCard = memo(({ projectId }) => {
//   const { projects, updateProjectFunding } = useAddProjectFormStore();

//   const project = projects.find((p) => p.id === projectId);
//   if (!project) return null;

//   // State to track the entered donation amount
//   const [donationAmount, setDonationAmount] = useState(0);
//   const [buttonLabel, setButtonLabel] = useState("FES Aid");

//   // Ensure the amount funded does not exceed the total budget
//   const amountFunded = Math.min(project.currentFunds, project.fundingGoal);
//   const progress = (amountFunded / project.fundingGoal) * 100;

//   // Handle donation submission
//   const handleDonate = () => {
//     if (donationAmount > 0) {
//       updateProjectFunding(projectId, donationAmount);
//       setDonationAmount(0); // Reset input field after donation
//       setButtonLabel("Pay Now"); // Change button text
//     }
//   };

//   return (
//     <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-visible p-4 transition-all duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md">
      
//       <div className="flex justify-between items-center">
//         <p className="text-xs font-semibold text-gray-700 uppercase">
//           {project.category || "Uncategorized"}
//         </p>
//         <p className="text-sm text-gray-700 font-medium">ID-{projectId}</p>
//       </div>

//       {/* Project image section */}
//       <div className="w-full h-36 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
//         {project.image ? (
//           <img src={project.image} alt={`Project ${projectId}`} className="w-full h-full object-cover" loading="lazy" />
//         ) : (
//           <span className="text-gray-500 text-xs">No Image Available</span>
//         )}
//       </div>

//       {/* Total Budget */}
//       <p className="text-sm font-semibold text-gray-900">
//         Total Budget: <span className="text-blue-500">{project.fesCoins} FES Coins</span>
//       </p>

//       {/* Progress bar */}
//       <div className="mt-3">
//         <ProgressBar progress={progress} />
//       </div>

//       {/* Updated Amount Funded Display */}
//       <p className="text-sm font-semibold text-gray-900 mt-2">
//         Amount Funded: <span className="text-blue-500">{0 + project.currentFunds} FES Coins</span>
//       </p>

//       {/* Input for donation amount */}
//       <input
//         type="number"
//         value={donationAmount}
//         onChange={(e) => setDonationAmount(Number(e.target.value))}
//         className="mt-2 w-full p-2 border rounded"
//         placeholder="Enter amount"
//       />

//       {/* Pay Now Button */}
//       <button
//         onClick={handleDonate}
//         className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition"
//       >
//         {buttonLabel}
//       </button>

//       {/* Project Description */}
//       <p className="text-sm text-gray-700 mt-3">{project.description || "No description available."}</p>

//       {/* Link to Project Details */}
//       <Link to={`/project/${project.id}`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 transition text-white py-1 px-3 rounded">
//         Details
//       </Link>
//     </div>
//   );
// });

// export default ProjectCard;
