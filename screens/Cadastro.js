import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig'; 
import logo from '../assets/Logo-GreenMart.png';

export default function RegisterScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [isCheckedOffers, setCheckedOffers] = useState(false);
    const [isCheckedTerms, setCheckedTerms] = useState(false);

    const handleRegister = async () => {
        
        if (!nome || !email || !senha || !confirmarSenha || !cpf || !telefone || !endereco) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        if (!isCheckedTerms) {
            Alert.alert('Erro', 'Você deve aceitar os Termos de Serviço para continuar.');
            return;
        }

        try {
           
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

           
            const userData = {
                nome_usuario: nome,
                cpf: cpf,
                telefone: telefone,
                endereco_fisico: endereco,
                email: email,
            };

            await setDoc(doc(firestore, 'usuarios', user.uid), userData);

            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
            navigation.navigate('Login'); 

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            Alert.alert('Erro', 'Erro ao registrar. Verifique suas informações.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>CADASTRE-SE</Text>
            <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
            <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
            <TextInput
                placeholder="Confirmar Senha"
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />
            <TextInput placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />
            <TextInput placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
            <TextInput
                placeholder="Endereço"
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
            />
            <View style={styles.checkboxContainer1}>
                <Checkbox value={isCheckedOffers} onValueChange={setCheckedOffers} color={isCheckedOffers ? '#0CD028' : undefined} />
                <Text style={styles.checkboxLabel}>Aceito receber ofertas e novidades no meu E-mail</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox value={isCheckedTerms} onValueChange={setCheckedTerms} color={isCheckedTerms ? 'rgba(254, 94, 204, 0.6)' : undefined} />
                <Text style={styles.checkboxLabel}>
                    Concordo com os <Text style={styles.link}>Termos de Serviço</Text> e <Text style={styles.link}>Política de Privacidade</Text>
                </Text>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>ou</Text>
                <View style={styles.divider} />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>ENTRAR</Text>
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
    logo: {
        height: 150,
        width: 150,
        marginBottom: -20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold'
    },
    input: {
        width: '100%',
        height: 42,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        fontFamily: 'Poppins-Regular'
    },
    checkboxContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 65,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        marginBottom: -5,
        marginTop: 20,
    },
    registerButtonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold'
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
    },
    loginButton: {
        width: '40%',
        height: 50,
        backgroundColor: '#0CD028',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: -5,
    },
    loginButtonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold'
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
});

