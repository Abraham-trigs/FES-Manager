import React from "react";
import useCreateProfileStore from "../../store/CreateProfileStore";

const SignupForm1 = () => {
  const { userData, errors, updateField, setErrors, nextStep } = useCreateProfileStore();

  // Validation Function
  const validateStep1 = () => {
    let newErrors = {};

    if (!userData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) newErrors.email = "Enter a valid email address";
    
    if (!/^\+?[1-9]\d{6,14}$/.test(userData.phone)) {
      newErrors.phone = "Enter a valid phone number with or without country code";
    }

    if (userData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

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

      {/* Step 1: Basic Information */}
      <div>
        <label htmlFor="fullName" className="block text-left text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={userData.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

        <label htmlFor="email" className="block text-left text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={userData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label htmlFor="phone" className="block text-left text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+233208660068 or 0208660068"
          value={userData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <label htmlFor="password" className="block text-left text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => updateField("password", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <label htmlFor="confirmPassword" className="block text-left text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-lg"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        {/* Next Button */}
        <button
          className="bg-greenNeon text-darkGreen px-6 py-2 mt-4 rounded-lg font-medium"
          onClick={() => {
            if (validateStep1()) nextStep();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SignupForm1;
