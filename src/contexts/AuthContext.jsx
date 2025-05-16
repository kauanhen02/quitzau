import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (email, password) => {
    // In a real app, you'd validate against a backend or Firebase Auth.
    // Using hardcoded admin credentials
    if (email === 'admin@quitzau.com' && password === 'quitzauadmin') {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);