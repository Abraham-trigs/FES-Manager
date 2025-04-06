import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm2 = () => {
  const { userData, errors, updateField, setErrors, nextStep, prevStep, step } = useCreateProfileStore();

  // Validation for Step 2
  const validateStep2 = () => {
    let newErrors = {};

    if (!userData.accountType) newErrors.accountType = "Please select an account type";

    if ((userData.accountType === "Organization" || userData.accountType === "Government") && !userData.organizationName) {
      newErrors.organizationName = "Organization/Government Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      {/* Logo */}
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />

      {/* Form Title */}
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      <h3 className="font-semibold text-lg my-5 text-darkGreen"> FORM TITLE HERE</h3>

      {/* Step 2: Account Type Selection */}
      <div>
        <label htmlFor="accountType" className="block text-gray-700 font-medium mb-2">
          Select Account Type
        </label>

        {/* Account Type Options */}
        <select
          id="accountType"
          name="accountType"
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
          value={userData.accountType}
          onChange={(e) => updateField("accountType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Individual Donor">Individual</option>
          <option value="Organization">Private Organization</option>
          <option value="Government">Government Representative</option>
        </select>
        {errors.accountType && <p className="text-red-500 text-sm">{errors.accountType}</p>}

        {/* Organization/Government Name (Only for Organization & Government Representative) */}
        {(userData.accountType === "Organization" || userData.accountType === "Government") && (
          <>
            <label htmlFor="organizationName" className="block text-gray-700 font-medium mt-3">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              placeholder="Organization/Government Name"
              value={userData.organizationName}
              onChange={(e) => updateField("organizationName", e.target.value)}
              className="w-full p-3 my-2 border border-gray-300 rounded-lg"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm">{errors.organizationName}</p>
            )}

            {/* Optional Role */}
            <label htmlFor="role" className="block text-gray-700 font-medium mt-3">
              Role/Position (Optional)
            </label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Role/Position (Optional)"
              value={userData.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="w-full p-3 my-2 border border-gray-300 rounded-lg"
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              step > 1 ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          <button
            className="bg-greenNeon text-darkGreen px-6 py-2 rounded-lg font-medium hover:bg-green-500"
            onClick={() => {
              if (validateStep2()) nextStep();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm2;
