import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';

const categories = [
  { id: 1, title: 'Vestidos', image: require('../assets/Categorias/Vestido.jpg'), discount: '60%' },
  { id: 2, title: 'Agasalhos', image: require('../assets/Categorias/Agasalhos.jpg'), discount: '10%' },
  { id: 3, title: 'Saias', image: require('../assets/Categorias/Saias.jpg'), discount: '10%' },
  { id: 4, title: 'Partes de Cima', image: require('../assets/Categorias/Partes_de_Cima.jpg'), discount: '15%' },
  { id: 5, title: 'Fitness', image: require('../assets/Categorias/Fitness.jpg'), discount: '15%' },
  { id: 6, title: 'Malhas', image: require('../assets/Categorias/Malhas.jpg'), discount: '10%' },
];

const Header = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.header}>
      <Image
        source={logo}
        style={styles.logo}
      />
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

const SidebarMenu = ({ navigation }) => {
  const menuItems = [
    'Promoção', 'Partes de Cima', 'Partes de Baixo', 'Vestidos', 'Jeans', 
    'Agasalhos', 'Malhas', 'Conjuntos', 'Macacões e Macaquinhos', 
    'Roupas de Banho', 'Fitness', 'Plus Size', 'Esportes e Ar Livre', 
    'Acessórios', 'Jóias', 'Underwear'
  ];

  return (
    <View style={styles.sidebar}>
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(item)}>
            <Text style={styles.menuItem}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Promotions = () => {
  return (
    <ScrollView style={styles.promotionsContainer}>
      <View style={styles.cardsContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.card}>
            <View style={styles.cardImageContainer}>
              <Image source={category.image} style={styles.cardImage} />
              <Text style={styles.discountText}>{category.discount} OFF</Text>
            </View>
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <SidebarMenu navigation={navigation} />
        <Promotions />
      </View>
    </View>
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
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 10,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  promotionsContainer: {
    flex: 1,
    padding: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  discountText: {
    position: 'absolute',
    top: 3,
    right: 1,
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  cardTitle: {
    marginTop: 5,
  },
});

export default HomeScreen;
