import React from 'react';
import useLoginStore from '../store/LoginStore'; 

const LoginButton = () => {
  // Access the setShowLoginForm function from the store to control the visibility of the login form
  const { setShowLoginForm } = useLoginStore();

  const handleLoginClick = () => {
    // Set the showLoginForm state to true, which will display the login form
    setShowLoginForm(true);
    console.log("Login form should be shown now."); // Debugging log to check the state change
  };

  return (
    // Styled button component for login
    <button 
      onClick={handleLoginClick} // Trigger showing the login form when the button is clicked
      className='bg-greenNeon 
        p-1 px-8 
        text-[1.4rem] 
        rounded-lg  
        font-medium
        text-darkGreen'
    >
      login
    </button>
  );
};

export default LoginButton;
