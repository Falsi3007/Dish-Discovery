import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './Auth';


const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/Login" />;
  }

  return <Route element={element} />;
};

export default ProtectedRoute;
