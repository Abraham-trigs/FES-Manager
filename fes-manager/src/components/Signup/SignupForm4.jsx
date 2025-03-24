import React, { useEffect } from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm4 = () => {
  const { userData, errors, updateField, setErrors, nextStep, prevStep, step } = useCreateProfileStore();

  // Validation for Step 4
  const validateStep4 = () => {
    let newErrors = {};

    if (!userData.profilePicture && !userData.idDocument) {
      newErrors.profilePicture = "Please upload a profile picture or ID document.";
    }
    if ((userData.accountType === "Organization" || userData.accountType === "Government") && !userData.idDocument) {
      newErrors.idDocument = "ID or Registration Document is required for Organizations/Government.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // Handle File Uploads
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      updateField(field, fileURL);

      // Prevent memory leaks
      return () => URL.revokeObjectURL(fileURL);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      {/* Logo */}
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />

      {/* Form Title */}
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      {/* Step 4: Profile Picture & Verification */}
      <div>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">Profile Picture & Verification</h3>

        {/* Profile Picture */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
            Upload Profile Picture (Optional)
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/png, image/jpeg"
            onChange={(e) => handleFileUpload(e, "profilePicture")}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
        </div>

        {/* ID or Registration Document */}
        {(userData.accountType === "Organization" || userData.accountType === "Government") && (
          <div className="mb-4">
            <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700">
              Upload ID or Registration Document (Required)
            </label>
            <input
              type="file"
              id="idDocument"
              name="idDocument"
              accept="image/png, image/jpeg, application/pdf"
              onChange={(e) => handleFileUpload(e, "idDocument")}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.idDocument && <p className="text-red-500 text-sm">{errors.idDocument}</p>}
          </div>
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
              if (validateStep4()) nextStep();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm4;
