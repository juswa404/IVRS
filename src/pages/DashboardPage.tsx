import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { App } from '../App';
export const DashboardPage = () => {
  const {
    user
  } = useAuth();
  return <App />;
};