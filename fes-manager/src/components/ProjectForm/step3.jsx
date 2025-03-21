import React, { useState } from "react";
import useProjectFormStore from "../../store/useProjectFormStore";

const Step3 = () => {
  const { updateFormData, setStep, formData } = useProjectFormStore();
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.verified) {
      setError("Please confirm whether the project is verified.");
      return;
    }
    setStep(4);
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Verification Status */}
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

      {/* Upload Verification Document */}
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

      {/* Next Button */}
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
