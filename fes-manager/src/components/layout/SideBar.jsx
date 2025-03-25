import { useState } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import HamburgerMenu from "./HamburgerMenu";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // User balance formatted as currency
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(7755);

  return (
    <>
      {/* Hamburger Menu is only shown when sidebar is closed */}
      {!isOpen && <HamburgerMenu toggleSidebar={() => setIsOpen(true)} />}

      {/* Sidebar */}
      <div
        className={`fixed top-[75px] right-0 h-[670px] w-84 sm:w-60 md:w-72 bg-darkGreen shadow-lg z-[100] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar"
        >
          ✖
        </button>

        {/* Profile Section */}
        <div className="p-6 border-b border-greenNeon">
          <div className="flex items-center justify-center space-x-3">
            {/* Profile Image Placeholder */}
            <div className="w-20 h-20 bg-white rounded-full">
              {/* Image would go here */}
            </div>
            <h2 className="text-white font-bold">Account Name</h2>
          </div>
          <p className="text-greenNeon font-semibold text-center">{formattedBalance}</p>

          <button
            className="mt-6 bg-greenNeon text-darkGreen py-2 px-4 w-full rounded-md"
            onClick={() => setShowForm(true)}
          >
            Start A Project
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="h-[calc(90vh-300px)] overflow-y-auto p-9">
          <nav className="space-y-4">
            {[
              { name: "Profile", path: "/Profile" },
              { name: "Project Feed", path: "/LiveProjects" },
              { name: "Wish List", path: "/wishlist" },
              { name: "My Ark", path: "/MyArk" },
              { name: "Suggested Projects", path: "/Suggested-Projects" },
              { name: "My Donations", path: "/My-Data" },
              { name: "Deposit", path: "/Deposit" },
              { name: "Transaction History", path: "/Transactions" },
              { name: "Messages", path: "/Messages" },
              { name: "Notifications", path: "/Notifications" },
              { name: "Settings", path: "/Settings" },
              { name: "Help Center", path: "/Help" },
              { name: "Logout", path: "/logout" },
            ].map((tab, index) => (
              <div key={index} className="group">
                <Link
                  to={tab.path}
                  className="block text-white py-2 transition duration-300 group-hover:text-greenNeon"
                >
                  {tab.name}
                </Link>
                <div className="w-full h-[2px] bg-greenNeon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Add Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[110]">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-darkGreen"
              onClick={() => setShowForm(false)}
              aria-label="Close Add Project Form"
            >
              X
            </button>
            <AddProjectForm />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
