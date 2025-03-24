import React from "react";
import { useNavigate } from "react-router-dom"; 

const SignupButton = () => {
  // useNavigate hook to programmatically navigate to the '/Signup' page
  const navigate = useNavigate();

  return (
    <button
      // Navigate to '/Signup' when the button is clicked
      onClick={() => navigate("/Signup")}
      className="bg-cyanNeon 
        p-1 px-8 
        text-[1.2rem] 
        rounded-lg  
        font-medium
        text-darkGreen"
    >
      New User
    </button>
  );
};

export default SignupButton;
