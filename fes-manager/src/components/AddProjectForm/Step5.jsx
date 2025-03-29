import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step5 = () => {
  const { formData, updateFormData, addProject, resetFormData } = useAddProjectFormStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    // Create new project object
    const newProject = {
      id: Date.now().toString(),
      ...formData,
      fesCoins: formData.fundingGoal, // Assuming 'fesCoins' is the funding goal
    };

    addProject(newProject);
    resetFormData(); // Clear form after submission

    setSuccess(true);
    setError("");
    setShowModal(false); // Close modal

    // Redirect after a brief delay
    setTimeout(() => navigate("/LiveProjects"), 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = ["location", "beneficiaries", "completionDate", "contactPerson", "contactEmail", "contactPhone"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill in all required fields.");
      return;
    }

    setShowModal(true); // Open confirmation modal
  };

  // Reusable Input Component
  const renderInputField = (label, fieldName, type = "text") => (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        className="w-full border p-2 rounded"
        value={formData[fieldName] || ""}
        onChange={(e) => updateFormData(fieldName, e.target.value)}
        required
      />
    </div>
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {/* Error and success messages */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Project submitted successfully! Redirecting...</p>}

      {/* Project Location */}
      {renderInputField("Project Location", "location")}

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
      {renderInputField("Expected Completion Date", "completionDate", "date")}

      {/* Contact Information Section */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Contact Information</h3>
        {renderInputField("Contact Person Name & Role", "contactPerson")}
        {renderInputField("Contact Email", "contactEmail", "email")}
        {renderInputField("Contact Phone", "contactPhone", "tel")}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-greenNeon text-darkGreen p-2 rounded hover:bg-semiGreen"
      >
        SUBMIT
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">Confirm Submission</h2>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to submit this project?</p>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-greenNeon text-darkGreen rounded hover:bg-semiGreen"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Step5;
