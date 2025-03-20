import React from 'react';

const WelcomeNavBar = () => {
  return (
    <>
      <div className="w-100% h-20 bg-green-500 mx-auto"></div>

      <div className="overflow-hidden">
        <img src="/images/logo.png" 
          alt="logo" 
          className="w-24 h-auto" />
      </div>
    </>
  );
};

export default WelcomeNavBar;
