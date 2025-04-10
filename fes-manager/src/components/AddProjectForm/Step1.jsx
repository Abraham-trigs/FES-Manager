import React from "react";
import useAddProjectFormStore from "../../store/AddProjectFormStore"; // Import Zustand store to manage form state

const Step1 = () => {
  // Grabbing form data, setFormData, errors, isVisible, and setImage from the Zustand store
  const { formData, setFormData, errors, isVisible, setImage } = useAddProjectFormStore();

  // Handle input changes, updating the corresponding form data in Zustand store
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });  // Set the updated value to the respective field in the formData state
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the uploaded file
    if (file) {
      // Create a URL for the uploaded image (for preview)
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);  // Store the image URL in Zustand for access in other components
    }
  };

  // If isVisible is false, return null to not render the component
  if (!isVisible) return null;  // This controls the visibility of this step, based on the store

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
        id="title"
        value={formData.title || ''}  // Bind the input value to formData.title
        onChange={handleChange}  // Trigger handleChange on input change
        placeholder="Enter project title"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}  {/* Display validation error for title */}

      {/* Project Category */}
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-2">
        Category
      </label>
      <select
        name="category"
        id="category"
        value={formData.category || ''}  // Bind the select value to formData.category
        onChange={handleChange}  // Trigger handleChange on input change
        className="w-full px-4 py-2 border rounded mt-1"
      >
        <option value="">Select</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Community Impact">Community Impact</option>
      </select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}  {/* Display validation error for category */}

      {/* Project Type */}
      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mt-2">
        Project Type
      </label>
      <select
        name="type"
        id="type"
        value={formData.type || ''}  // Bind the select value to formData.type
        onChange={handleChange}  // Trigger handleChange on input change
        className="w-full px-4 py-2 border rounded mt-1"
      >
        <option value="">Select Project Type</option>
        <option value="Individual">Individual</option>
        <option value="Group">Group</option>
      </select>
      {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}  {/* Display validation error for type */}

      {/* Project Location */}
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mt-2">
        Project Location
      </label>
      <input
        type="text"
        name="location"
        id="location"
        value={formData.location || ''}  // Bind the input value to formData.location
        onChange={handleChange}  // Trigger handleChange on input change
        placeholder="Enter project location"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}  {/* Display validation error for location */}

      {/* Project Description */}
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-2">
        Project Description
      </label>
      <textarea
        name="description"
        id="description"
        value={formData.description || ''}  // Bind the textarea value to formData.description
        onChange={handleChange}  // Trigger handleChange on input change
        placeholder="Enter project description"
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}  {/* Display validation error for description */}

      {/* Image Upload */}
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mt-2">
        Project Image
      </label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={handleImageChange}  // Trigger handleImageChange on image file selection
        className="w-full px-4 py-2 border rounded mt-1"
      />
      {formData.image && <img src={formData.image} alt="Project" className="mt-2 rounded w-32 h-32 object-cover" />}  {/* Display the uploaded image preview */}
    </div>
  );
};

export default Step1;
