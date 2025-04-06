import Footer from "../layout/Footer";
import WelcomeNavBar from "../layout/WelcomeNavBar";
import SignUpForm0 from "../Signup/SignupForm0";

const SignupPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Full-page background */}
      <div className="absolute inset-0 w-full h-full bg-shade -z-10"></div>

      <WelcomeNavBar />

      <div className="absolute flex flex-row items-center mt-[200px]">
        <SignUpForm0 />
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
