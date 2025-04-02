import React, { useState } from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore";

const Step1 = () => {
  const { formData, setFormData, errors } = useAddProjectFormStore();  // Now also grabbing errors from Zustand store
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  if (!isVisible) return null; // ✅ Don't render if hidden

  return (
    <div className="relative p-1 rounded-lg ">
      <h2 className="text-lg font-semibold">Create a Project</h2>

      {/* Project Title */}
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Project Title
      </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter project title"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>} {/* Display title error */}

      {/* Project Category */}
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Category
      </label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded mt-1"
      >
        <option></option>
        <option>Education</option>
        <option>Health</option>
        <option>Infrastructure</option>
        <option>Community Impact</option>
      </select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>} {/* Display category error */}

      {/* Project Type */}
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Project Type
      </label>
      <select
        name="type"
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
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Project Location
      </label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter project location"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>} {/* Display location error */}

      {/* Project Description */}
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Project Description
      </label>
      <textarea
        name="description"
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
