import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthScreen({ onLogin }) {
  const handleLogin = () => {
    onLogin({
      id: '1',
      name: 'Teste',
      email: 'teste@teste.com'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Teste</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});