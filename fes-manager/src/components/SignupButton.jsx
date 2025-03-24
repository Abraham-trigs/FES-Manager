import React from "react";
import { useNavigate } from "react-router-dom";

const SignupButton = () => {
  const navigate = useNavigate();

  return (
    <button
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
