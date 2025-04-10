import React from 'react';

const ManageMyProjects = () => {
  const handleEditProject = () => {
    // Logic to open project edit form
    console.log('Editing project');
  };

  const handleDeleteProject = () => {
    // Logic to delete the project
    console.log('Deleting project');
  };

  return (
    <div>
      <h2>Manage My Projects</h2>
      <button onClick={handleEditProject}>Edit Project Details</button>
      <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  );
};

export default ManageMyProjects;
