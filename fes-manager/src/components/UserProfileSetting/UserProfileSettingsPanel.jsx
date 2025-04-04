import React from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"; // Import the Zustand store to manage active tab state
import UserPrivacy from "./UserPrivacy";
import PersonalInformation from "./PersonalInformation";
import Customization from "./Customization";
import MyArkSettings from "./MyArkSetting";

const UserProfileSettingsPanel = () => {
  // Access activeTab and setActiveTab from the Zustand store to control the selected tab
  const { activeTab, setActiveTab } = useProfileSettingStore();

  // Define the list of tabs in the user profile settings
  const tabs = [
    "Personal Information",
    "Privacy Settings",
    "Customization",
    "Donation & Support History", // This tab isn't currently used but is part of the structure
    "Linked Organizations", // This tab isn't currently used but is part of the structure
    "My Ark Settings",
  ];

  return (
    <>

      <div className="flex w-full h-full  ">
        {/* Sidebar (static Static) */}
        <div className="w-1/4 bg-teal-900  dark:bg-sidebar 
        dark:text-text 
        text-white p-4 h-screen 
        fixed left-0 top-0 overflow-y-auto ">
          <h2 className="text-lg font-bold mb-4 mt-[90px]">Account Name</h2>
          <ul>
            {/* Iterate through the tabs and display them as clickable list items */}
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`p-2 cursor-pointer dark:hover:bg-dark transition-colors${activeTab === tab ? "bg-teal-700 dark:bg-surface dark:hover:bg-verydark" : ""}`}
                onClick={() => setActiveTab(tab)} // Set the active tab when a tab is clicked
              >
                {tab}
              </li>
            ))}
          </ul>
          <button className="text-green-400 mt-4">Save</button> {/* Save button */}
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-6 bg-prime shadow-lg ml-[25%]
            dark:shadow-black 
          ">
          {/* Conditionally render the content based on the active tab */}
          {activeTab === "Privacy Settings" && <UserPrivacy />}
          {activeTab === "Personal Information" && <PersonalInformation />}
          {activeTab === "Customization" && <Customization />}
          {activeTab === "My Ark Settings" && <MyArkSettings />}
        </div>
      </div>
    </>
  );
};

export default UserProfileSettingsPanel;
