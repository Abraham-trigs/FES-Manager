import React from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"; // ✅ Correct import

const MyArkSettings = () => {
  const { userData, updateUserData } = useProfileSettingStore(); // ✅ Using Zustand store

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-teal-700 mb-4">My Ark Settings</h2>
      <div className="space-y-4">
        
        {/* Ark Name */}
        <div>
          <label className="block mb-1 font-semibold">My Ark Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userData.arkName || ""}
            onChange={(e) => updateUserData("arkName", e.target.value)}
          />
        </div>
        
        {/* Ark Description */}
        <div>
          <label className="block mb-1 font-semibold">Ark Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={userData.arkDescription || ""}
            onChange={(e) => updateUserData("arkDescription", e.target.value)}
          />
        </div>

        {/* Privacy Settings */}
        <div>
          <label className="block mb-1 font-semibold">Privacy Settings</label>
          <select
            className="w-full p-2 border rounded"
            value={userData.arkPrivacy || "Public"}
            onChange={(e) => updateUserData("arkPrivacy", e.target.value)}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Beneficiary Management */}
        <div>
          <label className="block mb-1 font-semibold">My Ark Beneficiaries</label>
          <ul className="list-disc pl-5">
            {userData.beneficiaries?.length > 0 ? (
              userData.beneficiaries.map((beneficiary, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{beneficiary.name}</span>
                  <button className="text-red-600" onClick={() => alert("Remove Beneficiary Coming Soon")}>Remove</button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No beneficiaries added yet.</p>
            )}
          </ul>
          <button className="mt-2 px-4 py-2 bg-teal-700 text-white rounded" onClick={() => alert("Add Beneficiary Coming Soon")}>Add Beneficiary</button>
        </div>

        {/* Recurring Donation Preferences */}
        <div>
          <label className="block mb-1 font-semibold">Recurring Support</label>
          <select
            className="w-full p-2 border rounded"
            value={userData.recurringSupport || "None"}
            onChange={(e) => updateUserData("recurringSupport", e.target.value)}
          >
            <option value="None">None</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Custom">Set Custom Renewal</option>
          </select>
          {userData.recurringSupport !== "None" && (
            <div className="mt-4">
              <label className="block mb-1 font-semibold">Support Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
                value={userData.supportAmount || ""}
                onChange={(e) => updateUserData("supportAmount", e.target.value)}
              />
              <label className="block mt-4 mb-1 font-semibold">Custom Message</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write a message for your beneficiary"
                value={userData.supportMessage || ""}
                onChange={(e) => updateUserData("supportMessage", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div>
          <label className="block mb-1 font-semibold">Notification Preferences</label>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={userData.notifyDonations} onChange={(e) => updateUserData("notifyDonations", e.target.checked)} />
            <span>Notify on new donations</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" checked={userData.notifyMilestones} onChange={(e) => updateUserData("notifyMilestones", e.target.checked)} />
            <span>Notify when a project milestone is reached</span>
          </div>
        </div>

        {/* Chat with Beneficiaries */}
        <div>
          <label className="block mb-1 font-semibold">Chat with Beneficiaries</label>
          <ul className="list-disc pl-5">
            {userData.beneficiaries?.length > 0 ? (
              userData.beneficiaries.map((beneficiary, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{beneficiary.name}</span>
                  <button className="text-blue-600" onClick={() => alert(`Chat with ${beneficiary.name} Coming Soon`)}>Message</button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No beneficiaries available to chat.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyArkSettings;
