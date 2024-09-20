import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwakeAsync } from 'expo-keep-awake';

const App = () => {
  useEffect(() => {
    // Ativar KeepAwake
    activateKeepAwakeAsync();

    // Desativar KeepAwake quando o componente for desmontado
    return () => {
      deactivateKeepAwakeAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Aplicativo em execução...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
