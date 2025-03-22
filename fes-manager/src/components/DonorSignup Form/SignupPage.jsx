import React from "react";

const DonorSignupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-900">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        {/* Logo & Branding */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-900">FES-Manager</h2>
          <p className="text-gray-500">Sign-up (Philanthropist)</p>
        </div>

        {/* Form Fields */}
        <form className="mt-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Philanthropist Type</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
            <option value="government">Government</option>
          </select>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorSignupForm;
