import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';
export const RegisterPage = () => {
  const [error, setError] = useState('');
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (username: string, email: string, password: string) => {
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };
  return <RegisterForm onSubmit={handleSubmit} error={error} />;
};