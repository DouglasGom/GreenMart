import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import greencoins from '../assets/Greencoins.png';
import logo from '../assets/Logo-GreenMart.png';
import cupom1 from '../assets/cupom1.png';
import cupom2 from '../assets/cupom2.png';

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

const CouponsScreen = ({ navigation }) => {
  const currentGreencoins = 50; 
  const coupons = [
    { id: 1, title: '5% de desconto (nacionais)', cost: 100, image: cupom1},
    { id: 2, title: 'Cupom BOAS VINDAS 10% OFF', cost: 100, image: cupom2, exclusive: true },
    { id: 3, title: '15% de desconto (nacionais)', cost: 200, image: cupom1},
    { id: 4, title: 'Vale presente R$ 80,00', cost: 600, image: cupom2},
  ];

  const handleRedeem = (cost) => {
    if (currentGreencoins >= cost) {
      alert('Cupom resgatado com sucesso!');
    } else {
      alert(`Não há GreenCoins suficientes. Faltam ${cost - currentGreencoins} GreenCoins.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Adicionando o Header */}
      <Header navigation={navigation} />

      <Text style={styles.title}>MEUS CUPONS</Text>
      

      <View style={styles.couponsContainer}>
        {coupons.map((coupon) => {
          const progress = currentGreencoins / coupon.cost;

          return (
            <View key={coupon.id} style={styles.couponCard}>
              <Image source={coupon.image} style={styles.couponImage} />
              <Text style={styles.couponTitle}>{coupon.title}</Text>
              
              <View style={styles.redeemContainer}>
                
                <TouchableOpacity style={styles.redeemButton} onPress={() => navigation.navigate('Início')}>
                  <Text style={styles.redeemButtonText}>USAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
  title: {
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0CD028',
  },
  causeText: {
    fontSize: 14,
    marginLeft: 25,
    marginRight: 30,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  couponsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 13,
    height: 340,
    marginBottom: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  couponImage: {
    width: '120%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '70%',
    marginTop: -15,
    marginBottom: 10,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'left',
    color: '#333',
    fontFamily: 'Poppins-Regular'
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0CD028',
  },
  redeemContainer: {
    flexDirection: 'row',
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greencoinsImage: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  couponCost: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    fontFamily: 'Poppins-Bold'
  },
  redeemButton: {
    width: 150,
    backgroundColor: 'rgba(254, 94, 204, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Bold'
  },
});

export default CouponsScreen;
