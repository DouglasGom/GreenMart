import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig'; // Importe a configuração do Firebase
import { collection, getDocs } from 'firebase/firestore'; // Funções para obter dados do Firestore
import logo from '../assets/Logo-GreenMart.png';

// Componente Header
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

// Tela principal de vídeos com o Header
export default function VideoListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Buscar vídeos do Firestore
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        const videosData = querySnapshot.docs.map(doc => doc.data()); // Mapeando os dados para o formato desejado
        setVideos(videosData);
      } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
      }
    };

    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('video', { video: item })}
    >
      <Image source={{ uri: item.foto }} style={styles.image} />
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.causeTitle}>UPCYCLING</Text>
      <Text style={styles.subtitle}>
        DÊ UMA NOVA VIDA AO QUE NÃO USA
      </Text>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()} // Usando índice como chave
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: {
    marginTop: 15,
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
    fontFamily: 'Poppins-Regular',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    height: 330
  },
  image: { width: '100%', height: 200, borderRadius: 8 },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  causeTitle: {
    fontSize: 23,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    marginTop: 17,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#4CAF50', // Verde
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});
