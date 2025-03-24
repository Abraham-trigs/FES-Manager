import React, { useState, useEffect } from 'react';
import useLoginStore from '../../store/LoginStore';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login

const LoginForm = () => {
  // Get the function to hide the login form from the store
  const { setShowLoginForm } = useLoginStore();
  
  // State variables to store email, password, and remember me status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // To handle remember me checkbox

  // Navigate hook to redirect to another page after login
  const navigate = useNavigate();

  // useEffect to check if saved credentials exist in localStorage and populate the form fields
  useEffect(() => {
    // Retrieve saved email and password from localStorage if available
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);  // Set saved email
      setPassword(savedPassword); // Set saved password
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to close the login form
  const handleClose = () => {
    setShowLoginForm(false); // Sets the state to false, hiding the form
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit behavior

    // Simulate authentication (this should be replaced with actual authentication logic)
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Logged in successfully');
      setShowLoginForm(false); // Close the form on successful login

      // Save credentials to localStorage if "remember me" is checked
      if (rememberMe) {
        localStorage.setItem('email', email);  // Save email to localStorage
        localStorage.setItem('password', password);  // Save password to localStorage
      } else {
        // Remove saved credentials from localStorage if "remember me" is unchecked
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      // Redirect the user to '/LiveProjects' page after successful login
      navigate('/LiveProjects');
    } else {
      console.log('Invalid credentials');
      // Optionally, you could display an error message if login fails
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      {/* Modal container with a fixed position covering the entire screen */}
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Login to FES-Manager</h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}  // Bind email state
              onChange={(e) => setEmail(e.target.value)}  // Update email state on change
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}  // Bind password state
              onChange={(e) => setPassword(e.target.value)}  // Update password state on change
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}  // Bind to rememberMe state
              onChange={() => setRememberMe(!rememberMe)}  // Toggle rememberMe state on change
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>

          {/* Submit button */}
          <button type="submit" className="w-full bg-greenNeon text-darkGreen py-2 rounded-lg">
            Login
          </button>
        </form>

        {/* Close Button to hide the form */}
        <button
          className="absolute top-2 right-2 text-darkGreen"
          onClick={handleClose} // Close the form when clicked
        >
          X
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
