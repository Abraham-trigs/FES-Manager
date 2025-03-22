import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm5 = () => {
  const { userData, errors, updateField, setErrors, nextStep, prevStep, step } = useCreateProfileStore();

  // Validation for Step 5
  const validateStep5 = () => {
    let newErrors = {};

    if (!userData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the Terms & Conditions.";
    
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

      {/* Step 5: Agreement & Signup */}
      <div>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">5️⃣ Agreement & Signup</h3>

        {/* Terms & Conditions */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={userData.agreeToTerms}
            onChange={(e) => updateField("agreeToTerms", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to the <a href="/terms" className="text-blue-500">Terms & Conditions</a>
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

        {/* Subscribe to FES-Manager Updates */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="subscribeUpdates"
            checked={userData.subscribeUpdates}
            onChange={(e) => updateField("subscribeUpdates", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="subscribeUpdates" className="text-sm text-gray-600">
            Subscribe to FES-Manager updates
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
              if (validateStep5()) nextStep();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm5;
