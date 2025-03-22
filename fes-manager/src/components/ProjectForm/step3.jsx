import React, { useState } from "react";
import useProjectFormStore from "../../store/useProjectFormStore";

const Step3 = () => {
  // Retrieves form state and functions for updating project data
  const { updateFormData, setStep, formData } = useProjectFormStore();

  // Local state for tracking validation errors
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Ensures that verification status is selected before proceeding
    if (!formData.verified) {
      setError("Please confirm whether the project is verified.");
      return;
    }

    // Moves to the next form step
    setStep(4);
  };

  return (
    // Form for entering project verification details
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Dropdown for selecting verification status */}
      <div>
        <label className="block font-medium">Is this project verified?</label>
        <select
          className="w-full border p-2 rounded"
          value={formData.verified}
          onChange={(e) => updateFormData("verified", e.target.value)}
          required
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* File upload field for verification document */}
      {formData.verified === "Yes" && (
        <div>
          <label className="block font-medium">Upload Verification Document</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={(e) => updateFormData("verificationDocs", e.target.files[0])}
          />
          <p className="text-sm text-gray-600 mt-1">Accepted formats: PDF, JPG, PNG</p>
        </div>
      )}

      {/* Button to proceed to the next step */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Next: Implementation Details
      </button>
    </form>
  );
};

export default Step3;
