import React from 'react';
import WelcomeNavBar from '../WelcomeNavBar';
import Footer from '../Footer';
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';

const WelcomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col">

      <div className="absolute inset-0 bg-semiGreen -z-10"></div>

      <WelcomeNavBar />

      <div className="flex-grow flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          <img src="/images/logo.png" alt="logo" className="w-[30%] h-auto" />
          <h1 className='text-[3rem] font-bold text-white'>FES-Manager</h1>

          <div className="flex flex-row justify-center space-x-4 mt-4">
            <LoginButton /> 
            <SignupButton />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WelcomePage;
