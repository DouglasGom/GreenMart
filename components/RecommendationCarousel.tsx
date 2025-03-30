import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const recommendations = [
  {
    id: '1',
    title: 'Harris Tweed Three button',
    subtitle: 'Jacket',
    price: '$120',
    image: require('../assets/images/Banner.png') // Substitua pela sua imagem
  },
  {
    id: '2',
    title: 'Cashmel',
    subtitle: 'Jacket',
    price: '$150',
    image: require('../assets/images/Banner.png') // Substitua pela sua imagem
  },
  {
    id: '3',
    title: 'Cashmel',
    subtitle: 'Jacket',
    price: '$150',
    image: require('../assets/images/Banner.png') // Substitua pela sua imagem
  },
  {
    id: '4',
    title: 'Cashmel',
    subtitle: 'Jacket',
    price: '$150',
    image: require('../assets/images/Banner.png') // Substitua pela sua imagem
  },
  // Adicione mais itens conforme necessário
];

export const RecommendationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>   
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      <View style={styles.pagination}>
        {recommendations.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginBottom: 80
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#238931',
    letterSpacing: 4,
    marginBottom: 20,
  },
  slide: {
    width: width - 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  image: {
    width: '75%',
    height: 320,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(254, 94, 204, 0.78)',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    transform: [{ rotate: '45deg' }],
  },
  paginationDotActive: {
    backgroundColor: '#888888',
  },
});