import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import PaymentForm from "../payment/PaymentForm";

const ProjectCard = ({ project }) => {
  // Destructure project properties with default values
  const {
    id,
    title = "Untitled Project",
    category = "No Category",
    description = "No description available",
    fundingGoal = 0,
    remainingFunding = fundingGoal, // Default to full funding if not specified
  } = project;

  const validRemainingFunding = isNaN(remainingFunding) ? fundingGoal : remainingFunding;

  // Access store actions
  const { FESpay, isAuthenticated } = useAddProjectFormStore();

  // Calculate progress
  const progress = (fundingGoal && !isNaN(fundingGoal) && validRemainingFunding && !isNaN(validRemainingFunding))
  ? Math.round(((fundingGoal - validRemainingFunding) / fundingGoal) * 100)
  : 0;

  // Check if funding goal is reached
  const isFundingSuccessful = remainingFunding === 0;

  // State for controlling payment form visibility
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  // Function to handle payment after submitting form
  const handlePayment = (amount) => {
    // Ensure valid amount: check for empty or non-numeric input, and that it's finite and greater than 0
    const trimmedAmount = amount.toString().trim();
    if (!trimmedAmount || isNaN(trimmedAmount)) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const parsedAmount = Number(trimmedAmount);

    // Check if the parsed amount is finite and positive
    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    // Only proceed with the payment if the amount is valid
    if (parsedAmount > 0) {
      FESpay(project.id, parsedAmount);
    }
  };

  return (
    // Card Container
    <div className="relative flex flex-col items-center shadow-2xl scroll-mb-96">

      {/* Title and Description Background  */}
      <div className="absolute w-[230px] h-[400px] bg-darkGreen border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>
      
      {/* Main Backgroung */}
      <div className="absolute w-[230px] h-[270px] bg-darkShade border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>
      
      {/* image Container */}
      <div className="absolute w-[200px] h-[140px] my-10 bg-light rounded-3xl border-[3px] border-highlight"></div>
      
      {/* Catergory container */}
      <div className="absolute my-[3px] w-[200px] h-[40px] text-center font-extrabold darkGreen p-2">
        {category}
      </div>

      {/* Percentage Bar Conatiner */}
      <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 absolute my-[170px] text-white text-center">
        {progress}%
      </div>

      {/* FundingGaol Container */}
      <div className="absolute ml-[-105px] rounded-l bg-cyanNeon my-[193px] w-[115px] h-[25px] font-extrabold text-darkGreen text-center text-[0.9rem] p-1 p">
        {isFundingSuccessful ? "Success" : remainingFunding}
      </div>
      
      {/* Project ID Container */}
      <div className="absolute my-[193px] w-[100px] h-[25px] mr-[-110px] bg-shade text-center font-extrabold text-darkGreen">
        {id}
      </div>

      {/* Title Container */}
      <div className="absolute my-[274px] w-[200px] h-[40px] text-center font-extrabold text-greenNeon">
        {title}
      </div>

      {/* Desription Container  */}
      <div className="absolute my-[294px] w-[200px] h-[78px] text-center text-[0.7rem] text-white line-clamp-3 font-normal ">{description}</div>
      

      {/* buttons */}
      <div className="absolute my-[213px]">
        <div className="flex flex-col justify-center items-center">

          {/* plus Button - for adding Project to #MyArk */}
          <div className="w-[30px] h-[30px] bg-shade font-bold text-[2rem] text-semiGreen flex flex-row justify-center items-center my-4">
            +
          </div>

          {/* FES Aidand Detail Buttons Container */}
          <div className="flex flex-row items-center -mt-11 space-x-[65px]">

            {/* FES Aid Button */}
            <button
              className={`bg-darkGreen text-white p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem] ${isFundingSuccessful ? 'bg-shade  border-0 text-darkGreen cursor-not-allowed' : ''}`}
              disabled={isFundingSuccessful}
              onClick={() => setIsPaymentFormVisible(true)} // Show payment form
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

      {/* Conditionally render PaymentForm component */}
      {isPaymentFormVisible && (
        <PaymentForm 
          onClose={() => setIsPaymentFormVisible(false)} // Hide payment form
          onPayment={handlePayment} // Handle payment
        />
      )}
    </div>
  );
};

export default ProjectCard;
