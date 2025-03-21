import React, { useState } from "react";
import useProjectFormStore from "../../store/useProjectFormStore";

const Step4 = () => {
  const { updateFormData, setStep, formData } = useProjectFormStore();
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.category === "Education" && !formData.schoolName) {
      setError("Please provide the school details.");
      return;
    }
    if (formData.category !== "Education" && !formData.organizationName) {
      setError("Please provide the implementing organization's details.");
      return;
    }
    setStep(5);
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Dynamic Fields Based on Category */}
      {formData.category === "Education" ? (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">School Information</h3>

          <label className="block font-medium">School Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolName}
            onChange={(e) => updateFormData("schoolName", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Address</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolAddress}
            onChange={(e) => updateFormData("schoolAddress", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Contact Person</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolContactPerson}
            onChange={(e) => updateFormData("schoolContactPerson", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.schoolEmail}
            onChange={(e) => updateFormData("schoolEmail", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Phone</label>
          <input
            type="tel"
            className="w-full border p-2 rounded"
            value={formData.schoolPhone}
            onChange={(e) => updateFormData("schoolPhone", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Attach School Invoice (if available)</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={(e) => updateFormData("verificationDocs", e.target.files[0])}
          />
        </div>
      ) : (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Implementing Organization</h3>

          <label className="block font-medium">Organization Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationName}
            onChange={(e) => updateFormData("organizationName", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Address</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationAddress}
            onChange={(e) => updateFormData("organizationAddress", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Contact Person</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationContactPerson}
            onChange={(e) => updateFormData("organizationContactPerson", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.organizationEmail}
            onChange={(e) => updateFormData("organizationEmail", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Phone</label>
          <input
            type="tel"
            className="w-full border p-2 rounded"
            value={formData.organizationPhone}
            onChange={(e) => updateFormData("organizationPhone", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Attach Agreement Document (if available)</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={(e) => updateFormData("verificationDocs", e.target.files[0])}
          />
        </div>
      )}

      {/* Next Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Next: Project Impact & Contact Info
      </button>
    </form>
  );
};

export default Step4;
