import React, { useState } from "react";
import useProjectStore from "../../store/ProjectStore";

const Step1 = () => {
  // Retrieves form state management functions from the global store
  const { updateFormData, setStep, formData } = useProjectStore();
  
  // Tracks validation errors
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Validates that all required fields are filled before proceeding
    if (!formData.title || !formData.category || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    // Moves to the next step of the form
    setStep(2);
  };

  return (
    // Form for entering basic project details
    <form onSubmit={handleNext} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {/* Input field for the project title */}
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

      {/* Dropdown menu for selecting the project category */}
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

      {/* Textarea for the project description */}
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

      {/* Input field for an optional project image URL */}
      <div>
        <label className="block font-medium">Image URL</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={(e) => updateFormData("image", e.target.value)}
        />
      </div>

      {/* Button to proceed to the next form step */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Next: Funding & Tasks
      </button>
    </form>
  );
};

export default Step1;
