import React, { useEffect } from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"; 

const Customization = () => {
  const { userData, updateUserData, initializeTheme } = useProfileSettingStore(); 

  // Ensure theme is set correctly when the component mounts
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div>
      <h2 className="text-xl font-bold text-teal-700 mb-4">Customization</h2>
      <div className="bg-gray-200 p-4 rounded-lg">
        
        {/* Theme Selection */}
        <label className="block mb-2">Theme Selection</label>
        <select
          className="p-2 border rounded w-full"
          value={userData.theme}
          onChange={(e) => updateUserData("theme", e.target.value)}
        >
          <option>Light Mode</option>
          <option>Dark Mode</option>
        </select>

        {/* Font Size */}
        <label className="block mt-4 mb-2">Font Size</label>
        <select
          className="p-2 border rounded w-full"
          value={userData.fontSize}
          onChange={(e) => updateUserData("fontSize", e.target.value)}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>

        {/* Project Feed Display */}
        <label className="block mt-4 mb-2">Project Feed Sorting</label>
        <select
          className="p-2 border rounded w-full"
          value={userData.projectFeedSort}
          onChange={(e) => updateUserData("projectFeedSort", e.target.value)}
        >
          <option>Latest</option>
          <option>Most Funded</option>
          <option>Nearest Completion</option>
        </select>

        {/* Show Supported Projects */}
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={userData.showSupportedProjects}
            onChange={(e) => updateUserData("showSupportedProjects", e.target.checked)}
          />
          <span>Show Only My Supported Projects</span>
        </div>

        {/* Privacy Settings */}
        <label className="block mt-4 mb-2">Privacy Preferences</label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={userData.hideDonations}
            onChange={(e) => updateUserData("hideDonations", e.target.checked)}
          />
          <span>Hide My Donations</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={userData.anonymousContributions}
            onChange={(e) => updateUserData("anonymousContributions", e.target.checked)}
          />
          <span>Show My Contributions as "Anonymous"</span>
        </div>
      </div>
    </div>
  );
};

export default Customization;
