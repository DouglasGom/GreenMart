import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import * as Font from 'expo-font';
import HomeScreen from './screens/Home';
import DoeRoupas from './screens/DoeRoupas';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import CadastroScreen from './screens/Cadastro';
import Login from './screens/Entrar';
import DIY from './screens/DIY';
import Doe from './screens/Doe';
import ong from './screens/ONGs';
import DoeRoupasDetail from './screens/DoeRoupasDetail';
import video from './screens/DIY_video';
import TelaDoacao from './screens/TelaDoacao';
import green from './screens/Greencoins';
import mygreen from './screens/MeusGreencoins';
import perfil from './screens/Perfil';
import missao from './screens/NossaMissao';
import prep from './screens/Preparando';
import cam from './screens/Enviado';
import can from './screens/Cancelados';
import config from './screens/Config';
import not from './screens/Notificacoes';
import prod from './screens/Produtos';
import prodd from './screens/Produto_det';
import historico from './screens/Historico';
import Sacola from './screens/Sacola';
import Edit from './screens/Editar';
import { CartProvider } from './screens/CartContext';
import { UserProvider } from './screens/UserContext'; 
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const DoeRoupasStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoeRoupas" component={DoeRoupas} />
      <Stack.Screen name="Doe" component={Doe} />
    </Stack.Navigator>
  );
};

const CustomTabBarButton = ({ onPress, focused, route }) => {
  const navigation = useNavigation();
  const [iconImage, setIconImage] = useState(require('./assets/navbar.png'));

  useEffect(() => {
    if (route.name === 'Prêmios') {
      if (focused) {
        setIconImage(require('./assets/navbar_green.png'));
      } else {
        setIconImage(require('./assets/navbar.png'));
      }
    }
  }, [focused]);

  const handlePress = () => {
    onPress();
    if (route.name === 'Prêmios') {
      navigation.navigate('Greencoins');
    }
  };

  return <Image source={iconImage} style={{ width: 30, height: 30 }} onPress={handlePress} />;
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          marginHorizontal: '5%',
          paddingBottom: 3,
          borderRadius: 20,
          marginBottom: 15,
          height: 55,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Início') {
            iconName = 'home-outline';
          } else if (route.name === 'Doe Roupas') {
            iconName = 'gift-outline';
          } else if (route.name === 'DIY') {
            iconName = 'cut';
          } else if (route.name === 'Prêmios') {
            return <CustomTabBarButton onPress={() => {}} focused={focused} route={route} />;
          } else if (route.name === 'Eu') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Doe Roupas" component={DoeRoupasStack} options={{ headerShown: false }} />
      <Tab.Screen name="DIY" component={DIY} options={{ headerShown: false }} />
      <Tab.Screen name="Prêmios" component={green} options={{ headerShown: false }} />
      <Tab.Screen name="Eu" component={perfil} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar fontes:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }


  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSplashVisible ? (
              <Stack.Screen name="Splash" options={{ headerShown: false }}>
                {() => <SplashScreen onFinish={handleSplashFinish} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="TelaDoacao" component={TelaDoacao} />
                <Stack.Screen name="ong" component={ong} />
                <Stack.Screen name="DoeRoupasDetail" component={DoeRoupasDetail} />
                <Stack.Screen name="video" component={video} />
                <Stack.Screen name="missao" component={missao} />
                <Stack.Screen name="preparando" component={prep} />
                <Stack.Screen name="a caminho" component={cam} />
                <Stack.Screen name="cancelados" component={can} />
                <Stack.Screen name="mygreen" component={mygreen} />
                <Stack.Screen name="config" component={config} />
                <Stack.Screen name="not" component={not} />
                <Stack.Screen name="prod" component={prod} />
                <Stack.Screen name="prod-d" component={prodd} />
                <Stack.Screen name="Historico" component={historico} />
                <Stack.Screen name="Sacola" component={Sacola} />
                <Stack.Screen name="Editar" component={Edit} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );


};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
