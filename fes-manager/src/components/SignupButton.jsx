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
                py-[5px]
                px-4 
                text-[1rem] 
                rounded-lg  
                font-bold
                text-darkGreen"
    >
      New User
    </button>
  );
};

export default SignupButton;
