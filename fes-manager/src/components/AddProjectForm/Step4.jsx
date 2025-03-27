import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step4 = () => {
  const { updateFormData, setStep, formData } = useAddProjectFormStore();
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Check for missing details based on category (Education or Organization)
    if (formData.category === "Education" && !formData.schoolName) {
      setError("Please provide the school details.");
      return;
    }
    if (formData.category !== "Education" && !formData.organizationName) {
      setError("Please provide the implementing organization's details.");
      return;
    }

    // Proceed to the next step if no error
    setStep(5);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData(formData.category === "Education" ? "schoolInvoice" : "organizationAgreement", file);
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Error message if validation fails */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Conditional render based on category */}
      {formData.category === "Education" ? (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">School Information</h3>

          <label className="block font-medium">School Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolName || ""}
            onChange={(e) => updateFormData("schoolName", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Address</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolAddress || ""}
            onChange={(e) => updateFormData("schoolAddress", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Contact Person</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.schoolContactPerson || ""}
            onChange={(e) => updateFormData("schoolContactPerson", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.schoolEmail || ""}
            onChange={(e) => updateFormData("schoolEmail", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">School Phone</label>
          <input
            type="tel"
            className="w-full border p-2 rounded"
            value={formData.schoolPhone || ""}
            onChange={(e) => updateFormData("schoolPhone", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Attach School Invoice (if available)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            className="w-full border p-2 rounded"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Implementing Organization</h3>

          <label className="block font-medium">Organization Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationName || ""}
            onChange={(e) => updateFormData("organizationName", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Address</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationAddress || ""}
            onChange={(e) => updateFormData("organizationAddress", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Contact Person</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.organizationContactPerson || ""}
            onChange={(e) => updateFormData("organizationContactPerson", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.organizationEmail || ""}
            onChange={(e) => updateFormData("organizationEmail", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Organization Phone</label>
          <input
            type="tel"
            className="w-full border p-2 rounded"
            value={formData.organizationPhone || ""}
            onChange={(e) => updateFormData("organizationPhone", e.target.value)}
            required
          />

          <label className="block font-medium mt-2">Attach Agreement Document (if available)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            className="w-full border p-2 rounded"
            onChange={handleFileUpload}
          />
        </div>
      )}

      {/* Navigation button */}
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
