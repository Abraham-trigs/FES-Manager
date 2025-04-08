import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step4 = () => {
  const { formData, setFormData, resetFormData, addSubmittedProject, setStep, submittedProjects } = useAddProjectFormStore();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // To handle submit state

  // Handle the form submission
  const handleSubmit = () => {
    // Basic validation before showing confirmation
    if (!formData.title || !formData.category || !formData.fundingGoal) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsConfirmationVisible(true); // Show confirmation modal
  };

  // Handle the modal confirmation action
  const handleConfirmation = (action) => {
    if (action === "confirm") {
      setIsSubmitting(true);  // Indicate submission in progress
      addSubmittedProject();  // Submit project (handled internally via Zustand)

      // Simulate delay before resetting form and changing step
      setTimeout(() => {
        resetFormData();
        setStep(1);  // Reset to first step
        setIsSubmitting(false);  // Stop submitting state
      }, 1000);  // Slight delay for form reset
    } else if (action === "cancel" || action === "edit") {
      setIsConfirmationVisible(false); // Hide confirmation modal
    }
  };

  return (
    <div>
      <div className="step-4-form">
        <h2 className="text-center">Review your project details</h2>
        <div className="form-section">
          {/* Display form data pulled from Zustand store */}
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Funding Goal:</strong> {formData.fundingGoal}</p>
        </div>

        <div className="form-actions">
          {/* Disable submit button if form is being submitted */}
          <button
            className={`submit-btn bg-blue-500 text-white p-3 rounded-md ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Project
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="confirmation-content bg-white p-6 rounded-md shadow-lg">
            <p className="text-xl mb-4">Are you sure you want to submit the project?</p>
            <div className="confirmation-buttons flex justify-between space-x-4 z-50">
              <button
                className="bg-red-500 text-white p-3 rounded-md w-full"
                onClick={() => handleConfirmation("cancel")}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white p-3 rounded-md w-full"
                onClick={() => handleConfirmation("edit")}
                disabled={isSubmitting}
              >
                Edit
              </button>
              <button
                className="bg-darkGreen text-white p-3 rounded-md w-full"
                onClick={() => handleConfirmation("confirm")}
                disabled={isSubmitting}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
