import React, { useState } from "react";
import useProjectStore from "../store/useProjectStore";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1000000).toString(), // Auto-generate an ID
    category: "",
    progress: 0,
    description: "",
    image: "",
  });

  const addProject = useProjectStore((state) => state.addProject);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.description) return;

    addProject(formData); // Add new project
    setFormData({ id: Math.floor(Math.random() * 1000000).toString(), category: "", progress: 0, description: "", image: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 mb-2 w-full" required />
      <input type="number" name="progress" value={formData.progress} onChange={handleChange} placeholder="Progress %" className="border p-2 mb-2 w-full" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 mb-2 w-full" required />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-greenNeon text-white p-2 w-full">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
