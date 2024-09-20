import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import logo from '../assets/Logo-GreenMart.png'; // certifique-se de que o caminho da logo esteja correto

const DoeRoupasScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Header com logo, barra de busca e ícone da sacola */}
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

      {/* Header com Green Coins e botão */}
      <View style={styles.coinsHeader}>
        <Text style={styles.greenCoinsText}>MEUS GREEN COINS:</Text>
        <View style={styles.greenCoinsContainer}>
          <Text style={styles.coinValue}>100</Text>
          <TouchableOpacity style={styles.exchangeButton}>
            <Text style={styles.exchangeButtonText}>TROCAR GREENCOINS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção "Doe para a Causa" */}
      <View style={styles.causeSection}>
        <Text style={styles.causeTitle}>DOE PARA A CAUSA</Text>
        <Text style={styles.causeText}>
          Das 59 mil toneladas de roupas importadas todos os anos, grande parte (por volta de 40 mil toneladas) não é vendida - acaba no lixo.
        </Text>
      </View>

      {/* Seção "Pontos de Coleta" */}
      <View style={styles.collectionPointsSection}>
        <Text style={styles.collectionPointsTitle}>PONTOS DE COLETA</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.5505, // Altere para a latitude central
            longitude: -46.6333, // Altere para a longitude central
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: -23.5505, longitude: -46.6333 }} title="Ponto de Coleta 1" />
          {/* Adicione mais Marcadores conforme necessário */}
        </MapView>
        <Text style={styles.collectionPointsText}>
          Doe roupas antigas para aqueles que necessitam, ou doe tecidos para a produção de nossas roupas sustentáveis. Vá até o ponto de coleta mais próximo de você!
        </Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>DOAR</Text>
        </TouchableOpacity>
      </View>

      {/* Seção "Veja as ONG's Parceiras" */}
      <View style={styles.partnersSection}>
        <Text style={styles.partnersTitle}>VEJA AS ONG'S PARCEIRAS</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150.png' }} // substitua pela URL da imagem da ONG
          style={styles.ongImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  coinsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  greenCoinsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  greenCoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  exchangeButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  exchangeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  causeSection: {
    padding: 15,
    backgroundColor: '#f0fff0',
  },
  causeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  causeText: {
    fontSize: 14,
    color: '#333',
  },
  collectionPointsSection: {
    padding: 15,
  },
  collectionPointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  collectionPointsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  donateButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  partnersSection: {
    padding: 15,
  },
  partnersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ongImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});

export default DoeRoupasScreen;
