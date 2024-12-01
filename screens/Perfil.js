import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);

    // Carregar os dados do usuário e a foto de perfil do AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                const profilePic = await AsyncStorage.getItem('profilePic'); // Recupera a foto de perfil
                const userData = storedUserData ? JSON.parse(storedUserData) : {};

                if (profilePic) {
                    userData.profilePic = profilePic; // Adiciona a URI da foto ao userData
                }

                setUserData(userData);
            } catch (error) {
                console.error('Erro ao recuperar os dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []); // Executa sempre que a tela de perfil for acessada

    const Header = ({ navigation }) => {
        const [searchText, setSearchText] = useState('');

        return (
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
                    <Ionicons name="bag-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Adicionando o Header */}
            <Header navigation={navigation} />

            {/* Perfil do Usuário */}
            <View style={styles.profileSection}>
                {userData ? (
                    <>
                        {/* Exibe a foto de perfil */}
                        <Image
                            source={
                                userData.profilePic
                                    ? { uri: userData.profilePic }
                                    : require('../assets/default-avatar.png')
                            }
                            style={styles.profileImage}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{userData.name || 'Usuário'}</Text>
                            <Text style={styles.profileEmail}>{userData.email}</Text>
                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => navigation.navigate('Editar')}>
                                <Text style={styles.profileButtonText}>Meu Perfil</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginButtonText}>Fazer Login</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Seção: Meus Pedidos */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>MEUS PEDIDOS</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('preparando')}>
                        <Ionicons name="clipboard-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Preparando</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('a caminho')}>
                        <Ionicons name="car-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>A Caminho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('cancelados')}>
                        <Ionicons name="close-circle-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Cancelados</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Seção: Meus Ganhos */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>MEUS GANHOS</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('mygreen')}>
                        <Ionicons name="pricetags-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Meus Cupons</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('missao')}>
                        <Ionicons name="earth-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Nossa Missão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => console.log("Compartilhar funcionalidade ainda não implementada.")}>
                        <Ionicons name="share-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Compartilhar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('config')}>
                        <Ionicons name="settings-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Configurar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => navigation.navigate('Historico')}>
                        <Ionicons name="time-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Histórico</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.gridButton}
                        onPress={() => Linking.openURL('https://drive.google.com/file/d/1YpkAuSCuC_YTtpWfk0Pu05J2o3PD3_wH/view?usp=sharing')}>
                        <Ionicons name="document-text-outline" size={40} color="#000" />
                        <Text style={styles.gridText}>Política</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

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
  profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(96, 238, 178, 0.24)',
      padding: 20,
  },
  profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
  },
  profileInfo: {
      marginLeft: 15,
  },
  profileName: {
      fontSize: 21,
      marginBottom: 5,
      fontFamily: 'Poppins-Bold'
  },
  profileEmail: {
      fontSize: 14,
      marginBottom: 20,
      fontFamily: 'Poppins-Regular'
  },
  profileButton: {
      width: '60%',
      padding: 15,
      backgroundColor: 'rgba(254, 94, 204, 0.6)',
      alignItems: 'center',
      borderRadius: 25,
      marginBottom: 10,
  },
  profileButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Poppins-Bold'
  },
  loginButton: {
      padding: 15,
      backgroundColor: 'rgba(66, 133, 244, 0.7)',
      borderRadius: 25,
  },
  loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Poppins-Bold'
  },
  sectionContainer: {
      marginVertical: 10,
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      marginHorizontal: 15,
  },
  sectionTitle: {
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
      marginBottom: 10,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
  },
  gridButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
  },
  gridText: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'Poppins-Regular'
  },
});
