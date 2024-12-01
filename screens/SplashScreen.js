import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, Animated } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const logoAnim = new Animated.Value(0); // Controla a posição da logo
  const fadeAnim = new Animated.Value(0); // Controla a opacidade do texto e loader
  const splashFadeAnim = new Animated.Value(1); // Controla a opacidade da tela Splash

  useEffect(() => {
    // Animar a logo de baixo para cima
    Animated.timing(logoAnim, {
      toValue: 1, // Mover para cima
      duration: 1000, // Duração da animação da logo
      useNativeDriver: true, // Usar driver nativo para melhor desempenho
    }).start(() => {
      // Após a animação da logo, iniciar a animação de desvanecimento para o texto e loader
      Animated.timing(fadeAnim, {
        toValue: 1, // Mudar a opacidade para 1
        duration: 500, // Duração da animação de opacidade
        useNativeDriver: true, // Usar driver nativo
      }).start(() => {
        // Aguardar 1 segundo antes de chamar onFinish e iniciar a animação de desvanecimento da tela Splash
        setTimeout(() => {
          Animated.timing(splashFadeAnim, {
            toValue: 0, // Mudar a opacidade para 0
            duration: 500, // Duração da animação de desvanecimento
            useNativeDriver: true,
          }).start(() => {
            onFinish(); // Chamar a função de término após a animação
          });
        }, 1000);
      });
    });
  }, [logoAnim, fadeAnim, onFinish, splashFadeAnim]);

  return (
    <Animated.View style={[styles.splashContainer, { opacity: splashFadeAnim }]}>
      <Animated.Image
        source={require('../assets/Logo-GreenMart.png')}
        style={[styles.logo, { transform: [{ translateY: logoAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0] // Move a logo de 200 pixels abaixo até a posição original
        }) }] }]}
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <ActivityIndicator size="large" color="#0CD028" style={styles.loader} />
      </Animated.View>
    </Animated.View>
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
    width: 300,
    height: 300,
    marginBottom: 5,
  },
  loader: {
    transform: [{ scale: 2 }],
    marginBottom: 20,
  },

});

export default SplashScreen;
