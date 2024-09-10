import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AccessErrorScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>Error: try again later.</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da', // Fondo rojo claro para denotar un error
  },
  errorMessage: {
    fontSize: 18,
    color: '#721c24', // Color de texto rojo oscuro
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#f5c6cb', // Fondo rojo más claro para el botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2, // Sombra para el botón (solo Android)
  },
  buttonText: {
    color: '#721c24', // Color de texto rojo oscuro
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AccessErrorScreen;