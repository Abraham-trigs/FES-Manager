// import React from "react";
// import Step1 from "./Step1";
// import Step2 from "./step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";
// import Step5 from "./Step5";
// import { useNavigate } from "react-router-dom";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const AddProjectForm = () => {
//   // Handles page navigation after form submission
//   const navigate = useNavigate();

//   // Retrieves the current form step and form data from the store
//   const { step, formData, addProject } = useAddProjectFormStore();

//   // Function to generate a 7-character uppercase ID
//   const generateProjectId = () => {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Only uppercase letters
//     return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//   };

//   const handleSubmit = () => {
//     // Prevents submission if required fields are missing
//     if (!formData.title || !formData.category || !formData.description) return;

//     // Adds the new project to the global state with a unique ID
//     const newProject = { id: generateProjectId(), ...formData };
//     addProject(newProject);

//     // Redirects to the project list page after submission
//     navigate("/LiveProjects");
//   };

//   return (
//     // Main container for the project creation form
//     <div className="/* max mx-auto p-6 bg-white shadow-md rounded-lg */">
//       <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>

//       {/* Displays the appropriate form step based on the current progress */}
//       {step === 1 && <Step1 />}
//       {step === 2 && <Step2 />}
//       {step === 3 && <Step3 />}
//       {step === 4 && <Step4 />}
//       {step === 5 && <Step5 handleSubmit={handleSubmit} />}
//     </div>
//   );
// };

// export default AddProjectForm;
