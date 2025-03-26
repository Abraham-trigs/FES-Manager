import React, { useEffect } from "react";
import Footer from "../layout/Footer";
import WelcomeNavBar from "../layout/WelcomeNavBar";
import useCreateProfileStore from "../../store/CreateProfileStore";
import SignupForm1 from "../Signup/SignupForm1";
import SignupForm2 from "../Signup/SignupForm2";
import SignupForm3 from "../Signup/SignupForm3";
import SignupForm4 from "../Signup/SignupForm4";
import SignupForm5 from "../Signup/SignupForm5";



const SignupPage = () => {
  const { step } = useCreateProfileStore();

 

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      <WelcomeNavBar />

      <div className="mx-auto my-auto">
        {step === 1 && <SignupForm1/>}
        {step === 2 && <SignupForm2 />}
        {step === 3 && <SignupForm3 />}
        {step === 4 && <SignupForm4 />}
        {step === 5 && <SignupForm5 />}
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;



