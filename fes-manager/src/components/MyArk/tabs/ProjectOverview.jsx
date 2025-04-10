import React from 'react';

const ProjectOverview = () => {
  // Example static data (replace with dynamic data from store or API)
  const projectDetails = {
    title: 'Example Project Title',
    description: 'This is a short description of the project.',
    goal: '5000',
    raised: '1200',
  };

  return (
    <div>
      <h2>Project Overview</h2>
      <p><strong>Title:</strong> {projectDetails.title}</p>
      <p><strong>Description:</strong> {projectDetails.description}</p>
      <p><strong>Funding Goal:</strong> ${projectDetails.goal}</p>
      <p><strong>Funds Raised:</strong> ${projectDetails.raised}</p>
    </div>
  );
};

export default ProjectOverview;
