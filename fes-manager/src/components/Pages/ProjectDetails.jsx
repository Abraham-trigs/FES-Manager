import React from "react";
import { useParams } from "react-router-dom";
import useAddProjectFormStore from "../../store/AddProjectFormStore";
import MainNavBar from "../layout/MainNavBar";
import Footer from "../layout/Footer";
import SideBar from "../layout/SideBar";

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL params
  const project = useAddProjectFormStore((state) =>
    state.submittedProjects.find((p) => p.id === id) // Retrieve the project data from the store
  );

  // If the project doesn't exist, show an error message
  if (!project) return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center">
        {/* Full-page background */}
        <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

        {/* Sidebar for navigation */}
        <SideBar />

        {/* Navigation bar */}
        <MainNavBar />

        {/* Main Content */}
        <div className="container mx-auto p-6 mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Project Details</h2>

          {/* Project Title */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Project Title</h3>
            <p className="text-gray-600">{project.title}</p>
          </section>

          {/* Project Category */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Category</h3>
            <p className="text-gray-600">{project.category}</p>
          </section>

          {/* Project Type */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Project Type</h3>
            <p className="text-gray-600">{project.type}</p>
          </section>

          {/* Project Location */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Project Location</h3>
            <p className="text-gray-600">{project.location}</p>
          </section>

          {/* Project Description */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600">{project.description}</p>
          </section>

          {/* Funding Goal */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Funding Goal</h3>
            <p className="text-gray-600">{project.fundingGoal}</p>
          </section>

          {/* Tasks (with amounts) */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Tasks</h3>
            {project.tasks && project.tasks.length > 0 ? (
              <ul className="list-disc pl-6">
                {project.tasks.map((task, index) => (
                  <li key={index} className="text-gray-600">
                    <strong>{task.name}</strong>: {task.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No tasks added.</p>
            )}
          </section>

          {/* Project Verification */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Project Verifier</h3>
            <p className="text-gray-600">Verifier Type: {project.verifierType}</p>

            {project.verifierType && (
              <>
                <h4 className="text-lg font-semibold text-gray-700 mt-4">Uploaded Documents:</h4>
                <ul className="list-disc pl-6">
                  {project.uploadedDocs &&
                    Object.keys(project.uploadedDocs).map((doc, index) => (
                      <li key={index} className="text-gray-600">
                        {doc}: {project.uploadedDocs[doc]?.name || 'Not uploaded'}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </section>

          {/* Contact Information */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
            <p className="text-gray-600"><strong>Name:</strong> {project.name}</p>
            <p className="text-gray-600"><strong>Occupation:</strong> {project.occupation}</p>
            <p className="text-gray-600"><strong>Email:</strong> {project.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {project.phone}</p>
            <p className="text-gray-600"><strong>Digital Address:</strong> {project.digitalAddress}</p>
          </section>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetails;
