import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import PaymentForm from "../payment/PaymentForm";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const {
    id,
    title = "Untitled Project",
    category = "No Category",
    description = "No description available",
    fundingGoal = 0,
    remainingFunding = fundingGoal,
  } = project;

  const validRemainingFunding = isNaN(remainingFunding) ? fundingGoal : remainingFunding;

  const {
    FESpay,
    isAuthenticated,
    addToMyArk,
    updateRemainingFunding,
    myArk
  } = useAddProjectFormStore();

  // ✅ Proper check for existing project in MyArk
  const isAlreadyInMyArk = myArk.some((projectInArk) => projectInArk.id === project.id);

  const handleAddToMyArk = () => {
    if (!isAlreadyInMyArk) {
      addToMyArk(project);
    }
  };

  let progress = 0;
  if (fundingGoal > 0 && validRemainingFunding >= 0) {
    progress = Math.round(((fundingGoal - validRemainingFunding) / fundingGoal) * 100);
  }
  progress = Math.min(Math.max(progress, 0), 100);

  const isFundingSuccessful = validRemainingFunding <= 0;

  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  const handlePayment = (amount) => {
    const trimmedAmount = amount.toString().trim();
    if (!trimmedAmount || isNaN(trimmedAmount)) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const parsedAmount = Number(trimmedAmount);

    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    if (parsedAmount > 0) {
      FESpay(project.id, parsedAmount);

      const updatedRemainingFunding = validRemainingFunding - parsedAmount;

      updateRemainingFunding(project.id, updatedRemainingFunding);
    }
  };

  const handleDetailsClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <div className="z-40 relative flex flex-col items-center shadow-2xl transition-colors duration-200 ease-in-out dark:shadow-2xl">

        {/* Outer frame */}
        <div className="absolute w-[230px] h-[400px] bg-darkGreen border-[3px] border-cyanNeon dark:bg-verydark shadow-black rounded-3xl flex justify-center items-center dark:border-surface"></div>

        {/* Main card */}
        <div className="absolute w-[230px] h-[270px] bg-darkShade dark:bg-surface order-[3px] border-cyanNeon rounded-3xl flex justify-center items-center"></div>

        {/* Image placeholder */}
        <div className="absolute w-[200px] h-[140px] my-10 bg-light rounded-3xl border-[3px] border-highlight dark:bg-dark dark:border-verydark"></div>

        {/* Category label */}
        <div className="absolute my-[3px] w-[200px] h-[40px] text-center font-extrabold p-2 dark:text-darkShade dark:text-semiShade">
          {category}
        </div>

        {/* Progress bar */}
        <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 dark:bg-surface dark:text-cyanNeon dark:font-semibold absolute my-[170px] text-white text-center">
          {progress}%
        </div>

        {/* Funding status or "Success" */}
        <div className="absolute ml-[-105px] rounded-l bg-cyanNeon my-[193px] w-[115px] h-[25px] font-extrabold text-darkGreen text-center text-[0.9rem] p-1 dark:bg-verydark dark:text-text">
          {isFundingSuccessful ? "Success" : validRemainingFunding}
        </div>

        {/* Project ID */}
        <div className="absolute my-[193px] w-[100px] h-[25px] mr-[-110px] bg-greenNeon text-center font-bold text-darkGreen dark:bg-text dark:text-verydark">
          {id}
        </div>

        {/* Title */}
        <div className="absolute my-[274px] w-[200px] h-[40px] text-center dark:text-clear font-extrabold text-greenNeon">
          {title}
        </div>

        {/* Description */}
        <div className="absolute dark:shadow-sm my-[294px] w-[200px] h-[78px] text-center text-[0.7rem] text-white line-clamp-3 font-normal dark:text-text">
          {description}
        </div>

        {/* Glow shadow */}
        <div className="absolute w-[210px] h-[390px] bg-green rounded-2xl blur-md -z-10 dark:bg-verydark dark:h-[400px] dark:w-[240px]"></div>

        {/* Action buttons */}
        <div className="absolute my-[213px]">
          <div className="flex flex-col justify-center items-center">

            {/* Add to MyArk Button */}
            <button
              type="button"
              className={`w-[30px] h-[30px] bg-shade font-bold text-[2rem] flex flex-row justify-center items-center my-4 cursor-pointer ${
                isAlreadyInMyArk ? 'opacity-40 cursor-not-allowed' : 'text-semiGreen'
              } dark:text-verydark`}
              onClick={handleAddToMyArk}
              disabled={isAlreadyInMyArk}
              title={isAlreadyInMyArk ? "Already added to MyArk" : "Add to MyArk"}
            >
              +
            </button>

            {/* Aid + Details Buttons */}
            <div className="flex flex-row items-center -mt-11 space-x-[60px]">
              {/* FES Aid Button */}
              <button
                className={`bg-darkGreen dark:ease-in-out dark:hover:bg-dark dark:hover:text-text dark:text-text dark:border-none text-white p-4 py-1 border-2 border-darkGreen dark:bg-verydark rounded-lg font-semibold text-[0.8rem] whitespace-nowrap ${
                  isFundingSuccessful ? 'bg-shade text-darkShade border-0 dark:hover:bg-verydark cursor-not-allowed border-none' : ''
                }`}
                disabled={isFundingSuccessful}
                onClick={() => setIsPaymentFormVisible(true)}
              >
                FES Aid
              </button>

              {/* Details Button */}
              <button
                className="bg-cyanNeon p-3 py-1 rounded-lg font-semibold text-[0.9rem] dark:text-text dark:bg-dark dark:hover:bg-verydark dark:hover:text-text dark:border-dark dark:shadow-lg"
                onClick={handleDetailsClick}
              >
                Details
              </button>
            </div>
          </div>
        </div>

        {/* Conditional PaymentForm */}
        {isPaymentFormVisible && (
          <PaymentForm
            onClose={() => setIsPaymentFormVisible(false)}
            onPayment={handlePayment}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
