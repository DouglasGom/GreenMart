import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext'; // Usando o contexto para gerenciar o carrinho

const SacolaScreen = ({ navigation }) => {
    const { cart, getTotal } = useCart(); // Acessando o carrinho e a função getTotal
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{
                    uri: item.imagem_produto || 'https://via.placeholder.com/400x400.png?text=Produto',
                }} // Foto do produto
                style={styles.productImage}
            />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.nome_produto}</Text>
                <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
                <Text style={styles.productPrice}>R$ {item.preco_produto * item.quantity}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={require('../assets/Logo-GreenMart.png')} style={styles.logo} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
                    <Ionicons style={{ marginLeft: 10 }} name="bag-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Carrinho */}
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_produto ? item.id_produto.toString() : item.id.toString()} // Verifique se `id_produto` existe
            />

            {/* Valor Total */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: R$ {getTotal()}</Text>
            </View>

            {/* Botão de Finalizar Compra */}
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15,
    },
    logo: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginLeft: -20,
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
    card: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        marginRight: 20,
    },
    productDetails: {
        flexDirection: 'column',
        justifyContent: 'center', 
    },
    productName: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold'
    },
    productQuantity: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Poppins-Regular'
    },
    productPrice: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-Regular'
    },
    totalContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
    },
    totalText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    checkoutButton: {
        marginTop: 20,
        backgroundColor: '#FF69B4',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkoutText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Poppins-Bold'
    },
});

export default SacolaScreen;
