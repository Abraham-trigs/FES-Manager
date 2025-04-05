import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import PaymentForm from "../payment/PaymentForm";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Destructure project properties with default values
  const {
    id,
    title = "Untitled Project",
    category = "No Category",
    description = "No description available",
    fundingGoal = 0, // Funding goal in FEScoin (formerly USD)
    remainingFunding = fundingGoal, // Default to full funding if not specified
  } = project;

  // Ensure remainingFunding is a valid number
  const validRemainingFunding = isNaN(remainingFunding) ? fundingGoal : remainingFunding;

  // Access store actions
  const { FESpay, isAuthenticated, addToMyArk, updateRemainingFunding, myArk } = useAddProjectFormStore();
 
  // Check if project is already in MyArk
  const isAlreadyInMyArk = myArk.some((projectInArk) => projectInArk.id === project.id);

  // Handle adding project to MyArk
  const handleAddToMyArk = () => {
    if (!isAlreadyInMyArk) {
      addToMyArk(project); // Call the function in the store to add the project to MyArk
    }
  };

  // Calculate progress
  let progress = 0;

  if (fundingGoal > 0 && validRemainingFunding >= 0) {
    progress = Math.round(((fundingGoal - validRemainingFunding) / fundingGoal) * 100);
  }

  // Ensure progress is always between 0% and 100%
  progress = Math.min(Math.max(progress, 0), 100); // Clamps the value to stay between 0 and 100

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
      // Call FESpay function to process the payment
      FESpay(project.id, parsedAmount);

      // Update the remaining funding after payment
      const updatedRemainingFunding = validRemainingFunding - parsedAmount;

      // Update the store with the new remaining funding
      updateRemainingFunding(project.id, updatedRemainingFunding);
    }
  };

  // Function to handle "Details" button click
  const handleDetailsClick = () => {
    navigate(`/project/${id}`); // Navigate to the project details page
  };

  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <div className="z-40 relative flex flex-col items-center shadow-2xl transition-colors duration-200 ease-in-out dark:shadow-2xl">
        
        {/* Title and Description Background */}
        <div className="absolute w-[230px] h-[400px] bg-darkGreen border-[3px] border-cyanNeon dark:bg-verydark shadow-black rounded-3xl flex justify-center items-center dark:border-surface"></div>

        {/* Main Background */}
        <div className="absolute w-[230px] h-[270px] bg-darkShade dark:bg-surface order-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>

        {/* Image Container */}
        <div className="absolute w-[200px] h-[140px] my-10 bg-light rounded-3xl border-[3px] border-highlight dark:bg-dark dark:border-verydark"></div>

        {/* Category Container */}
        <div className="absolute my-[3px] w-[200px] h-[40px] text-center font-extrabold p-2 dark:text-darkShade dark:text-semiShade">
          {category}
        </div>

        {/* Percentage Bar Container */}
        <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 dark:bg-surface dark:text-cyanNeon dark:font-semibold absolute my-[170px] text-white text-center">
          {progress}% {/* Display the progress here */}
        </div>

        {/* FundingGoal Container */}
        <div className="absolute ml-[-105px] rounded-l bg-cyanNeon my-[193px] w-[115px] h-[25px] font-extrabold text-darkGreen text-center text-[0.9rem] p-1 dark:bg-verydark dark:text-text">
          {isFundingSuccessful ? "Success" : remainingFunding} {/* Show "Success" when funded */}
        </div>

        {/* Project ID Container */}
        <div className="absolute my-[193px] w-[100px] h-[25px] mr-[-110px] bg-greenNeon text-center font-bold text-darkGreen dark:bg-text dark:text-verydark">
          {id}
        </div>

        {/* Title Container */}
        <div className="absolute my-[274px] w-[200px] h-[40px] text-center dark:text-clear font-extrabold text-greenNeon">
          {title}
        </div>

        {/* Description Container */}
        <div className="absolute dark:shadow-sm my-[294px] w-[200px] h-[78px] text-center text-[0.7rem] text-white line-clamp-3 font-normal dark:text-text">
          {description}
        </div>

        {/* shadow */}
        <div className="absolute w-[210px] h-[390px] bg-green rounded-2xl blur-md -z-10 dark:bg-verydark dark:h-[400px] dark:w-[240px]"></div>

        {/* Buttons */}
        <div className="absolute my-[213px]">
          <div className="flex flex-col justify-center items-center">

            {/* Plus Button - for adding Project to #MyArk */}
            <button
              type="button"
              className={`w-[30px] h-[30px] bg-shade font-bold text-[2rem] flex flex-row justify-center items-center my-4 cursor-pointer ${isAlreadyInMyArk ? 'opacity-40 cursor-not-allowed' : 'text-semiGreen'} dark:text-verydark`}
              onClick={handleAddToMyArk}
              disabled={isAlreadyInMyArk}
              title={isAlreadyInMyArk ? "Already added to MyArk" : "Add to MyArk"}
            >
              +
            </button>

            {/* FES Aid and Detail Buttons Container */}
            <div className="flex flex-row items-center -mt-11 space-x-[60px]">

              {/* FES Aid Button */}
              <button
                className={`bg-darkGreen dark:ease-in-out dark:hover:bg-dark dark:hover:text-text dark:text-text dark:border-none text-white p-4 py-1 border-2 border-darkGreen dark:bg-verydark rounded-lg font-semibold text-[0.8rem] whitespace-nowrap ${isFundingSuccessful ? 'bg-shade text-darkShade border-0 dark:hover:bg-verydark cursor-not-allowed border-none ' : ''}`}
                disabled={isFundingSuccessful}
                onClick={() => setIsPaymentFormVisible(true)}
              >
                FES Aid
              </button>

              {/* Details Button */}
              <button
                className="bg-cyanNeon p-3 py-1 rounded-lg font-semibold text-[0.9rem] dark:text-text dark:bg-dark dark:hover:bg-verydark dark:hover:text-text dark:border-dark dark:shadow-lg"
                onClick={handleDetailsClick} // Navigate on click
              >
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
    </div>
  );
};

export default ProjectCard;
