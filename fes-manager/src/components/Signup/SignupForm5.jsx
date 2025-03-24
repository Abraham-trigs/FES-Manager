import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm5 = () => {
  const { userData, errors, updateField, setErrors, prevStep, step } = useCreateProfileStore();

  // Validation for Step 5
  const validateStep5 = () => {
    let newErrors = {};

    if (!userData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms & Conditions.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // ✅ Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    if (validateStep5()) {
      console.log("✅ Form Submitted Successfully!", userData);
      alert("🎉 Signup Completed! Welcome to FES-Manager!");

      // 🚀 TODO: Add API request here if integrating backend
      // Example: axios.post('/api/register', userData).then(response => console.log(response));
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      {/* Logo */}
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />

      {/* Form Title */}
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      {/* Step 5: Agreement & Signup */}
      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">Agreement & Signup</h3>

        {/* Terms & Conditions */}
        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={userData.agreeToTerms || false}
            onChange={(e) => updateField("agreeToTerms", e.target.checked)}
            className="mr-2 mt-1"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600 text-left">
            I agree to the <a href="/terms" className="text-blue-500 hover:underline">Terms & Conditions</a>
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

        {/* Subscribe to FES-Manager Updates */}
        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="subscribeUpdates"
            name="subscribeUpdates"
            checked={userData.subscribeUpdates || false}
            onChange={(e) => updateField("subscribeUpdates", e.target.checked)}
            className="mr-2 mt-1"
          />
          <label htmlFor="subscribeUpdates" className="text-sm text-gray-600 text-left">
            Subscribe to FES-Manager updates
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg font-medium ${
              step > 1 ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-greenNeon text-darkGreen px-6 py-2 rounded-lg font-medium hover:bg-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm5;
