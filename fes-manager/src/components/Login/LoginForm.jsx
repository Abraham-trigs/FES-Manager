import React, { useState, useEffect } from 'react';
import useLoginStore from '../../store/LoginStore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Import auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword

const LoginForm = () => {
  const { setShowLoginForm } = useLoginStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const handleClose = () => {
    setShowLoginForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      // Call Firebase to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, handle remember me logic
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      setShowLoginForm(true); // Close the login form
      navigate('/LiveProjects'); // Navigate to the live projects page
    } catch (error) {
      // Handle Firebase authentication errors (invalid credentials, etc.)
      setError(error.message); // Display the error message
    }
  };

  return (
    <div className="fixed inset-0 flex items-center w-[270px] left-9">
      <div className="bg-white shadow-md shadow-gray-500 p-6 rounded-lg w-96">
        <div>
          <div
            className="absolute b-1 right-5 text-semiGreen -my-4 -mx-4 "
            onClick={handleClose}
          >
            <div className="w-3 h-3 bg-darkGreen rounded-full -ml-[20px]"></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">Login to FES-Manager</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md pr-10"
              placeholder="Enter your password"
              aria-invalid={error ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>

          <button type="submit" className="w-full bg-greenNeon text-darkGreen py-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
