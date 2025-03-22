import React from "react";
import Footer from "../Footer";
import ProjectListNavBar from "../ProjectFeed/ProjectListNavBar";
import SideBar from "../sideBar";
import useCreateProfileStore from "../../store/CreateProfileStore";
import SignUpForm1 from "../SignupForm/SignUpForm1";
import SignUpForm2 from "../SignupForm/SignupForm2";
import SignUpForm3 from "../SignupForm/SignupForm3";
import SignupForm4 from "../SignupForm/SignupForm4";
import SignupForm5 from "../SignupForm/SignupForm5";



const SignUpPage = () => {
  const { step } = useCreateProfileStore();

  return (
    <div className="relative min-h-screen flex flex-col items-center">

      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      <SideBar />
      <ProjectListNavBar />
        <div className="mx-auto my-auto">
          {step === 1 && <SignUpForm1 />}
          {step === 2 && <SignUpForm2 />}
          {step === 3 && <SignUpForm3 />}
          {step === 4 && <SignupForm4 />}
          {step === 5 && <SignupForm5 />}



        </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
