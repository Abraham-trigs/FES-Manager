import React from "react";
import useProjectFormStore from "../../store/CreateProjectStore";
import useProjectStore from "../../store/useProjectStore"; 
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import { useNavigate } from "react-router-dom"; 

const AddProjectForm = () => {
  // Handles page navigation after form submission
  const navigate = useNavigate(); 

  // Retrieves the current form step and form data from the store
  const { step, formData } = useProjectFormStore(); 

  // Retrieves the function to add a new project from the global state
  const addProject = useProjectStore((state) => state.addProject);

  const handleSubmit = () => {
    // Prevents submission if required fields are missing
    if (!formData.title || !formData.category || !formData.description) return;

    // Adds the new project to the global state with a unique ID
    addProject({ id: Date.now().toString(), ...formData });

    // Redirects to the project list page after submission
    navigate("/LiveProjects"); 
  };

  return (
    // Main container for the project creation form
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>

      {/* Displays the appropriate form step based on the current progress */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 handleSubmit={handleSubmit} />} 
    </div>
  );
};

export default AddProjectForm;
