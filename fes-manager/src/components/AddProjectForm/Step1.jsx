import React from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore"; // Import Zustand store to manage form state

const Step1 = () => {
  // Grabbing form data, setFormData, errors, and isVisible from the Zustand store
  const { formData, setFormData, errors, isVisible } = useAddProjectFormStore();

  // Handle input changes, updating the corresponding form data in Zustand store
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // If isVisible is false, return null to not render the component
  if (!isVisible) return null;

  return (
    <div className="relative p-1 rounded-lg">
      <h2 className="text-lg font-semibold">Create a Project</h2>

      {/* Project Title */}
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mt-2">
        Project Title
      </label>
      <input
        type="text"
        name="title"
        id="title" // Added id for accessibility
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter project title"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>} {/* Display title error */}

      {/* Project Category */}
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-2">
        Category
      </label>
      <select
        name="category"
        id="category" // Added id for accessibility
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded mt-1"
      >
        <option>Select</option>
        <option>Education</option>
        <option>Health</option>
        <option>Infrastructure</option>
        <option>Community Impact</option>
      </select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>} {/* Display category error */}

      {/* Project Type */}
      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mt-2">
        Project Type
      </label>
      <select
        name="type"
        id="type" // Added id for accessibility
        value={formData.type}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded mt-1"
      >
        <option value="">Select Project Type</option>
        <option value="Individual">Individual</option>
        <option value="Group">Group</option>
      </select>
      {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>} {/* Display type error */}

      {/* Project Location */}
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mt-2">
        Project Location
      </label>
      <input
        type="text"
        name="location"
        id="location" // Added id for accessibility
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter project location"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>} {/* Display location error */}

      {/* Project Description */}
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-2">
        Project Description
      </label>
      <textarea
        name="description"
        id="description" // Added id for accessibility
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter project description"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>} {/* Display description error */}
    </div>
  );
};

export default Step1;
