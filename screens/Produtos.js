import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig'; // Importe o Firestore corretamente
import { collection, query, where, getDocs } from 'firebase/firestore'; // Funções do Firestore
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

const ProductsScreen = ({ navigation }) => {
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(route.params?.category || 'roupas'); // Categoria inicial padrão.

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Cria uma referência para a coleção de produtos
        const produtosRef = collection(db, "produtos");
        // Cria uma consulta para filtrar os produtos pela categoria
        const q = query(produtosRef, where("tipo", "==", category));
        // Recupera os documentos que correspondem à consulta
        const querySnapshot = await getDocs(q);
        
        // Mapeia os documentos para obter os dados de cada produto
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id_produto: doc.id,
          ...doc.data(), // Dados do produto
        }));

        // Atualiza o estado com os produtos encontrados
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [category]); // Atualiza os produtos sempre que a categoria mudar.

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />

      {/* Lista de Produtos */}
      <ScrollView style={styles.container}>
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id_produto}
              style={styles.productCard}
              onPress={() => navigation.navigate('prod-d', { product })}
            >
              <Image source={{ uri: product.imagem_produto }} style={styles.productImage} />
              <Text style={styles.productTitle}>{product.nome_produto}</Text>
              <View style={styles.productInfo}>
                <Text style={styles.productPrice}>R$ {product.preco_produto}</Text>
                <Text style={styles.productSales}>{product.vendas} vendas</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    marginBottom: 20,
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
    fontFamily: 'Poppins-Regular'
  },
  categoryBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  activeCategoryButton: {
    backgroundColor: '#0CD028',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Poppins-Regular'
  },
  activeCategoryText: {
    color: '#FFF',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 270,
    marginBottom: 10,
    width: '49.3%',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Poppins-Bold'
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  productPrice: {
    fontSize: 16,
    color: '#0CD028',
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular'
  },
  productSales: {
    fontSize: 8,
    color: '#666',
    fontWeight: '600',
    marginRight: 20,
    marginTop: 5,
    fontFamily: 'Poppins-Regular'
  },
});

export default ProductsScreen;
