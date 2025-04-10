import Footer from "../layout/Footer";
import WelcomeNavBar from "../layout/WelcomeNavBar";
import SignupHandler from "../Signup/SignupHandler";

const SignupPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-shade">
      <WelcomeNavBar />

      <main className="flex-grow flex justify-center items-start mt-[120px] px-4">
        <div className="w-full max-w-3xl">
          <SignupHandler />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
