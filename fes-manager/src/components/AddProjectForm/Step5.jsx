import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step5 = () => {
  const { formData, updateFormData, addProject, resetFormData } = useAddProjectFormStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled in
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

    // Create new project object with a unique id
    const newProject = {
      id: Date.now().toString(),  // Unique id for each project
      ...formData,
      fesCoins: formData.fundingGoal,  // Assuming 'fesCoins' is the funding goal
    };

    // Add the new project to the store
    addProject(newProject);

    // Reset form fields efficiently
    resetFormData();

    setSuccess(true);  // Set success message after successful submission
    setError("");  // Clear any previous errors

    // Redirect after a brief delay
    setTimeout(() => navigate("/LiveProjects"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error and success messages */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Project submitted successfully!</p>}

      {/* Project Location */}
      <div>
        <label className="block font-medium">Project Location</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.location || ""}
          onChange={(e) => updateFormData("location", e.target.value)}
          required
        />
      </div>

      {/* Beneficiaries */}
      <div>
        <label className="block font-medium">Who will benefit from this project?</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={formData.beneficiaries || ""}
          onChange={(e) => updateFormData("beneficiaries", e.target.value)}
          required
        ></textarea>
      </div>

      {/* Expected Completion Date */}
      <div>
        <label className="block font-medium">Expected Completion Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={formData.completionDate || ""}
          onChange={(e) => updateFormData("completionDate", e.target.value)}
          required
        />
      </div>

      {/* Contact Information Section */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Contact Information</h3>

        <label className="block font-medium">Contact Person Name & Role</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.contactPerson || ""}
          onChange={(e) => updateFormData("contactPerson", e.target.value)}
          required
        />

        <label className="block font-medium mt-2">Contact Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded"
          value={formData.contactEmail || ""}
          onChange={(e) => updateFormData("contactEmail", e.target.value)}
          required
        />

        <label className="block font-medium mt-2">Contact Phone</label>
        <input
          type="tel"
          className="w-full border p-2 rounded"
          value={formData.contactPhone || ""}
          onChange={(e) => updateFormData("contactPhone", e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
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
