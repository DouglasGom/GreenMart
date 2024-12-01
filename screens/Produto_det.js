import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';
import { useCart } from './CartContext'; // Usando o contexto para gerenciar o carrinho
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Recebe o produto passado na navegação
  const { addToCart, cart } = useCart(); // Acessando o contexto do carrinho
  const [message, setMessage] = useState(''); // Estado para a mensagem de sucesso

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id_produto === product.id_produto);
    if (existingProduct) {
      // Se o produto já existir no carrinho, aumente a quantidade
      existingProduct.quantity += 1;
    } else {
      // Caso contrário, adicione o produto ao carrinho
      addToCart({ ...product, quantity: 1 });
    }
    setMessage('Adicionado à sacola!'); // Exibe a mensagem de confirmação
    setTimeout(() => setMessage(''), 2000); // Limpa a mensagem após 2 segundos
  };

  // Função para salvar o produto no histórico
  const addToHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      history.push({
        id: product.id_produto,
        title: product.nome_produto,
        price: product.preco_produto,
        image: product.imagem_produto,
      });
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao adicionar produto ao histórico:', error);
    }
  };

  // Adicionar o produto ao histórico ao visualizar a tela
  useEffect(() => {
    addToHistory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Produto */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.productContainer}>
          <Image
            source={{ uri: product?.imagem_produto || 'https://via.placeholder.com/400x400.png?text=Produto' }}
            style={styles.productImage}
          />
          <Text style={styles.price}>R$ {product?.preco_produto || '0,00'}</Text>
          <Text style={styles.productTitle}>{product?.nome_produto || 'Produto Indisponível'}</Text>
          <Text style={styles.installments}>
            {product?.parcelas || 'Parcelamento Indisponível'}
          </Text>
          {/* Descrição */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.descriptionText}>
              {product?.descricao_produto || 'Descrição não disponível.'}
            </Text>
          </View>

          {/* Cor */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cor:</Text>
            <View style={styles.colorOptions}>
              {product?.cores?.map((color, index) => (
                <View
                  key={index}
                  style={[styles.colorCircle, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          {/* Tamanho */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tamanho (BR): {product?.tamanho || 'P'}</Text>
            <View style={styles.sizeOptions}>
              {['XP', 'P', 'M', 'G', 'XG'].map((size) => (
                <TouchableOpacity key={size} style={styles.sizeCircle}>
                  <Text style={styles.sizeText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Mensagem de Sucesso */}
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      {/* Botão de Adicionar à Sacola */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>ADICIONAR À SACOLA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flex: 1,
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
  productContainer: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  price: {
    fontSize: 24,
    color: '#D70015',
    fontFamily: 'Poppins-Bold'
  },
  productTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold'
  },
  productSales: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  installments: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold'
  },
  descriptionText: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular'
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sizeText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular'
  },
  addButtonContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  addButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Poppins-Bold'
  },
  messageContainer: {
    position: 'absolute',
    bottom: 80,
    left: '10%',
    right: '10%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
