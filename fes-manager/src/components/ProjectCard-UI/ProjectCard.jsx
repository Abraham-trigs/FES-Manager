import React, { useState, useEffect, useMemo, useCallback } from "react";

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

  const [currentFundingGoal, setCurrentFundingGoal] = useState(() => fundingGoal);

  useEffect(() => {
    setCurrentFundingGoal(fundingGoal);
  }, [fundingGoal]);

  const handlePayment = useCallback((amount) => {
    setCurrentFundingGoal((prevGoal) => Math.max(prevGoal - amount, 0));
  }, []);

  return (
    <div className=" relative flex flex-col items-center shadow-2xl scroll-mb-96 ">

      {/* Title and Description Background*/}
      <div className="absolute w-[230px] h-[400px] bg-darkGreen border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>

      {/* main Continer */}
      <div className="absolute w-[230px] h-[270px] bg-darkShade border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>
      
      {/* Image Container */}
      <div className="absolute  w-[200px] h-[140px] my-10 bg-light rounded-3xl border-[3px] border-highlight"></div>
      
      {/* Project Category */}
      <div className="absolute my-[3px] w-[200px] h-[40px]  text-center font-extrabold darkGreen p-2 ">
        {category}
      </div>

      {/* FundGoal */} 
      <div className="absolute ml-[-105px] rounded-l bg-cyanNeon my-[193px] w-[115px] h-[25px] font-extrabold text-darkGreen text-center text-[0.9rem]  p-1 p ">
        {currentFundingGoal}
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
            <button
              className="bg-darkGreen text-white p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem]"
              onClick={() => {
                const paymentForm = document.createElement("div");
                paymentForm.innerHTML = `
                  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div class="bg-white p-5 rounded-lg shadow-lg text-center w-80 relative">
                      <button id="closeForm" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✕
                      </button>
                      <h2 class="text-lg font-bold mb-3">Enter Payment Amount</h2>
                      <input id="paymentAmount" type="number" class="w-full border p-2 mb-3 rounded-lg" placeholder="Enter amount" />
                      <button class="bg-darkGreen text-white px-4 py-2 rounded-lg font-semibold" id="payButton">Pay</button>
                    </div>
                  </div>
                `;
                
                document.body.appendChild(paymentForm);

                // Close button functionality
                document.getElementById("closeForm").addEventListener("click", () => {
                  paymentForm.remove();
                });

                // Payment button functionality
                document.getElementById("payButton").addEventListener("click", () => {
                  const paymentAmount = parseFloat(document.getElementById("paymentAmount").value);
                  if (paymentAmount > 0) {
                    handlePayment(paymentAmount);
                  }
                  paymentForm.remove();  // Close the form after payment
                });
              }}
            >
              FES Aid
            </button>

            {/* Details Button */}
            <button className="bg-cyanNeon p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.9rem]">
              Details
            </button>
          </div>
        </div>       
      </div>
    </div>
  );
};

export default ProjectCard;
