import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, Animated } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const logoAnim = new Animated.Value(0); 
  const fadeAnim = new Animated.Value(0); 
  const splashFadeAnim = new Animated.Value(1); 

  useEffect(() => {
    
    Animated.timing(logoAnim, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, 
      }).start(() => {
        
        setTimeout(() => {
          Animated.timing(splashFadeAnim, {
            toValue: 0, 
            duration: 500, 
            useNativeDriver: true,
          }).start(() => {
            onFinish(); 
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
          outputRange: [200, 0] 
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
