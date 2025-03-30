import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useStore } from '@/store/useStore';
import type { Product } from '@/store/useStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; 

export function ProductCard({ product, onPress }) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.some((p) => p.id === product.id);

  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(product)}>
        <Heart
          size={20}
          color={isFavorite ? 'rgba(254, 94, 204, 0.78)' : 'rgba(254, 94, 204, 0.78)'}
          fill={isFavorite ? 'rgba(254, 94, 204, 0.78)' : 'transparent'}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: CARD_WIDTH,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    marginBottom: 40,
  
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: -10,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  price: {
    fontSize: 15,
    color: 'rgba(254, 94, 204, 0.78)',
  },
  favoriteButton: {
    position: 'absolute',
    top: 160,
    right: 10,
    borderRadius: 20,
    padding: 5,
  },
  brand: {
    fontFamily: 'Poppins_500Medium',
    marginBottom: -5,
    fontSize: 11,
    color: '#238931'
  }
});
