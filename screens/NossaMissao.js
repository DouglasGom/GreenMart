import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';
import missao1 from '../assets/missao1.jpg';
import missao2 from '../assets/missao2.png';

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

const MissionScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <Header navigation={navigation} />

      {/* Seção Nossa Missão */}
      <View style={styles.section}>
        <View style={styles.imageWithText}>
          <Image source={missao1} style={styles.image} />
          <View style={styles.textBlock}>
            <Text style={styles.title}>NOSSA MISSÃO</Text>
            <Text style={styles.description}>
              Buscamos tornar a moda cada vez mais sustentável, através de movimentos como eco fashion, o meio de produção que evita a agressão ao meio-ambiente.
            </Text>
          </View>
        </View>
      </View>

      {/* Seção O Desperdício */}
      <Text style={styles.subtitle}>O DESPERDÍCIO</Text>
      <View style={styles.sectionHorizontal}>
        <Image source={missao2} style={styles.leftImage} />
        <Text style={styles.rightText}>
          São necessários 2700 litros de água para fabricar uma única camisa de algodão. Água suficiente para uma pessoa beber por 2,5 anos.
          {'\n\n'}
          1 caminhão de lixo (2625 kg de roupas) é queimado ou enviado a aterros a cada segundo. O suficiente para preencher 1,5 Empire State por dia. O suficiente para preencher a baía de Sydney todo ano.
        </Text>
      </View>

      {/* Seção Nosso App */}
      <View style={styles.section}>
        <Text style={styles.subtitle2}>NOSSO APP</Text>
        <Text style={styles.description2}>
          Pensando nisso, desenvolvemos o GreenMart. Aqui você pode comprar novas peças de marcas conscientes, sem o peso de destruir nosso planeta.
          {'\n\n'}
          Além disso, nós te ajudamos a ressignificar uma peça antiga, seja por meio de doações, ou customização. Aproveite nossos GreenCoins e não se esqueça de visitar nosso ponto de coleta mais próximo a você.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ong')}>
          <Text style={styles.buttonText}>DOAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    fontFamily: 'Poppins-Regular'
  },

  imageWithText: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 230,
  },
  textBlock: {
    position: 'absolute',
    top: '10%',
    right: '36%',
    width: '60%',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 15,
    marginTop: -12,
    marginLeft: -7,
    textAlign: 'left',
  },
  description: {
    fontSize: 15,
    color: '#333',
    textAlign: 'left',
    marginLeft: -7,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular'
  },
  description2: {
    fontSize: 15,
    color: '#333',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular'
  },
  subtitle: {
    fontSize: 22,
    color: '#000',
    marginTop: 15,
    marginBottom: -5,
    marginLeft: 20,
    fontFamily: 'Poppins-Bold'
  },
  subtitle2: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  leftImage: {
    width: 150,
    height: 280,
    marginRight: 20,
  },
  rightText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular'
  },
  button: {
    backgroundColor: '#0CD028',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 8,
    marginTop: 20,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
});

export default MissionScreen;
