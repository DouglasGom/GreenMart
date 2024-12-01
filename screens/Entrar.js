import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isCheckedOffers, setCheckedOffers] = useState(false);

    const handleLogin = async () => {
        const user = { email, senha };

        try {
            const response = await fetch('http://192.168.1.5:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Login bem-sucedido!');

                // Salve os dados do usuário no AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(result.user));

                // Redefine a navegação, forçando a recarga do app com os dados atualizados
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                alert(result.message || 'Credenciais inválidas.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao autenticar. Verifique sua conexão.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Logo */}
            <Image source={logo} style={styles.logo} />

            {/* Título */}
            <Text style={styles.title}>ENTRAR</Text>

            {/* Campos de Texto */}
            <TextInput
                placeholder="E-mail"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            {/* Checkbox */}
            <View style={styles.checkboxContainer1}>
                <Checkbox
                    value={isCheckedOffers}
                    onValueChange={setCheckedOffers}
                    color={isCheckedOffers ? '#0CD028' : undefined}
                />
                <Text style={styles.checkboxLabel}>Lembre-se de mim</Text>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>

             {/* Linha divisória */}
             <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>ou</Text>
                <View style={styles.divider} />
            </View>

            {/* Botão Google */}
            <TouchableOpacity style={styles.loginButtong}>
                <View style={styles.iconButtonContainer}>
                    <Image source={require('../assets/google.png')} style={styles.icong} />
                    <Text style={styles.loginButtonTextg}> ENTRAR COM GOOGLE</Text>
                </View>
            </TouchableOpacity>

            {/* Botão Facebook */}
            <TouchableOpacity style={styles.loginButtonf}>
                <View style={styles.iconButtonContainer}>
                    <Image source={require('../assets/facebook.png')} style={styles.iconf} />
                    <Text style={styles.loginButtonTextBlack}> ENTRAR COM FACEBOOK</Text>
                </View>
            </TouchableOpacity>

            {/* Botão E-mail */}
            <TouchableOpacity style={styles.loginButtone}>
                <View style={styles.iconButtonContainer}>
                    <Image source={require('../assets/email.png')} style={styles.icone} />
                    <Text style={styles.loginButtonTextBlack}> ENTRAR COM E-MAIL</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Main')}>
                <Text style={styles.guestButtonText}>CONTINUAR COMO CONVIDADO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    icong: {
        width: 30,
        height: 35,
        marginRight: 5,
        marginLeft: -5
    },
    icone: {
        width: 35,
        height: 25,
        marginRight: -2,
        marginLeft: -10
    },
    iconf: {
        width: 35,
        height: 35,
        marginRight: -6,
        marginLeft: 7
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: 60,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
        fontFamily: 'Poppins-Regular'
    },
    checkboxContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 230,
    },
    checkboxLabel: {
        fontSize: 11,
        color: '#666',
        marginLeft: 10,
        fontFamily: 'Poppins-Regular'
    },
    link: {
        color: '#007BFF',
    },
    registerButton: {
        width: '40%',
        height: 50,
        backgroundColor: 'rgba(254, 94, 204, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
        marginTop: 20,
    },
    registerButtonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 12,
        color: '#666',
        fontFamily: 'Poppins-Regular'
    },
    loginButtong: {
        width: '70%',
        height: 50,
        backgroundColor: 'rgba(66, 133, 244, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    loginButtonf: {
        width: '70%',
        height: 50,
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    loginButtone: {
        width: '70%',
        height: 50,
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    loginButtonTextg: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    loginButtonTextBlack: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        marginLeft: 10,
    },

    guestButton: {
        marginTop: 10,
        paddingVertical: 15,
    },
    guestButtonText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
        fontSize: 16,
        fontFamily: 'Poppins-Bold'
    },

    iconButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginButtonText: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Bold'
    },

});

