import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const ProjectCardButtons = ({ projectId }) => {
  // Access store methods and project list
  const { updateProjectFunding, projects } = useAddProjectFormStore();

  // Find the project associated with the given projectId
  const project = projects.find((p) => p.id === projectId);

  // State for handling user donation input and messages
  const [donationAmount, setDonationAmount] = useState(""); // Holds the entered donation amount
  const [showInput, setShowInput] = useState(false); // Controls the visibility of the input field
  const [errorMessage, setErrorMessage] = useState(""); // Stores any validation error messages
  const [thankYouMessage, setThankYouMessage] = useState(""); // Displays a thank-you message upon successful donation

  // If project is not found, do not render anything
  if (!project) return null;

  // Calculate remaining budget that can be funded
  const totalBudget = project.fundingGoal - project.currentFunds;

  // Handle the payment process
  const handlePayment = () => {
    const paymentAmount = parseFloat(donationAmount);

    // Validate input: check if entered amount is a valid number greater than 0
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    // Prevent donations exceeding the remaining budget
    if (paymentAmount > totalBudget) {
      setErrorMessage(`You can only donate up to ${totalBudget} FES Coins.`);
      return;
    }

    // Reset error message on successful validation
    setErrorMessage("");

    // Update the project funding
    updateProjectFunding(projectId, paymentAmount);

    // Show thank-you message
    setThankYouMessage("Thank you for your donation!");

    // Reset input field and messages after 3 seconds
    setTimeout(() => {
      setDonationAmount(""); // Clear input
      setThankYouMessage(""); // Remove thank-you message
      setShowInput(false); // Hide input field
    }, 3000);
  };

  return (
    <div className="mt-3">
      {/* Button to toggle the donation input field */}
      <button
        onClick={() => setShowInput(!showInput)}
        className="bg-blue-500 text-white py-1 px-3 rounded"
      >
        {showInput ? "Pay Now" : "FES Aid"} {/* Toggle text based on input visibility */}
      </button>

      {/* Show input field when button is clicked */}
      {showInput && (
        <div className="mt-2">
          {/* Input field for entering donation amount */}
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter FES Coins"
            className="border border-blue-500 p-2 rounded-md w-full"
          />

          {/* Confirm payment button */}
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mt-2 w-full"
          >
            Confirm Payment
          </button>

          {/* Display validation error message if applicable */}
          {errorMessage && <p className="text-red-500 text-xs text-center">{errorMessage}</p>}

          {/* Show thank-you message upon successful donation */}
          {thankYouMessage && <p className="text-green-500 text-xs text-center">{thankYouMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectCardButtons;
