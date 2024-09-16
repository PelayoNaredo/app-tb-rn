import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Agrega una variable de carga

  useEffect(() => {
    const checkToken = async () => {
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
        setIsLoading(false); // Marca el fin de la carga
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    // Mostrar una pantalla de carga mientras se verifica la autenticación
    return <Text>Loading...</Text>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
