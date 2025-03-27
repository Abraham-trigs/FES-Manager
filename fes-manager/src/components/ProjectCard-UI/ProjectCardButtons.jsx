import React, { useState } from "react";
import useProjectStore from "../../store/ProjectStore";

const ProjectCardButtons = ({ projectId }) => {
  const { updateProjectFunding, projects } = useProjectStore();
  const project = projects.find((p) => p.id === projectId);
  const [donationAmount, setDonationAmount] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showFinalize, setShowFinalize] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  if (!project) return null;

  const handleFinalizeDonation = () => {
    let amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) return;

    let remainingBudget = project.fundingGoal;
    
    if (amount > remainingBudget) {
      amount = remainingBudget;
      setInfoMessage(`Only $${remainingBudget} was needed. Your donation has been adjusted.`);
    } else {
      setInfoMessage("");
    }

    // Deduct the correct amount from the project budget
    updateProjectFunding(projectId, amount, true);

    setDonationAmount("");
    setShowInput(false);
    setShowFinalize(false);
    setShowThankYou(true);

    // Hide "Thank You" message after 3 seconds
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setShowInput(true)}
        className="bg-blue-500 text-white py-1 px-3 rounded"
      >
        FES Aid
      </button>
      {showInput && (
        <div className="mt-2">
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => {
              setDonationAmount(e.target.value);
              setShowFinalize(true);
            }}
            className="border rounded px-2 py-1 w-full"
            placeholder="Enter donation amount"
          />
          {showFinalize && (
            <button
              onClick={handleFinalizeDonation}
              className="bg-green-500 text-white py-1 px-3 rounded mt-2"
            >
              Finalize Donation
            </button>
          )}
        </div>
      )}
      {showThankYou && (
        <p className="text-green-600 text-xs text-center mt-1">
          Thank you for your donation!
        </p>
      )}
      {infoMessage && (
        <p className="text-orange-500 text-xs text-center mt-1">{infoMessage}</p>
      )}
    </div>
  );
};

export default ProjectCardButtons;
