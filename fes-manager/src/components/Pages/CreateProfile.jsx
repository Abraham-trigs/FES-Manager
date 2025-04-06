import React, { useEffect } from 'react';  // Import useEffect here
import WelcomeNavBar from '../layout/WelcomeNavBar';
import Footer from '../layout/Footer';
import useCreateProfileStore from '../../store/CreateProfileStore'; // Add this import for the store
import SignupForm1 from '../Signup/SignupForm1';
import SignupForm2 from '../Signup/SignupForm2';
import SignupForm3 from '../Signup/SignupForm3';
import SignupForm4 from '../Signup/SignupForm4';
import SignupForm5 from '../Signup/SignupForm5';

const CreateProfilePage = () => {
  const { step } = useCreateProfileStore();

  useEffect(() => {
    console.log('Current step:', step); // Useful for debugging
  }, [step]);

  return (
    <>
      <WelcomeNavBar />

      <div className="mx-auto my-auto">
        {step === 1 && <SignupForm1 />}
        {step === 2 && <SignupForm2 />}
        {step === 3 && <SignupForm3 />}
        {step === 4 && <SignupForm4 />}
        {step === 5 && <SignupForm5 />}
      </div>

      <Footer />
    </>
  );
};

export default CreateProfilePage;
