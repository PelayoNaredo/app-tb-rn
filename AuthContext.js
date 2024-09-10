import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);

      try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          const response = await fetch('http://localhost:3030/users/verify-token', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            await AsyncStorage.removeItem('userToken');
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error('Error checking token:', e);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('userToken');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;