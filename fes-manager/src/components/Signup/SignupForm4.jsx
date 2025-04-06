import React, { useEffect } from "react";
import useCreateProfileStore from "../../store/CreateProfileStore"; // Zustand store for profile state

const SignupForm4 = () => {
  // Destructure state and actions from the store
  const { userData, errors, updateField, setErrors, nextStep, prevStep, step } = useCreateProfileStore();

  // Clean up any previously created object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (userData.profilePicture) URL.revokeObjectURL(userData.profilePicture);
      if (userData.idDocument) URL.revokeObjectURL(userData.idDocument);
    };
  }, []);

  // Validation logic for Step 4
  const validateStep4 = () => {
    let newErrors = {};

    // Require at least one of the two: profile picture or ID document
    if (!userData.profilePicture && !userData.idDocument) {
      newErrors.profilePicture = "Please upload a profile picture or ID document.";
    }

    // If account type is Org or Gov, ID document becomes mandatory
    if (
      (userData.accountType === "Organization" || userData.accountType === "Government") &&
      !userData.idDocument
    ) {
      newErrors.idDocument = "ID or Registration Document is required for Organizations/Government.";
    }

    // If there are validation errors, block progression to next step
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  // Generic handler for file uploads (both profile picture and ID doc)
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create temporary blob URL for preview
      updateField(field, fileURL); // Store in Zustand state
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      {/* App Logo */}
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />

      {/* Form Header */}
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      {/* Step 4 Title */}
      <div>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">Profile Picture & Verification</h3>

        {/* Profile Picture Upload */}
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
          {/* Error message if validation fails */}
          {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}

          {/* Live preview of uploaded profile picture */}
          {userData.profilePicture && (
            <img
              src={userData.profilePicture}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full mx-auto"
            />
          )}
        </div>

        {/* ID or Registration Document Upload (Required for Org/Gov) */}
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
            {/* Error message if validation fails */}
            {errors.idDocument && <p className="text-red-500 text-sm">{errors.idDocument}</p>}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {/* Back Button - disabled on step 1 */}
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              step > 1
                ? "bg-gray-400 text-white hover:bg-gray-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          {/* Next Button - triggers validation before proceeding */}
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
