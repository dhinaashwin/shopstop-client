// src/Context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase'; // Import Firebase auth instance
import axios from 'axios'; // Import Axios for making HTTP requests

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if there's a user in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Example: Save user to MongoDB
        try {
          await saveUserToMongoDB(user);
        } catch (error) {
          console.error('Error saving user to MongoDB:', error.message);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUserToMongoDB = async (user) => {
    const endpoint = 'http://localhost:3001/users'; // Replace with your backend API URL

    try {
      // Check if user already exists
      const response = await axios.get(`${endpoint}/${user.uid}`);
      if (response.data) {
        console.log('Welcome Back');
      } else {
        // If user doesn't exist, save the user
        await axios.post(endpoint, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Add other user data as needed
        });
        console.log('User saved to MongoDB');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User doesn't exist, so create a new one
        await axios.post(endpoint, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Add other user data as needed
        });
        console.log('User saved to MongoDB');
      } else {
        console.error('Error saving user to MongoDB:', error.message);
      }
    }
  };

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
