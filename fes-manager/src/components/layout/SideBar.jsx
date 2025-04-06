import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import CurrencyConverter from "../Convertor/CurrencyConverter";
import { auth } from "../../firebaseConfig";  // Import auth from firebase config
import { onAuthStateChanged } from "firebase/auth";  // Import auth state change listener

const SideBar = ({ isOpen }) => {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");  // State to store user's name
  const location = useLocation();
  const balance = 7755;

  // Fetch user's name from Firebase on component mount
  useEffect(() => {
    // Listen for changes in auth state (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, set the name
        setUserName(user.displayName || "Account Name");  // Use displayName if available, else fallback
      } else {
        setUserName("Account Name");  // If not logged in, show fallback name
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Sidebar controlled by HamburgerMenu */}
      <div
        className={`fixed top-[65px] right-0 h-[630px] w-84 sm:w-60 md:w-72 bg-darkGreen
          shadow-lg z-50 transition-transform duration-[500ms] rounded-l-3xl shadow-black
          dark:bg-sidebar dark:shadow-black
          ${isOpen ? "translate-x-0 ease-[cubic-bezier(5,1,0.5,1)]" : "translate-x-full ease-out"}
        `}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-greenNeon dark:border-cyaNeon">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-20 h-20 bg-white rounded-full dark:bg-text"></div>
            <h2 className="text-white font-bold">{userName}</h2> {/* Display user's name */}
          </div>
          <div className="mt-4">
            <CurrencyConverter amount={balance} />
          </div>
          <button
            className="mt-6 bg-greenNeon text-darkGreen py-2 
            px-4 w-full rounded-md dark:bg-dark dark:text-clear dark:hover:bg-surface"
            onClick={() => setShowForm(true)}
          >
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
                <Link
                  to={tab.path}
                  className={`block text-white py-2 
                  transition duration-300 ease-in-out 
                  group-hover:text-greenNeon dark:group-hover:text-shade
                  ${location.pathname === tab.path ? 
                  "bg-semiGreen p-2 dark:bg-surface " : ""}`}
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

      {/* Add Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <AddProjectForm />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
