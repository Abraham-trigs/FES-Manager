import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignUpForm3 = () => {
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
        <select
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
          value={userData.country}
          onChange={(e) => updateField("country", e.target.value)}
        >
          <option value="">Select Country</option>
          {/* Replace with actual country list */}
          <option value="USA">United States</option>
          <option value="Canada">Canada</option>
          <option value="India">India</option>
          {/* Add more countries as needed */}
        </select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

        {/* State/City */}
        <input
          type="text"
          placeholder="State/City"
          value={userData.stateCity}
          onChange={(e) => updateField("stateCity", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.stateCity && <p className="text-red-500 text-sm">{errors.stateCity}</p>}

        {/* Preferred Communication Method */}
        <h6 className="font-bold my-5 text-darkGreen ">FES-Manager's Engagement with You </h6> 
        <div className="flex justify-space space-x-4">
          <label className="flex items-center my-auto ml-9">
            <input
              type="checkbox"
              checked={userData.preferredCommunication.includes("Email")}
              onChange={(e) => {
                const method = "Email";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...userData.preferredCommunication, method]
                    : userData.preferredCommunication.filter((item) => item !== method)
                );
              }}
            />
            <span className="ml-2">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={userData.preferredCommunication.includes("SMS")}
              onChange={(e) => {
                const method = "SMS";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...userData.preferredCommunication, method]
                    : userData.preferredCommunication.filter((item) => item !== method)
                );
              }}
            />
            <span className="ml-2">SMS</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={userData.preferredCommunication.includes("WhatsApp")}
              onChange={(e) => {
                const method = "WhatsApp";
                updateField(
                  "preferredCommunication",
                  e.target.checked
                    ? [...userData.preferredCommunication, method]
                    : userData.preferredCommunication.filter((item) => item !== method)
                );
              }}
            />
            <span className="ml-2">WhatsApp</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-medium ${step > 1 ? "bg-shade text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          <button
            className="bg-greenNeon text-darkGreen px-6 py-2 rounded-lg font-medium"
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

export default SignUpForm3;
