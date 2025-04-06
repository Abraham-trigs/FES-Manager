// src/components/SignUpForm0.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useSocialAuth from "@/hooks/useSocialAuth"; // Custom hook for social login
import useCreateProfileStore from "../../store/CreateProfileStore"; // Store to manage state

const socialProviders = [
  { name: "google", label: "Google" },
  { name: "facebook", label: "Facebook" },
  { name: "twitter", label: "Twitter (X)" },
  { name: "microsoft", label: "Microsoft" },
  { name: "yahoo", label: "Yahoo" },
];

const roles = ["Altruist", "Admin"];

const SignUpForm0 = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { handleProviderLogin } = useSocialAuth();
  const navigate = useNavigate();
  const { setStep } = useCreateProfileStore(); // Store to set the step

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleRoleSubmit = () => {
    console.log(`Role selected: ${selectedRole}`);
    setStep(1); // Set the step to 1
    navigate("/CreateProfile"); // Navigate to the CreateProfile page
  };

  const handleProfileSetup = () => {
    setStep(1); // Ensure we are starting at step 1 of the profile creation process
    navigate("/CreateProfile"); // Navigate to Form1
  };

  return (
    <div className="text-center ease-in-out bg-green w-96 h-auto p-6 rounded-2xl shadow-lg">
      {/* Role Selection */}
      {!selectedRole ? (
        <div className="my-6 border-t pt-4">
          <p className="text-sm text-greenNeon text-[2rem] mb-2">
            <span className="font-bold">Choose</span> your <span className="font-bold">ROLE</span> :
          </p>
          <div className="flex flex-col space-y-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`btn-role ${selectedRole === role ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                aria-label={`Select ${role} role`}
              >
                {role}
              </button>
            ))}
          </div>
          {selectedRole && (
            <button
              onClick={handleRoleSubmit}
              className="btn-submit bg-blue-500 text-white p-2 mt-4 rounded-lg"
              aria-label="Confirm role"
            >
              Confirm Role
            </button>
          )}
        </div>
      ) : (
        // Social Auth Buttons after Role Selection
        <div className="my-6 border-t pt-4">
          <p className="text-sm text-highLight mb-2 text-[1.5rem]">
            {selectedRole} SignUp
          </p>

          {/* Create Profile Button */}
          <button
            className="bg-greenNeon p-2 px-3 m-3 text-darkGreen rounded-lg hover:bg-darkGreen hover:text-greenNeon"
            onClick={handleProfileSetup}
            aria-label="Create Your Profile"
          >
            Create Your Profile
          </button>

          <p className="text-sm text-cyanNeon mb-2">
            Or quick Signup and set Profile later
          </p>

          {/* Social Provider Buttons */}
          <div className="flex flex-col space-y-2">
            {socialProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleProviderLogin(provider.name, selectedRole)} // Pass the selected role
                className="btn-social p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                aria-label={`Continue with ${provider.label}`}
              >
                Continue with {provider.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm0;
