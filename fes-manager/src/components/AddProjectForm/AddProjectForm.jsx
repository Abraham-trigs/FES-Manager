import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

const AddProjectForm = () => {
  // Using Zustand store for managing form step and data
  const { step, setStep, formData, setFormData, errors } = useAddProjectFormStore();

  const nextStep = () => {
    setStep(step + 1);  // Navigate to the next step
  };

  const prevStep = () => {
    setStep(step - 1);  // Navigate to the previous step
  };

  return (
    <div className="relative p-6 rounded-lg">
      {/* Progress Indicator */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className="h-2 bg-blue-500 rounded transition-all"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-center text-sm mt-2">Step {step} of 4</p>

      {/* Step Content */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={prevStep}>
            Back
          </button>
        )}
        {step < 4 ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProjectForm;
