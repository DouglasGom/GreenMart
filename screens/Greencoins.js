import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null);
  const [currentGreencoins, setCurrentGreencoins] = useState(0);

  const coupons = [
    { id: 1, title: '10% de desconto (nacionais)', cost: 100, image: cupom1 },
    { id: 2, title: 'Cupom BOAS VINDAS 10% OFF', cost: 100, image: cupom2, exclusive: true },
    { id: 3, title: '15% de desconto (nacionais)', cost: 200, image: cupom1 },
    { id: 4, title: 'Vale presente R$ 80,00', cost: 600, image: cupom2 },
  ];

  useEffect(() => {
    const loggedUser = { email: 'user@example.com' };
    if (loggedUser) {
      setUser(loggedUser);
      setCurrentGreencoins(300); 
    } else {
      setUser(null);
      setCurrentGreencoins(0);
    }
  }, []);

  const handleRedeem = (cost) => {
    if (!user) {
      alert('Você precisa estar logado para resgatar um cupom!');
      navigation.navigate('Login');
    } else if (currentGreencoins >= cost) {
      alert('Cupom resgatado com sucesso!');
    } else {
      alert(`Não há GreenCoins suficientes. Faltam ${cost - currentGreencoins} GreenCoins.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />

      <Text style={styles.title}>GREENCOINS</Text>
      <Text style={styles.subtitle}>SEJA RECOMPENSADO A CADA DOAÇÃO</Text>

      <View style={styles.causeSection}>
        <Text style={styles.causeText}>
          Das 59 mil toneladas de roupas importadas todos os anos, grande parte (por volta de 40 mil toneladas) não é vendida - acaba no lixo.
        </Text>
      </View>

      {/* Seção de contagem de Greencoins */}
      <View style={styles.greencoinsSection}>
        <Image source={greencoins} style={styles.greencoinsImage} />
        <Text style={styles.greencoinsText}>{currentGreencoins}</Text>
      </View>

      <View style={styles.couponsContainer}>
        {coupons.map((coupon) => {
          const progress = user ? currentGreencoins / coupon.cost : 0;

          return (
            <View key={coupon.id} style={styles.couponCard}>
              <Image source={coupon.image} style={styles.couponImage} />
              <Text style={styles.couponTitle}>{coupon.title}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${Math.min(progress * 100, 100)}%` }]} />
              </View>
              <View style={styles.redeemContainer}>
                <View style={styles.costContainer}>
                  <Image source={greencoins} style={styles.greencoinsImage} />
                  <Text style={styles.couponCost}>{coupon.cost}</Text>
                </View>
                <TouchableOpacity style={styles.redeemButton} onPress={() => handleRedeem(coupon.cost)}>
                  <Text style={styles.redeemButtonText}>Resgatar</Text>
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
    color: '#0CD028',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular'
  },
  causeSection: {
    backgroundColor: 'rgba(166, 242, 164, 0.73)',
    padding: 15,
    marginHorizontal: -20,
    marginBottom: -10,
  },
  causeText: {
    fontSize: 14,
    marginLeft: 25,
    marginRight: 30,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  greencoinsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 20,
  },
  greencoinsImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  greencoinsText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-Bold',
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
    height: 330,
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
  couponCost: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Bold'
  },
  redeemButton: {
    backgroundColor: 'rgba(254, 94, 204, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  redeemButtonText: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'Poppins-Bold'
  },
});

export default CouponsScreen;
