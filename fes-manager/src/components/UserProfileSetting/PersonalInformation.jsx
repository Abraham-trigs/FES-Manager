import React from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"

const PersonalInformation = () => {
  const { userData, updateUserData } = useProfileSettingStore(); 

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Personal Information</h2>
      <div className="space-y-4">
        
        {/* Profile Picture */}
        <div>
          <label className="block mb-1 font-semibold">Profile Picture</label>
          <input type="file" className="w-full p-2 border rounded" accept="image/*" />
        </div>
        
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userData.fullName}
            onChange={(e) => updateUserData("fullName", e.target.value)}
          />
        </div>
        
        {/* Display Name */}
        <div>
          <label className="block mb-1 font-semibold">Display Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userData.displayName || ""}
            onChange={(e) => updateUserData("displayName", e.target.value)}
          />
        </div>
        
        {/* Email Address (Only Add, No Edit) */}
        <div>
          <label className="block mb-1 font-semibold">Email Address</label>
          <p className="text-gray-600 text-sm">Current Email: {userData.email || "Not Added"}</p>
          <button className="mt-2 px-4 py-2 bg-teal-700 text-white rounded" onClick={() => alert("Add Email Feature Coming Soon")}>Add Email</button>
        </div>
        
        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border rounded"
            value={userData.phone}
            onChange={(e) => updateUserData("phone", e.target.value)}
          />
        </div>
        
        {/* Country Selection */}
        <div>
          <label className="block mb-1 font-semibold">Country</label>
          <select
            className="w-full p-2 border rounded"
            value={userData.country}
            onChange={(e) => updateUserData("country", e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
