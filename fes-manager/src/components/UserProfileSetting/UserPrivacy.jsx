import React from "react";

const UserPrivacy = () => {
  return (
      <div>
          <h2 className="text-xl font-bold text-teal-700 mb-4">Privacy Settings</h2>
          <div className="bg-gray-200 p-4 rounded-lg">
              <label className="flex justify-between items-center mb-2">
                  Anonymous Donations
                  <input type="checkbox" className="toggle-checkbox" />
              </label>
              <label className="flex justify-between items-center mb-2">
                  Profile Visibility
                  <input type="checkbox" className="toggle-checkbox" />
              </label>
              <div className="mt-2">
                  <label className="block mb-1">Who can see your profile?</label>
                  <select className="p-2 border rounded w-full">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Connected Donors/Organizations</option>
                  </select>
              </div>
              <label className="flex justify-between items-center mt-4">
                  Activity Visibility
                  <input type="checkbox" className="toggle-checkbox" />
              </label>
          </div>
      </div>
  );
};

export default UserPrivacy;
