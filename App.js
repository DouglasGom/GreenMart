import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import DoeRoupas from './screens/DoeRoupas';
import TelaNotificacoes from './screens/TelaNotificacoes';
import SplashScreen from './screens/SplashScreen'; 
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  return (
    <NavigationContainer>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <BottomTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Início') {
                iconName = 'home-outline';
              } else if (route.name === 'Doe Roupas') {
                iconName = 'gift-outline';
              } else if (route.name === 'DIY') {
                iconName = 'cut';
              } else if (route.name === 'Prêmios') {
                iconName = 'star-outline';
              } else if (route.name === 'Eu') {
                iconName = 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { display: 'flex' },
            headerShown: false,
          })}
        >
          <BottomTab.Screen name="Início" component={HomeScreen} />
          <BottomTab.Screen name="Doe Roupas" component={DoeRoupas} />
          <BottomTab.Screen name="DIY" component={HomeScreen} />
          <BottomTab.Screen name="Prêmios" component={HomeScreen} />
          <BottomTab.Screen name="Eu" component={HomeScreen} />
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
