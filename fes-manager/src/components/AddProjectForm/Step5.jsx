import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../../store/ProjectStore";

const Step5 = () => {
  const { formData, updateFormData } = useProjectStore();
  const addProject = useProjectStore((state) => state.addProject);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const newProject = { id: Date.now().toString(), ...formData };
    addProject(newProject);

    // Reset form fields efficiently
    const resetFields = [
      "title",
      "category",
      "description",
      "image",
      "fundingGoal",
      "currentFunds",
      "tasks",
      "verified",
      "verificationDocs",
      "location",
      "beneficiaries",
      "completionDate",
      "contactPerson",
      "contactEmail",
      "contactPhone",
    ];
    resetFields.forEach((field) => updateFormData(field, field === "tasks" ? [] : ""));

    setSuccess(true);
    setError("");

    // Redirect after a brief delay
    setTimeout(() => navigate("/LiveProjects"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Project submitted successfully!</p>}

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

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Submit Project
      </button>
    </form>
  );
};

export default Step5;
