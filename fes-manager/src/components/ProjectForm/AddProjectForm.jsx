import React from "react";
import useProjectFormStore from "../store/useProjectFormStore";
import Step1 from "./ProjectFormSteps/Step1";
import Step2 from "./ProjectFormSteps/Step2";
import Step3 from "./ProjectFormSteps/Step3";
import Step4 from "./step4";

const AddProjectForm = () => {
  const { step } = useProjectFormStore();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}


    </div>
  );
};

export default AddProjectForm;
