import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../assets/Logo-GreenMart.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
        <Ionicons name="bag-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const NotificacoesScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Recuperar notificações salvas no AsyncStorage
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Erro ao carregar notificações', error);
      }
    };

    loadNotifications(); // Carregar notificações quando a tela for carregada

    // Listener para notificações recebidas
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const newNotification = notification.request.content;
        setNotifications((prev) => {
          const updatedNotifications = [...prev, newNotification];
          AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Salvar notificações no AsyncStorage
          return updatedNotifications;
        });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Expo Push Token:', token.data);
    } catch (error) {
      console.error('Erro ao registrar notificações:', error);
    }
  };

  const handleSendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Nova notificação! 🎉',
        body: 'Esta é uma notificação de teste.',
        data: { customData: 'teste' },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Notificações</Text>
        <Button title="Enviar Notificação de Teste" onPress={handleSendNotification} />
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationBody}>{notification.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
   fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular'
  },
});

export default NotificacoesScreen;
