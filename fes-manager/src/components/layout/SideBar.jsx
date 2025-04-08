import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import CurrencyConverter from "../Convertor/CurrencyConverter";
import useDonorWallet from "../../store/DonorWallet";

const SideBar = ({ isOpen }) => {
  // State to control the visibility of the AddProjectForm modal
  const [showForm, setShowForm] = useState(false);

  // Access balance from the store
  const { balance } = useDonorWallet();

  const location = useLocation();

  return (
    <>
      {/* Sidebar Slide-in Panel - Controlled via HamburgerMenu */}
      <div
        className={`fixed top-[65px] right-0 h-[630px] w-84 sm:w-60 md:w-72 bg-darkGreen
        shadow-lg z-50 transition-transform duration-[500ms] rounded-l-3xl shadow-black
        dark:bg-sidebar dark:shadow-black
        ${isOpen ? "translate-x-0 ease-[cubic-bezier(5,1,0.5,1)]" : "translate-x-full ease-out"}`}
      >
        {/* Profile Overview Section */}
        <div className="p-6 border-b border-greenNeon dark:border-cyaNeon">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-20 h-20 bg-white rounded-full dark:bg-text"></div>
            <h2 className="text-white font-bold">Account Name</h2>
          </div>

          {/* Currency Conversion Display */}
          <div className="mt-4">
            {/* Pass balance from store to CurrencyConverter component */}
            <CurrencyConverter amount={balance} />
          </div>

          {/* Trigger: Start A Project Button */}
          <button
            className="mt-6 bg-greenNeon text-darkGreen py-2 
            px-4 w-full rounded-md dark:bg-dark dark:text-clear dark:hover:bg-surface"
            onClick={() => setShowForm(true)}
          >
            Start A Project
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="h-[calc(90vh-300px)] overflow-y-auto p-9">
          <nav className="space-y-4">
            {[
              { name: "Project Feed", path: "/LiveProjects" },
              { name: "Profile Settings", path: "/Settings" },
              { name: "My Ark", path: "/MyArk" },
              { name: "Suggested Projects", path: "/Suggested-Projects" },
              { name: "My Donations", path: "/My-Data" },
              { name: "My Wallet", path: "/MyWallet" },
              { name: "Messages", path: "/Messages" },
              { name: "Notifications", path: "/Notifications" },
              { name: "Help Center", path: "/Help" },
              { name: "Logout", path: "/logout" },
            ].map((tab, index) => (
              <div key={index} className="group">
                <Link
                  to={tab.path}
                  className={`block text-white py-2 
                    transition duration-300 ease-in-out 
                    group-hover:text-greenNeon dark:group-hover:text-shade
                    ${location.pathname === tab.path ? 
                      "bg-semiGreen p-2 dark:bg-surface " : ""}
                  `}
                >
                  {tab.name}
                </Link>
                <div
                  className="w-full h-[2px] bg-greenNeon opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300
                    dark:bg-cyaNeon"
                ></div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Add Project Modal - Shows Form with Close Button */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white dark:bg-surface p-6 rounded-lg w-[90%] max-w-xl relative shadow-xl border border-greenNeon">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-darkGreen dark:text-cyaNeon font-bold text-xl"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Add Project Form with onClose passed as prop */}
            <AddProjectForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
