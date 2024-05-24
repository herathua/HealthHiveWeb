import React, { useState, useEffect, createContext, useContext } from 'react';
import keycloak from './keycloak';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setUser(keycloak.tokenParsed);
        }
      })
      .catch((err) => {
        console.error('Authentication error', err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, keycloak }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
