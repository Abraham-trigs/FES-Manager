import React from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"; 

const MyArkSettings = () => {
  const { userData, updateUserData } = useProfileSettingStore(); // Accessing Zustand store for user data and update function

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-teal-700 mb-4">My Ark Settings</h2>
      <div className="space-y-4">
        
        {/* Ark Name Field */}
        <div>
          <label className="block mb-1 font-semibold">My Ark Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userData.arkName || ""} // Binding input value to userData
            onChange={(e) => updateUserData("arkName", e.target.value)} // Updating arkName in the Zustand store
          />
        </div>
        
        {/* Ark Description Field */}
        <div>
          <label className="block mb-1 font-semibold">Ark Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={userData.arkDescription || ""} // Binding textarea value to userData
            onChange={(e) => updateUserData("arkDescription", e.target.value)} // Updating arkDescription in the Zustand store
          />
        </div>

        {/* Privacy Settings Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Privacy Settings</label>
          <select
            className="w-full p-2 border rounded"
            value={userData.arkPrivacy || "Public"} // Binding privacy settings value to userData
            onChange={(e) => updateUserData("arkPrivacy", e.target.value)} // Updating arkPrivacy in the Zustand store
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Beneficiary Management Section */}
        <div>
          <label className="block mb-1 font-semibold">My Ark Beneficiaries</label>
          <ul className="list-disc pl-5">
            {/* If beneficiaries exist, map over them to display */}
            {userData.beneficiaries?.length > 0 ? (
              userData.beneficiaries.map((beneficiary, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{beneficiary.name}</span>
                  {/* Temporary alert for removing beneficiaries */}
                  <button className="text-red-600" onClick={() => alert("Remove Beneficiary Coming Soon")}>Remove</button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No beneficiaries added yet.</p>
            )}
          </ul>
          {/* Button to add a new beneficiary (temporary alert) */}
          <button className="mt-2 px-4 py-2 bg-teal-700 text-white rounded" onClick={() => alert("Add Beneficiary Coming Soon")}>Add Beneficiary</button>
        </div>

        {/* Recurring Donation Preferences Section */}
        <div>
          <label className="block mb-1 font-semibold">Recurring Support</label>
          <select
            className="w-full p-2 border rounded"
            value={userData.recurringSupport || "None"} // Binding recurring support preference to userData
            onChange={(e) => updateUserData("recurringSupport", e.target.value)} // Updating recurringSupport in the Zustand store
          >
            <option value="None">None</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Custom">Set Custom Renewal</option>
          </select>
          {/* If recurring support is selected, show additional fields */}
          {userData.recurringSupport !== "None" && (
            <div className="mt-4">
              <label className="block mb-1 font-semibold">Support Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
                value={userData.supportAmount || ""} // Binding support amount value to userData
                onChange={(e) => updateUserData("supportAmount", e.target.value)} // Updating supportAmount in the Zustand store
              />
              <label className="block mt-4 mb-1 font-semibold">Custom Message</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Write a message for your beneficiary"
                value={userData.supportMessage || ""} // Binding support message value to userData
                onChange={(e) => updateUserData("supportMessage", e.target.value)} // Updating supportMessage in the Zustand store
              />
            </div>
          )}
        </div>

        {/* Notification Preferences Section */}
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

        {/* Chat with Beneficiaries Section */}
        <div>
          <label className="block mb-1 font-semibold">Chat with Beneficiaries</label>
          <ul className="list-disc pl-5">
            {/* If beneficiaries exist, map over them to display message button */}
            {userData.beneficiaries?.length > 0 ? (
              userData.beneficiaries.map((beneficiary, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{beneficiary.name}</span>
                  {/* Temporary alert for chatting with beneficiaries */}
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
