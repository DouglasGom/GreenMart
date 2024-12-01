import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import roupas from '../assets/Birthday.png';
import dinheiro from '../assets/dinheiro.png';
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
                onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
                <Ionicons name="bag-outline" size={28} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default function UpcyclingScreen({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');

    const handleCardPress = (screen) => navigation.navigate(screen);
    const openDonationModal = () => setIsModalVisible(true);
    const closeDonationModal = () => setIsModalVisible(false);

    const handleDonation = () => {
        if (donationAmount) {
            closeDonationModal();
            navigation.navigate('TelaDoacao', { valorDoacao: donationAmount });
            setDonationAmount('');
        } else {
            alert("Por favor, insira um valor para doar.");
        }
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Text style={styles.title}>COMO VOCÊ DESEJA CONTRIBUIR?</Text>
            <ScrollView style={styles.cardsContainer}>
                <TouchableOpacity style={styles.card} onPress={() => alert("Para a Doação de Roupas, entre em contato com a Ong e agende um horário.")}>
                    <Image source={roupas} style={styles.cardImage} />
                    <Text style={styles.cardTitle}>DOAÇÃO DE ROUPAS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={openDonationModal}>
                    <Image source={dinheiro} style={styles.cardImage} />
                    <Text style={styles.cardTitle}>DOAÇÃO DE DINHEIRO</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeDonationModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Digite o valor da doação</Text>
                        <TextInput
                            style={styles.donationInput}
                            placeholder="R$ 0,00"
                            keyboardType="numeric"
                            value={donationAmount}
                            onChangeText={setDonationAmount}
                        />
                        <TouchableOpacity style={styles.confirmButton} onPress={handleDonation}>
                            <Text style={styles.confirmButtonText}>➜</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeDonationModal}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: -10,
        marginLeft: -15,
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
    title: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 24,
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    cardsContainer: {
        flex: 1,
    },
    card: {
        marginTop: 20,
        height: 200,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cardImage: {
        height: 200,
        width: '100%',
    },
    cardTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        height: '70%',
        marginTop: 450,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        marginBottom: 20,

    },
    donationInput: {
        width: '100%',
        height: 80,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: -20,
        fontSize: 45,
        fontFamily: 'Poppins-Regular'
    },
    confirmButton: {
        marginTop: 300,
        backgroundColor: 'rgba(254, 94, 204, 1.0)',
        padding: 15,
        borderRadius: 25,
        width: 50,
        marginLeft: 300,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#000'
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
});
