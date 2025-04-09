import React from 'react';
import MainNavBar from '../layout/MainNavBar';
import Footer from '../layout/Footer';


const NotFound = () => {
  return (
    <div>
      <MainNavBar />
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">The page you are looking for doesn’t exist or has been moved.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
