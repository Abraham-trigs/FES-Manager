import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step1 = () => {
  const { updateFormData, setStep, formData } = useAddProjectFormStore();
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(formData.image || ""); // Store preview

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    setStep(2); // Go to the next step
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block font-medium">Project Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          className="w-full border p-2 rounded"
          value={formData.category}
          onChange={(e) => updateFormData("category", e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Community Impact">Community Impact</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Project Description</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label className="block font-medium">Image URL</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={(e) => {
            updateFormData("image", e.target.value);
            setImagePreview(e.target.value); // Update preview
          }}
        />
      </div>

      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Project Preview"
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-greenNeon text-darkGreen p-2 rounded hover:bg-semiGreen"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;
