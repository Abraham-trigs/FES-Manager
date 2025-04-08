import React, { useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

const AddProjectForm = ({ onClose }) => {
  const {
    step,
    setStep,
    formData,
    errors,
    validateStep,
    addSubmittedProject,
  } = useAddProjectFormStore();

  // Go to next step after validating current step
  const nextStep = () => {
    const hasErrors = validateStep(); // Perform validation
    if (!hasErrors) {
      setStep(step + 1); // Proceed if no errors
    }
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Final form submission with last-step validation
  const handleSubmit = () => {
    const hasErrors = validateStep(); // Final validation
    if (!hasErrors) {
      addSubmittedProject(); // Add project to store/localStorage
      alert("Project submitted successfully!"); // Replace with toast/redirect as needed

      // Auto-close the modal if provided
      if (typeof onClose === 'function') {
        onClose();
      }

      // Reset to step 1 for the next use
      setStep(1);
    }
  };


  return (
    <div className="relative p-6 rounded-lg">
      {/* Step Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className="h-2 bg-blue-500 rounded transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-center text-sm mt-2">Step {step} of 4</p>

      {/* Step Content - Conditional Rendering */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {/* Back button only shown after first step */}
        {step > 1 && (
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={prevStep}
          >
            Back
          </button>
        )}

        {/* Next or Submit based on step */}
        {step < 4 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-auto"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProjectForm;
