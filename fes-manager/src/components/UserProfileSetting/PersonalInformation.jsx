import React from "react";
import useProfileSettingStore from "../../store/UserProfileSettingStore"

const PersonalInformation = () => {
  const { userData, updateUserData } = useProfileSettingStore(); 

  return (
    <div className=" dark:hover:bg-verydark max-w-md transition-colors mx-auto p-9 bg-white dark:bg-surface rounded-lg 
        shadow-lg 
        ">
      <h2 className="text-xl font-bold text-teal-700 mb-4
        dark:text-text
      ">Personal Information</h2>
      <div className="space-y-4">
        
        {/* Profile Picture */}
        <div>
          <label className="block mb-1 font-semibold dark:text-text ">Profile Picture</label>
          <input type="file" className="w-full p-2 border rounded dark:bg-greeNeon dark:border-none" accept="image/*" />
        </div>
        
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-semibold dark:text-text ">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:hover:bg-surface
            dark:bg-dark dark:text-text dark:border-none"
            value={userData.fullName}
            onChange={(e) => updateUserData("fullName", e.target.value)}
          />
        </div>
        
        {/* Display Name */}
        <div>
          <label className="block mb-1 font-semibold dark:text-text ">Display Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-dark dark:text-text 
            dark:border-none dark:hover:bg-surface"
            value={userData.displayName || ""}
            onChange={(e) => updateUserData("displayName", e.target.value)}
          />
        </div>
        
        {/* Email Address (Only Add, No Edit) */}
        <div>
          <label className="block mb-1 font-semibold dark:text-text ">Email Address</label>
          <p className="text-gray-600 text-sm dark:text-shade ">abrahamtrigs@gmail.com: {userData.email || " "}</p>
          <button className="mt-2 px-4 py-2 bg-teal-700 text-white 
            rounded dark:bg-greeNeon dark:hover:bg-dark transition-colors
            " onClick={() => alert("Add Email Feature Coming Soon")}>Add Email</button>
        </div>
        
        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-semibold  dark:text-text ">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border rounded dark:bg-dark dark:text-clear 
            dark:border-none dark:hover:bg-surface"
            value={userData.phone}
            onChange={(e) => updateUserData("phone", e.target.value)}
          />
        </div>
        
        {/* Country Selection */}
        <div>
          <label className="block mb-1 font-semibold dark:text-text ">Country</label>
          <select
            className="w-full p-2 border rounded dark:bg-verydark dark:
            text-clear dark:border-none dark:hover:bg-surface"
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
