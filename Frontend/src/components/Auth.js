import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService'; // Import your AuthService here

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
    }
  }, []);

  const login = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
