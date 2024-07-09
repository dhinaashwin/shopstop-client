import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../Firebase'; // Adjust the import path if necessary
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios'; // Import Axios for HTTP requests
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User Info:', result.user);

      // Register the user on the backend after successful login
      registerUser(result.user);

      // Redirect to the homepage after a successful login
      navigate('/');
    } catch (error) {
      console.error('Login Failed:', error);
      // Handle the failure response here
    }
  };

  const registerUser = async (user) => {
    try {
      // Send user data to backend for registration
      await axios.post('http://localhost:3001/register', {
        email: user.email,
      });
      console.log('User registered on backend');
    } catch (error) {
      console.error('Registration Failed:', error);
      // Handle registration failure here
    }
  };
  return (
    <div className="login-container flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Login with Google</h2>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
