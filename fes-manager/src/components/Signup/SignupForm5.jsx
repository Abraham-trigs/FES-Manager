import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateProfileStore from "../../store/CreateProfileStore"; // Zustand store

const SignupForm5 = () => {
  const {
    userData,
    errors,
    updateField,
    setErrors,
    prevStep,
    step,
    resetStore,
  } = useCreateProfileStore();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks submission state

  // Step 5 validation logic: user must agree to terms
  const validateStep5 = () => {
    let newErrors = {};
    if (!userData.agreeToTerms) {
      newErrors.agreeToTerms = "You must read and agree to the Ts' & Cs'.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // Final submission handler (no Firebase)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep5()) return;

    setIsSubmitting(true);
    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("🎉 Signup Completed! Welcome to FES-Manager!");
      console.log("User profile (local only):", userData);

      resetStore(); // Clears Zustand state and localStorage
      navigate("/LiveProjects"); // Redirect after successful submission
    } catch (error) {
      console.error("Submission error:", error);
      alert("Oops! Something went wrong while processing your signup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">
          Agreement & Signup
        </h3>

        {/* Agree to Terms Checkbox */}
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
            I agree to the{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
        )}

        {/* Subscribe to updates */}
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

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
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

          <button
            type="submit"
            className="bg-greenNeon text-darkGreen px-6 py-2 rounded-lg font-medium hover:bg-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm5;
