import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';
import timerImage from '../assets/relogio.png'; // Adicione a imagem do timer
import cashImage from '../assets/pix.png'; // Adicione a imagem do cash
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';

const DoeRoupasScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const valorDoacao = route.params?.valorDoacao || 0; // Valor da doação recebido de Doe.js
    const [codigoPix, setCodigoPix] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        gerarCodigoPix();
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    Alert.alert("Tempo Expirado", "O código Pix expirou. Gere um novo código.");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const gerarCodigoPix = () => {
        const novoCodigoPix = `00020126360014BR.GOV.BCB.PIX0111+55801234567850220${Math.floor(1000 + Math.random() * 9000)}${valorDoacao}`;
        setCodigoPix(novoCodigoPix);
    };

    const copyToClipboard = () => {
        Clipboard.setString(codigoPix);
        Alert.alert("Código copiado!", "O código Pix foi copiado para a área de transferência.");
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <TextInput style={styles.searchInput} placeholder="Buscar..." editable={false} />
                <TouchableOpacity onPress={() => navigation.navigate('Sacola')}>
                    <Ionicons name="bag-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.collectionPointsSection}>
                <Text style={styles.doacaoTitulo}>OBRIGADO POR AJUDAR!</Text>

                <View style={styles.paymentContainer}>
                    <Image source={timerImage} style={styles.icon} />
                    <Text style={styles.timerText}>
                        Seu código expira em: <Text style={styles.time}>{formatTime(timeLeft)}</Text>
                    </Text>
                </View>

                <View style={styles.paymentContainer}>
                    <Image source={cashImage} style={styles.icon} />
                    <Text style={styles.paymentText}>
                        Pague R$ {valorDoacao} com PIX
                    </Text>
                </View>

                <View style={styles.paymentContainer2}>
                    <Text style={styles.instructionsTitle}>Doar é simples!</Text>
                    <Text style={styles.instructionsText}>
                        1- Abra o aplicativo do seu banco, vá na seção PIX{'\n'}{'\n'}
                        2- Escolha pagar com PIX QR code{'\n'}{'\n'}
                        3- Escaneie o código QR abaixo
                    </Text>
                </View>

                <View style={styles.qrCodeContainer}>
                    {codigoPix ? (
                        <QRCode value={codigoPix} size={200} />
                    ) : (
                        <ActivityIndicator size="large" color="#000" />
                    )}
                </View>

                <View style={styles.paymentContainer3}>
                    <Text style={styles.orTitle}>
                        Ou, se preferir, utilize o PIX copia e cola{'\n'}
                    </Text>

                    <Text style={styles.orText}>
                        Abra o aplicativo do seu banco, escolha pagamento via PIX copia e cola. Confira as informações e confirme o pagamento.
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.codigo} value={codigoPix} editable={false} />
                        <TouchableOpacity onPress={copyToClipboard}>
                        <Ionicons name="clipboard-outline" size={20} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
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
    collectionPointsSection: {
        padding: 15,
        marginHorizontal: 15,
        marginTop: 30
    },
    doacaoTitulo: {
        fontSize: 25,
        marginTop: -40,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    instructionsText: {
        fontSize: 13,
        textAlign: 'left',
        marginBottom: 20,
        marginLeft: 20,
        fontFamily: 'Poppins-Regular'
    },
    instructionsTitle: {
        fontSize: 22,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20,
    },
    qrCodeContainer: {
        borderWidth: 10,
        borderColor: '#FF69B4', // Cor da borda rosa
        borderRadius: 10,
        padding: 2,
        width: 240,
        marginLeft: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    timerText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular'
    },
    time: {
        color: '#FF3333'
    },
    paymentContainer: {
        backgroundColor: '#F6F6F6', // Cor do fundo do retângulo
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20 // Espaçamento inferior
    },
    paymentContainer2: {
        backgroundColor: '#F6F6F6', // Cor do fundo do retângulo
        borderRadius: 8,
        padding: 20,
        marginLeft: -30,
        marginRight: -30,
        alignItems: 'flex-start',
        marginBottom: 20 // Espaçamento inferior
    },
    paymentContainer3: {
        backgroundColor: '#F6F6F6', // Cor do fundo do retângulo
        borderRadius: 8,
        padding: 20,
        marginLeft: -30,
        marginRight: -30,
        alignItems: 'center',
        marginBottom: 20 // Espaçamento inferior
    },
    paymentText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: 330,
        marginLeft: 10
    },
    codigo: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 30,
        paddingHorizontal: 10,
        marginRight: 10
    },
    donateButton: {
        backgroundColor: '#FF69B4',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10
    },
    orTitle: {
        fontSize: 22,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    orText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Poppins-Regular'
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10
    },
});

export default DoeRoupasScreen;
