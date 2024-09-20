import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('../assets/Logo-GreenMart.png')}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#0CD028" style={styles.loader} />
      <Text style={styles.welcomeText}>Bem vindo! Por favor, aguarde...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loader: {
    transform: [{ scale: 2 }],
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SplashScreen;
