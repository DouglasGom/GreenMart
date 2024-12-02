import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png'; 

const MinhasComprasScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  
  const roupasSustentaveis = [
    {
      id: '1',
      imagem: 'https://via.placeholder.com/80x120.png',
      titulo: 'Camiseta de Algodão Orgânico',
      vendedor: 'Loja Verde',
      preco: 'R$ 60,00',
      status: 'Preparando',
    },
    {
      id: '2',
      imagem: 'https://via.placeholder.com/80x120.png',
      titulo: 'Calça Jeans Reciclada',
      vendedor: 'EcoFashion',
      preco: 'R$ 120,00',
      status: 'Preparando',
    },
    {
      id: '3',
      imagem: 'https://via.placeholder.com/80x120.png',
      titulo: 'Jaqueta de Garrafa PET',
      vendedor: 'Sustentáveis Store',
      preco: 'R$ 150,00',
      status: 'Preparando',
    },
    {
      id: '4',
      imagem: 'https://via.placeholder.com/80x120.png',
      titulo: 'Vestido de Tecido Reutilizado',
      vendedor: 'Eco Chic',
      preco: 'R$ 90,00',
      status: 'Preparando',
    },
    {
      id: '5',
      imagem: 'https://via.placeholder.com/80x120.png',
      titulo: 'Saia de Papel Reciclado',
      vendedor: 'Green Look',
      preco: 'R$ 45,00',
      status: 'Preparando',
    },
  ];

 
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Preparando':
        return { color: 'orange' };
      case 'Enviado':
        return { color: 'blue' };
      case 'Entregue':
        return { color: 'green' };
      default:
        return { color: 'gray' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pedidos..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
          <Ionicons name="bag-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Lista de Roupas Sustentáveis */}
      <Text style={styles.Titulo}>PREPARANDO</Text>
      <FlatList
        data={roupasSustentaveis}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.titulo}
              </Text>
              <Text style={styles.cardText}>Vendedor: {item.vendedor}</Text>
              <Text style={styles.cardPrice}>{item.preco}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.cardStatus, getStatusStyle(item.status)]}>
                  {item.status}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {roupasSustentaveis.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 10,
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
    fontFamily: 'Poppins-Regular',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  Titulo: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#0CD028',
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0CD028',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default MinhasComprasScreen;
