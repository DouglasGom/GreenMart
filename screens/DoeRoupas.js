import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useFonts } from 'expo-font';
import Greencoins from '../assets/Greencoins.png';
import logo from '../assets/Logo-GreenMart.png';

const DoeRoupasScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
                    <Ionicons name="bag-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.coinsHeader}>
                <Text style={styles.greenCoinsText}>MEUS GREEN COINS:</Text>
                <View style={styles.greenCoinsContainer}>
                    <View style={styles.greenCoinsContent}>
                        <Image source={Greencoins} style={styles.greenCoinsImage} />
                        <Text style={styles.coinValue}>100</Text>
                    </View>
                    <TouchableOpacity style={styles.exchangeButton} onPress={() => navigation.navigate('Prêmios')}>
                        <Text style={styles.exchangeButtonText}>TROCAR GREENCOINS</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.causeTitle}>DOE PARA A CAUSA</Text>
            <View style={styles.causeSection}>
                <Text style={styles.causeText}>
                    Das 59 mil toneladas de roupas importadas todos os anos, grande parte (por volta de 40 mil toneladas) não é vendida - acaba no lixo.
                </Text>
            </View>

            <View style={styles.collectionPointsSection}>
                <Text style={styles.collectionPointsTitle}>PONTOS DE COLETA</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -23.5505,
                        longitude: -46.6333,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsPointsOfInterest={false}
                    showsTraffic={true}
                    userInterfaceStyle='dark'
                >
                    <Marker coordinate={{ latitude: -23.5505, longitude: -46.6333 }} title="Ponto de Coleta 1" pinColor='blue' />
                </MapView>

                <Text style={styles.collectionPointsText}>
                    Doe roupas antigas para aqueles que necessitam, ou doe tecidos para a produção de nossas roupas sustentáveis. Vá até o ponto de coleta mais próximo de você!
                </Text>
                <TouchableOpacity style={styles.donateButton} onPress={() => navigation.navigate('ong')}>
                    <Text style={styles.donateButtonText}>DOAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fff',
    },
    greenCoinsImage: { width: 25, height: 25, marginRight: 3, marginLeft: -20 },
    greenCoinsContent: { alignItems: 'center' },
    greenCoinsText: { fontSize: 16, fontFamily: 'Poppins-Bold' },
    greenCoinsContainer: { flexDirection: 'row', alignItems: 'center' },
    coinValue: { fontSize: 16, fontFamily: 'Poppins-Bold', marginTop: -2, marginRight: 20 },
    exchangeButton: { backgroundColor: '#A6F2A4', paddingVertical: 5, paddingHorizontal: 5, borderRadius: 30 },
    exchangeButtonText: { color: '#000', fontFamily: 'Poppins-Bold' },
    causeSection: { padding: 15, backgroundColor: 'rgba(166, 242, 164, 0.73)' },
    causeTitle: {
        fontSize: 20,
        marginBottom: 5,
        marginTop: 17,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    causeText: { fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', textAlign: 'justify' },
    collectionPointsSection: { padding: 15, marginHorizontal: 15 },
    collectionPointsTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
    map: { width: '100%', height: 200, borderRadius: 8, marginBottom: 10 },
    collectionPointsText: { fontSize: 14, color: '#333', marginBottom: 15, fontFamily: 'Poppins-Regular', textAlign: 'justify' },
    donateButton: { backgroundColor: '#FFA6E1', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, alignSelf: 'center' },
    donateButtonText: { color: '#000', fontFamily: 'Poppins-Bold' },
});

export default DoeRoupasScreen;
