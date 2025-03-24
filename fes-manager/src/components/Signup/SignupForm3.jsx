import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm3 = () => {
  const { userData, errors, updateField, setErrors, nextStep, prevStep, step } = useCreateProfileStore();

  // Validation for Step 3
  const validateStep3 = () => {
    let newErrors = {};

    if (!userData.country) newErrors.country = "Country is required";
    if (!userData.stateCity) newErrors.stateCity = "State/City is required";

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

      {/* Step 3: Location & Preferences */}
      <div>
        {/* Country */}
        <label htmlFor="country" className="block text-gray-700 font-medium text-left">
          Select Your Country
        </label>
        <select
          id="country"
          name="country"
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
          value={userData.country || ""}  // ✅ Prevents uncontrolled input
          onChange={(e) => updateField("country", e.target.value)}
        >
          <option value="">Select Country</option>
          <option value="USA">United States</option>
          <option value="Canada">Canada</option>
          <option value="Ghana">Ghana</option>
          <option value="India">India</option>
          <option value="UK">United Kingdom</option>
          <option value="Other">Other</option>
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

        {/* State/City */}
        <label htmlFor="stateCity" className="block text-gray-700 font-medium text-left mt-3">
          State/City
        </label>
        <input
          type="text"
          id="stateCity"
          name="stateCity"
          placeholder="Enter your state or city"
          value={userData.stateCity || ""}  // ✅ Ensures default value
          onChange={(e) => updateField("stateCity", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.stateCity && <p className="text-red-500 text-sm">{errors.stateCity}</p>}

        {/* Preferred Communication Method */}
        <h6 className="font-bold my-5 text-darkGreen">How Would You Like FES-Manager to Engage With You?</h6> 
        <div className="flex flex-col space-y-2 text-left">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="emailComm"
              checked={userData.preferredCommunication?.includes("Email") || false}  // ✅ Prevents undefined
              onChange={(e) => {
                const method = "Email";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...(userData.preferredCommunication || []), method]
                    : (userData.preferredCommunication || []).filter((item) => item !== method)
                );
              }}
              className="mr-2"
            />
            Email
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              id="smsComm"
              checked={userData.preferredCommunication?.includes("SMS") || false}  // ✅ Prevents undefined
              onChange={(e) => {
                const method = "SMS";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...(userData.preferredCommunication || []), method]
                    : (userData.preferredCommunication || []).filter((item) => item !== method)
                );
              }}
              className="mr-2"
            />
            SMS
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              id="whatsappComm"
              checked={userData.preferredCommunication?.includes("WhatsApp") || false}  // ✅ Prevents undefined
              onChange={(e) => {
                const method = "WhatsApp";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...(userData.preferredCommunication || []), method]
                    : (userData.preferredCommunication || []).filter((item) => item !== method)
                );
              }}
              className="mr-2"
            />
            WhatsApp
          </label>
        </div>

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
              if (validateStep3()) nextStep();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm3;
