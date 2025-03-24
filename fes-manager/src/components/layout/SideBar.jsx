import { useState } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import HamburgerMenu from "./HamburgerMenu"; // ✅ Import Hamburger Menu

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true); // ✅ Sidebar is open by default
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* ✅ Hamburger Menu Component */}
      {!isOpen && <HamburgerMenu isOpen={isOpen} toggleSidebar={() => setIsOpen(true)} />}

      {/* Sidebar - Stays Within Viewport */}
      <div
        className={`fixed top-[75px] right-0 h-[670px] w-84 bg-darkGreen shadow-lg z-[100] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ✅ Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Profile Section - Fixed at the Top */}
        <div className="p-6 border-b border-greenNeon">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-20 h-20 bg-white rounded-full"></div>
            <h2 className="text-white font-bold">Account Name</h2>
          </div>
          <p className="text-greenNeon font-semibold text-center">7,755.00</p>
           {/* ✅ "Start A Project" Button */}
          <button
            className="mt-6 bg-greenNeon text-darkGreen py-2 px-4 w-full rounded-md"
            onClick={() => setShowForm(true)}
          >
            Start A Project
          </button>

        </div>

        {/* ✅ Scrollable Menu Items */}
        <div className="h-[calc(100vh-300px)] overflow-y-auto p-9">
          <nav className="space-y-">
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
              { name: "Logout", path: "/logout" }
            ].map((tab, index) => (
              <div key={index} className="group">
                <Link
                  to={tab.path}
                  className="block text-white py-2 transition duration-300 group-hover:text-greenNeon"
                >
                  {tab.name}
                </Link>
                {/* Underline Effect */}
                <div className="w-full h-[2px] bg-greenNeon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </nav>

        </div>
      </div>

      {/* ✅ Add Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[110]">
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
