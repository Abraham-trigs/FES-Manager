import React from "react";
import useSignupFormStore from "../../store/CreateProfileStore";
import SignUpForm0 from "./SignupForm0";
import SignUpForm1 from "./SignupForm1";
import SignUpForm2 from "./SignupForm2";
import SignupForm3 from "./SignupForm3";
import SignupForm4 from "./SignupForm4";
import SignupForm5 from "./SignupForm5";

const SignupHandler = () => {
  const { step } = useSignupFormStore();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {step === 0 && <SignUpForm0 />}
      {step === 1 && <SignUpForm1 />}
      {step === 2 && <SignUpForm2 />}
      {step === 3 && <SignupForm3 />}
      {step === 4 && <SignupForm4 />}
      {step === 4 && <SignupForm5 />}
    </div>
  );
};

export default SignupHandler;
