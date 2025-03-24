import React from "react";

const UserPrivacy = () => {
  return (
      <div>
          {/* Title of the section */}
          <h2 className="text-xl font-bold text-teal-700 mb-4">Privacy Settings</h2>

          {/* Privacy settings container */}
          <div className="bg-gray-200 p-4 rounded-lg">
              {/* Anonymous Donations setting */}
              <label className="flex justify-between items-center mb-2">
                  Anonymous Donations
                  <input type="checkbox" className="toggle-checkbox" /> {/* Checkbox to enable anonymous donations */}
              </label>

              {/* Profile Visibility setting */}
              <label className="flex justify-between items-center mb-2">
                  Profile Visibility
                  <input type="checkbox" className="toggle-checkbox" /> {/* Checkbox to toggle profile visibility */}
              </label>

              {/* Dropdown for who can see the user's profile */}
              <div className="mt-2">
                  <label className="block mb-1">Who can see your profile?</label>
                  <select className="p-2 border rounded w-full">
                      <option>Public</option> {/* Option for public visibility */}
                      <option>Private</option> {/* Option for private visibility */}
                      <option>Connected Donors/Organizations</option> {/* Option for specific visibility */}
                  </select>
              </div>

              {/* Activity Visibility setting */}
              <label className="flex justify-between items-center mt-4">
                  Activity Visibility
                  <input type="checkbox" className="toggle-checkbox" /> {/* Checkbox for activity visibility */}
              </label>
          </div>
      </div>
  );
};

export default UserPrivacy;
