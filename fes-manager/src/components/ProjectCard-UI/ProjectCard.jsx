import React from "react";

const ProjectCard = ({ project }) => {
  // Destructure the necessary properties from the project object
  const {
    title = "Untitled Project",  // Default value in case the title is missing
    category = "No Category",    // Default value in case the category is missing
    description = "No description available",  // Default value for description
    fundingGoal = 0,
    tasks = [],
    verifierType = "No verifier",
    uploadedDocs = {},
  } = project;

  // Calculate the total allocated for tasks (just an example)
  const totalAllocated = tasks.reduce((sum, task) => sum + Number(task.amount || 0), 0);
  const progress = fundingGoal > 0 ? (totalAllocated / fundingGoal) * 100 : 0;

  return (
    <div className="relative flex flex-col items-center shadow-2xl scroll-mb-96 ">


      {/* Title and Description Background*/}
      <div className="absolute w-[230px] h-[400px] bg-darkGreen border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>



      {/* main Continer */}
      <div className="absolute w-[230px] h-[270px] bg-darkShade border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center">

      </div>
      
      {/* Image Container */}
      <div className="absolute  w-[200px] h-[140px] my-10 bg-light rounded-3xl border-[3px] border-highlight"></div>
      
      {/* Project Category */}
      <div className="absolute my-[3px] w-[200px] h-[40px]  text-center font-extrabold darkGreen p-2 ">
        {category}
      </div>


      {/* Percentage Bar */}
      <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 absolute my-[170px] text-white text-center">
        {progress}
      </div>

      {/* FundGoal */} 
      <div className="absolute ml-[-105px] rounded-l bg-darkGreen my-[193px] w-[115px] h-[25px] font-extrabold text-white text-center text-[0.9rem]  p-1 p ">
        {fundingGoal}
      </div>



      {/* Project */}
      <div className="absolute my-[193px] w-[100px] h-[25px] mr-[-110px] bg-shade text-center font-extrabold text-darkGreen ">
        {project.id}
      </div>


      {/* Title  */}
      <div className="absolute my-[274px] w-[200px] h-[40px] text-center font-extrabold text-white ">
        {title}
      </div>


      {/* Description  */}
      <div className="absolute my-[294px] w-[200px] h-[78px] text-center font-medium text-white line-clamp-3">
        {description} 
      </div>


      {/* Buttons */}
      <div className="absolute my-[213px]">
        <div className="flex flex-col justify-center items-center ">

          {/* plus button */}
          <div className="w-[30px] h-[30px] bg-shade font-bold text-[2rem] text-semiGreen flex flex-row justify-center items-center my-4">
            +
          </div>

          <div className="flex flex-row items-center -mt-11 space-x-[65px]">
          
            {/* FES Aid Button */}
            <button className="bg-darkGreen text-white p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem]" disabled>
              FES Aid
            </button>

            {/* Details Button */}
            <button className="bg-cyanNeon p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem]">
              Details
            </button>
          </div>
        </div>       
      </div>

      
    </div>
    
  );
};

export default ProjectCard;




