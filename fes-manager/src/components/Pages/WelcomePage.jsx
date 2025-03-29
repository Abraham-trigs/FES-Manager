import React from 'react';
import WelcomeNavBar from '../layout/WelcomeNavBar';
import Footer from "../layout/Footer";
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import LoginForm from '../Login/LoginForm';
import useLoginStore from '../../store/LoginStore';

const WelcomePage = () => {
  // Access the state of showLoginForm from your store
  const { showLoginForm } = useLoginStore();
  console.log("showLoginForm state:", showLoginForm); // This will log 'true' when the login button is clicked and shows the login form

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* This creates a semi-transparent background with a green tint */}
      <div className="absolute inset-0 bg-semiGreen -z-10"></div>

      {/* Render the navigation bar */}
      <WelcomeNavBar />

      {/* Main content section that takes up the full height of the screen */}
      <div className="flex-grow flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          {/* Logo image with specific width and auto height */}
          <img src="/images/logo.png" alt="logo" className="w-[50%] h-auto" />
          
          {/* Heading for the page */}
          <h1 className='text-[2rem] font-bold text-white'>FES-Manager</h1>

          {/* Buttons for Login and Signup */}
          <div className="flex flex-row justify-center space-x-4 mt-4 ">
            <LoginButton /> {/* Clicking this button will trigger the display of the LoginForm */}
            <SignupButton />
          </div>
        </div>
      </div>

      {/* Conditionally render the LoginForm if showLoginForm state is true */}
      {showLoginForm && <LoginForm />}

      {/* Render the footer of the page */}
      <Footer />
    </div>
  );
};

export default WelcomePage;
