import { useState } from "react"; // ✅ Add this line
import { Link, useLocation } from "react-router-dom";
import AddProjectForm from "../AddProjectForm/AddProjectsForm";
import CurrencyConverter from "../Convertor/CurrencyConverter";


const SideBar = ({ isOpen }) => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const balance = 7755;

  return (
    <>
      {/* Sidebar controlled by HamburgerMenu */}
      <div
        className={`fixed top-[75px] right-0 h-[670px] w-84 sm:w-60 md:w-72 bg-darkGreen shadow-lg z-[100] 
          transition-transform duration-[500ms] ${
            isOpen ? "translate-x-0 ease-[cubic-bezier(5,1,0.5,1)]" : "translate-x-full ease-out"
          }`}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-greenNeon">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-20 h-20 bg-white rounded-full"></div>
            <h2 className="text-white font-bold">Account Name</h2>
          </div>
          <div className="mt-4">
            <CurrencyConverter amount={balance} />
          </div>
          <button className="mt-6 bg-greenNeon text-darkGreen py-2 px-4 w-full rounded-md" onClick={() => setShowForm(true)}>
            Start A Project
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="h-[calc(90vh-300px)] overflow-y-auto p-9">
          <nav className="space-y-4">
            {[
              { name: "Profile Settings", path: "/Settings" },
              { name: "Project Feed", path: "/LiveProjects" },
              { name: "Wish List", path: "/wishlist" },
              { name: "My Ark", path: "/MyArk" },
              { name: "Suggested Projects", path: "/Suggested-Projects" },
              { name: "My Donations", path: "/My-Data" },
              { name: "Deposit", path: "/Deposit" },
              { name: "Transaction History", path: "/Transactions" },
              { name: "Messages", path: "/Messages" },
              { name: "Notifications", path: "/Notifications" },
              { name: "Help Center", path: "/Help" },
              { name: "Logout", path: "/logout" },
            ].map((tab, index) => (
              <div key={index} className="group">
                <Link to={tab.path} className={`block text-white py-2 transition duration-300 ease-in-out group-hover:text-greenNeon ${location.pathname === tab.path ? "bg-semiGreen p-2" : ""}`}>
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
            <AddProjectForm />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
