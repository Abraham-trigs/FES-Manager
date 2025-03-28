import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step3 = () => {
  const { updateFormData, setStep, formData } = useAddProjectFormStore();
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Check if the project verification status is set
    if (formData.verified === null) {
      setError("Please confirm whether the project is verified.");
      return;
    }

    // If the project is verified, make sure the verification document is uploaded
    if (formData.verified && !formData.verificationDocs) {
      setError("Please upload the verification document.");
      return;
    }

    // Proceed to next step if no error
    setStep(4);
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Error message if validation fails */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Verification status dropdown */}
      <div>
        <label className="block font-medium">Is this project verified?</label>
        <select
          className="w-full border p-2 rounded"
          value={formData.verified === null ? "" : formData.verified} // Avoid null by using an empty string if verified is null
          onChange={(e) => updateFormData("verified", e.target.value === "true")}
          required
        >
          <option value="">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Conditional File upload for verification documents (if verified) */}
      {formData.verified && (
        <div>
          <label className="block font-medium">Upload Verification Document</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            className="w-full border p-2 rounded"
            onChange={(e) => updateFormData("verificationDocs", e.target.files[0])}
          />
          <p className="text-sm text-gray-600 mt-1">
            Accepted formats: PDF, JPG, PNG
          </p>
        </div>
      )}

      {/* Navigation button */}
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
