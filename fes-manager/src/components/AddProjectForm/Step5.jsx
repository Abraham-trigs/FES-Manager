import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useProjectFormStore from "../../store/CreateProjectStore";
import useProjectStore from "../../store/useProjectStore"; 

const Step5 = () => {
  // Retrieves form data and update functions from Zustand store
  const { formData, updateFormData } = useProjectFormStore();

  // Retrieves the function to add a new project to the store
  const addProject = useProjectStore((state) => state.addProject); 

  // Handles navigation after submission
  const navigate = useNavigate(); 

  // Local state for tracking validation errors and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensures all required fields are filled before submission
    if (
      !formData.location ||
      !formData.beneficiaries ||
      !formData.completionDate ||
      !formData.contactPerson ||
      !formData.contactEmail ||
      !formData.contactPhone
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Creates a new project object with a unique ID
    const newProject = { id: Date.now().toString(), ...formData };

    // Saves the project to Zustand state
    addProject(newProject);

    // Resets the form fields after successful submission
    updateFormData("title", "");
    updateFormData("category", "");
    updateFormData("description", "");
    updateFormData("image", "");
    updateFormData("fundingGoal", "");
    updateFormData("currentFunds", "");
    updateFormData("tasks", []);
    updateFormData("verified", false);
    updateFormData("verificationDocs", null);
    updateFormData("location", "");
    updateFormData("beneficiaries", "");
    updateFormData("completionDate", "");
    updateFormData("contactPerson", "");
    updateFormData("contactEmail", "");
    updateFormData("contactPhone", "");

    // Displays success message and redirects to the project list page
    setSuccess(true);
    setError("");
    setTimeout(() => navigate("/LiveProjects"), 1000); 
  };

  return (
    // Form for entering project impact details and contact information
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Project submitted successfully!</p>}

      {/* Input for project location */}
      <div>
        <label className="block font-medium">Project Location</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.location}
          onChange={(e) => updateFormData("location", e.target.value)}
          required
        />
      </div>

      {/* Textarea for specifying beneficiaries */}
      <div>
        <label className="block font-medium">Who will benefit from this project?</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={formData.beneficiaries}
          onChange={(e) => updateFormData("beneficiaries", e.target.value)}
          required
        ></textarea>
      </div>

      {/* Input for expected project completion date */}
      <div>
        <label className="block font-medium">Expected Completion Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={formData.completionDate}
          onChange={(e) => updateFormData("completionDate", e.target.value)}
          required
        />
      </div>

      {/* Contact Information Section */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Contact Information</h3>
        
        {/* Input for contact person's name and role */}
        <label className="block font-medium">Contact Person Name & Role</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.contactPerson}
          onChange={(e) => updateFormData("contactPerson", e.target.value)}
          required
        />

        {/* Input for contact email */}
        <label className="block font-medium mt-2">Contact Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded"
          value={formData.contactEmail}
          onChange={(e) => updateFormData("contactEmail", e.target.value)}
          required
        />

        {/* Input for contact phone number */}
        <label className="block font-medium mt-2">Contact Phone</label>
        <input
          type="tel"
          className="w-full border p-2 rounded"
          value={formData.contactPhone}
          onChange={(e) => updateFormData("contactPhone", e.target.value)}
          required
        />
      </div>

      {/* Button to submit the form */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Submit Project
      </button>
    </form>
  );
};

export default Step5;
