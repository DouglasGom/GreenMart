import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { db } from '../firebaseConfig'; // Importe o Firestore corretamente
import { collection, getDocs, query, where } from 'firebase/firestore'; // Funções do Firestore
import logo from '../assets/Logo-GreenMart.png';

const DoeRoupasScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [ongs, setOngs] = useState([]);
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        // Função para buscar as ONGs do Firestore
        const fetchOngs = async () => {
            try {
                // Cria uma referência para a coleção de ONGs
                const ongsRef = collection(db, 'ongs');
                const q = query(ongsRef); // Você pode adicionar filtros aqui, se necessário

                // Recupera os documentos das ONGs
                const querySnapshot = await getDocs(q);
                const fetchedOngs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(fetchedOngs); // Verifique se os dados estão sendo retornados corretamente
                setOngs(fetchedOngs); // Armazena as ONGs no estado
            } catch (error) {
                console.error('Erro ao buscar as ONGs:', error);
            }
        };
        fetchOngs();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
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

            <View style={styles.partnersSection}>
                <Text style={styles.partnersTitle}>CONHEÇA AS ONG'S PARCEIRAS</Text>

                {/* Renderização condicional para verificar se as ONGs estão sendo carregadas */}
                {ongs && ongs.length > 0 ? (
                    ongs
                        .filter((ong) => {
                            // Verifica se o nome da ONG existe e se ele é uma string
                            const name = ong.nome_ong || '';
                            return name.toLowerCase().includes(searchText.toLowerCase());
                        })
                        .map((ong) => (
                            <TouchableOpacity
                                key={ong.id}
                                style={styles.ongButton}
                                onPress={() => navigation.navigate('DoeRoupasDetail', { ong: ong })}
                            >
                                <Image source={{ uri: ong.imagem_ong }} style={styles.ongImage} />
                                <Text style={styles.causeTitle}>{ong.nome_ong}</Text>
                            </TouchableOpacity>
                        ))
                ) : (
                    <Text style={styles.noResults}>Nenhuma ONG encontrada.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
    logo: { width: 70, height: 70, resizeMode: 'contain' },
    searchInput: { flex: 1, height: 40, backgroundColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15, fontFamily: 'Poppins-Regular' },
    partnersSection: { padding: 15, marginHorizontal: 15 },
    partnersTitle: { fontSize: 20, marginBottom: 10, textAlign: 'center', fontFamily: 'Poppins-Bold' },
    ongButton: { alignItems: 'center', marginBottom: 20, backgroundColor: '#f0f0f0', padding: 10 },
    ongImage: { width: '100%', height: 180, borderRadius: 8 },
    causeTitle: { fontSize: 20, marginBottom: 5, marginTop: 10, textAlign: 'center', fontFamily: 'Poppins-Bold' },
    noResults: { textAlign: 'center', fontSize: 18, marginTop: 20 }
});

export default DoeRoupasScreen;
