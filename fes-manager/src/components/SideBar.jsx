import { useState } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "./ProjectForm/AddProjectForm";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Hamburger Icon - Now on the Right */}
      <button
        className="fixed top-4 right-4 z-50 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-between">
          <span className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
          <span className={`block h-1 w-full bg-white rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
        </div>
      </button>

      {/* Sidebar - Now on the Right */}
      <div
        className={`fixed top-0 right-0 h-full bg-darkGreen shadow-lg w-64 p-6 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-2"></div>
          <h2 className="text-white font-bold">Account Name</h2>
          <p className="text-greenNeon font-semibold">7,755.00</p>
        </div>

        {/* Menu Links */}
        <nav className="space-y-4">
          <Link to="/profile" className="block text-white">Profile</Link>
          <Link to="/project-feed" className="block text-white">Project Feed</Link>
          <Link to="/project-data" className="block text-white">Project Data</Link>
          <Link to="/my-data" className="block text-white">My Data</Link>
          <Link to="/wishlist" className="block text-white">Wish List</Link>
          <Link to="/impact-stories" className="block text-white">Impact Stories</Link>
          <Link to="/deposit" className="block text-white">Deposit</Link>
        </nav>

        {/* Start a Project Button */}
        <button
          className="mt-6 bg-greenNeon text-white py-2 px-4 w-full rounded-md"
          onClick={() => setShowForm(true)}
        >
          Start A Project
        </button>
      </div>

      {/* Add Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button className="absolute top-2 right-2 text-darkGreen" onClick={() => setShowForm(false)}>X</button>
            <AddProjectForm />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
