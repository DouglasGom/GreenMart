import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/Logo-GreenMart.png'; 


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

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('history');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    };

    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Botão de Voltar - Agora abaixo do Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navega de volta para a tela anterior
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Título do Histórico */}
      <Text style={styles.title}>Histórico</Text>

      {/* Lista de Histórico */}
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                product: { ...item },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.historyItemImage}
            />
            <View style={styles.historyItemInfo}>
              <Text style={styles.historyItemTitle}>{item.title}</Text>
              <Text style={styles.historyItemPrice}>R$ {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  backButton: {
    position: 'absolute',
    top: 110, // Agora abaixo do header, ajustado conforme necessário
    left: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: 10, // Ajustado para não sobrepor o botão de voltar
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  historyItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  historyItemInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  historyItemTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold'
  },
  historyItemPrice: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular'
  },
});

export default HistoryScreen;
