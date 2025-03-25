import React, { useState, useEffect } from 'react';
import useLoginStore from '../../store/LoginStore';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login

const LoginForm = () => {
  const { setShowLoginForm } = useLoginStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (email === 'user@example.com' && password === 'password123') {
      setShowLoginForm(false);

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      navigate('/LiveProjects');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Login to FES-Manager</h2>

        {/* Show error message if any */}
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              aria-invalid={error ? 'true' : 'false'}
            />
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

        <button
          className="absolute top-2 right-2 text-darkGreen"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
