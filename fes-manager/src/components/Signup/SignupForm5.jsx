import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useCreateProfileStore from "../../store/CreateProfileStore"; // Store for user data and errors
import { auth, db } from "../../firebaseConfig";

import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const SignupForm5 = () => {
  const { userData, errors, updateField, setErrors, prevStep, step, resetStore } = useCreateProfileStore();
  const navigate = useNavigate(); // Initialize the navigate function

  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  // Validate the form fields for Step 5
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

  // Save user profile data to Firestore
  const saveProfileToFirestore = async () => {
    setIsSubmitting(true); // Set submitting state to true while saving
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated!");

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...userData,
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),      
      });

      // Update Firebase Auth display name
      if (userData.fullName) {
        await updateProfile(user, { displayName: userData.fullName });
      }

      alert("🎉 Signup Completed! Welcome to FES-Manager!");
      console.log(" User profile saved to Firebase:", userData);

      resetStore(); // Reset store data after successful submission

      // Redirect to the LiveProjects page
      navigate("/LiveProjects");

    } catch (error) {
      console.error(" Error saving profile:", error);
      alert("Oops! Something went wrong while saving your profile.");
    } finally {
      setIsSubmitting(false); // Set submitting state to false after completion
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep5()) {
      await saveProfileToFirestore();
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
      <img src="/images/logo.png" alt="FES-Manager Logo" className="mx-auto w-16 mb-3" />
      <h2 className="text-xl font-semibold text-darkGreen">FES-Manager</h2>
      <p className="text-lg text-gray-600 mt-1">Sign-up</p>

      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg my-5 text-darkGreen">Agreement & Signup</h3>

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

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg font-medium ${step > 1 ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-greenNeon text-darkGreen px-6 py-2 rounded-lg font-medium hover:bg-green-500"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"} {/* Show submitting text */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm5;
