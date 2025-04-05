import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { BlurView } from 'expo-blur';
import { Video } from 'expo-av';
import Logo from '../../assets/images/Logo-GreenMart.png';
import Line from '../../assets/images/line.png';
import Brands from '../../assets/images/Brands.png';
import CollectionBanner from '../../assets/images/CollectionBanner.png';
import CollectionBanner2 from '../../assets/images/Collection.png';
import Campeao from '../../assets/video/Campeao.mp4';
import { RecommendationCarousel } from '@/components/RecommendationCarousel';
import Sobre from '../../assets/images/about.png';
import Leaf from '../../assets/images/leaf.png';
import { FontAwesome } from '@expo/vector-icons';
import May from '../../assets/images/may.png';
import Nat from '../../assets/images/nat.png';
import Dodo from '../../assets/images/dodo.png';
import Erika from '../../assets/images/erika.png';
import SearchHeader from './searchHeader';

const { width } = Dimensions.get('window');


const banners = [
  { id: 1, image: require('../../assets/images/Banner.png') },
  { id: 2, image: require('../../assets/images/Banner2.png') },
  { id: 3, image: require('../../assets/images/Banner3.png') },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.backgroundText}>
        LUXURY{'\n'}FASHION{'\n'}& ACESSORIES
      </Text>
      <BlurView intensity={60} tint="dark" style={styles.collectionButton}>
        <TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins_500Medium',
              fontSize: 15,
            }}
          >
            CONHEÇA A NOVA COLEÇÃO
          </Text>
        </TouchableOpacity>
      </BlurView>
    </ImageBackground>
  );

  const filteredCategories = categories
    .filter((category) => category !== 'All')
    .map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          selectedCategory === category && styles.categoryButtonActive,
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category && styles.categoryTextActive,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ));

  filteredCategories.unshift(
    <TouchableOpacity
      key="All"
      style={[
        styles.categoryButton,
        selectedCategory === 'All' && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory('All')}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === 'All' && styles.categoryTextActive,
        ]}
      >
        All
      </Text>
    </TouchableOpacity>
  );

  const filteredProductCards = filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      onPress={() => router.push(`/product/${product.id}`)}
    />
  ));
  

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SearchHeader />
        <FlatList
          data={banners}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          style={{ width: '100%' }}
        />

        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>LANÇAMENTOS</Text>
        <Image source={Line} style={styles.line} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryButton}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
              {selectedCategory === category && (
                <View style={styles.indicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push(`/product/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.productsContainer}
          scrollEnabled={false}
        />

        <View style={styles.seeMore}>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Ver Mais</Text>
            <Ionicons name="arrow-forward-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Image
          source={Line}
          style={{
            resizeMode: 'center',
            width: '40%',
            marginBottom: 20,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />

        <Image
          source={Brands}
          style={{
            resizeMode: 'center',
            width: '100%',
            marginBottom: -70,
            marginTop: -70,
            alignSelf: 'center',
          }}
        />

        <Image
          source={Line}
          style={{
            resizeMode: 'center',
            width: '40%',
            marginBottom: 50,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />

        <View style={styles.Collections}>
          <Text style={styles.title}>COLEÇÕES</Text>

          <TouchableOpacity style={{ marginTop: 50 }}>
            <Image
              source={CollectionBanner}
              style={{
                width: width,
                height: 250,
                marginBottom: 50,
                resizeMode: 'cover',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={CollectionBanner2}
              style={{
                width: 250,
                alignSelf: 'center',
                resizeMode: 'stretch',
                height: 250,
                marginBottom: 50,
              }}
            />
          </TouchableOpacity>

          <View>
            <Video
              source={Campeao}
              style={styles.video}
              useNativeControls={false}
              isLooping
              shouldPlay={isPlaying}
            />
            <View style={styles.videoControls}>
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.Collections}>
          <Text style={styles.title}>PARA VOCÊ</Text>
          <Image
            source={Line}
            style={{
              resizeMode: 'center',
              width: '40%',
              marginBottom: -30,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />

          <RecommendationCarousel />
        </View>

        <Text style={styles.title}>@EM ALTA</Text>
        <View style={styles.trending}>
          <TouchableOpacity style={styles.trend}>
            <Text>#2025</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trend}>
            <Text>#Spring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trend}>
            <Text>#Collect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trend}>
            <Text>#Fall</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.trending2}>
          <TouchableOpacity style={styles.trend}>
            <Text>#Dress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trend}>
            <Text>#Autumn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trend}>
            <Text>#Fashion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.about}>
          <Image source={Logo} style={styles.logo2} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins_400Regular',
              padding: 25,
            }}
          >
            Oferecer um estilo de vida sustentável acessível a todas as pessoas
            é o nosso objetivo..
          </Text>
          <Image
            source={Line}
            style={{
              resizeMode: 'center',
              width: '40%',
              marginBottom: -30,
              marginTop: -50,
              alignSelf: 'center',
            }}
          />
          <Image
            source={Sobre}
            style={{
              resizeMode: 'stretch',
              width: 300,
              height: 200,
              marginTop: 20,
              alignSelf: 'center',
            }}
          />

          <Image
            source={Leaf}
            style={{
              resizeMode: 'stretch',
              width: 30,
              height: 40,
              marginTop: 50,
              marginBottom: 50,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={styles.sobreNos}>
          <Text style={styles.title}>ACOMPANHE-NOS</Text>
          <FontAwesome
            name="instagram"
            size={25}
            color="#000"
            style={styles.insta}
          />

          <View style={styles.creators}>
            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Image source={Dodo} style={styles.creatorImage} />
              <Text
                style={{
                  color: '#fff',
                  margin: 10,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                @sccp_hiraishin
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Image source={Erika} style={styles.creatorImage} />
              <Text
                style={{
                  color: '#fff',
                  margin: 10,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                @erii.rd
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.creators}>
            <TouchableOpacity>
              <Image source={May} style={styles.creatorImage} />
              <Text
                style={{
                  color: '#fff',
                  margin: 10,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                @m4Yxx__
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={Nat} style={styles.creatorImage} />
              <Text
                style={{
                  color: '#fff',
                  margin: 10,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                @natizsantos
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome
                name="twitter"
                size={25}
                color="#000"
                style={styles.insta}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome
                name="instagram"
                size={25}
                color="#000"
                style={styles.insta}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome
                name="youtube-play"
                size={25}
                color="#000"
                style={styles.insta}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={Line}
            style={{
              resizeMode: 'center',
              width: '40%',
              marginBottom: -30,
              marginTop: -50,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={styles.contact}>
          <Text style={styles.contactText}>green@mart.environment</Text>

          <Text style={styles.contactText}>+55 (11)9 7825 - 7376 </Text>

          <Text style={styles.contactText}>
            08:00 - 22:00 - De Segunda a Sexta
          </Text>

          <Image
            source={Line}
            style={{
              resizeMode: 'center',
              width: '40%',
              marginBottom: -30,
              marginTop: -10,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>SOBRE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>CONTATO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>SITE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          Copyright© GreenMart Todos os direitos reservados.
        </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoriesContainer: {
    marginTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
  },

  categoriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#a0a0a0',
  },

  categoryTextActive: {
    color: '#238931',
    fontFamily: 'Poppins_400Regular',
  },

  indicator: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(254, 94, 204, 0.78)',
    transform: [{ rotate: '45deg' }],
    alignSelf: 'center',
  },

  productsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  sideButton: {
    marginRight: 50,
  },
  logo: {
    marginRight: 35,
    marginLeft: 95,
    marginTop: -10,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  search: {
    marginRight: 20,
  },
  bag: {
    marginTop: 4,
  },
  background: {
    width: width,
    height: 850,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  pagination: {
    position: 'absolute',
    top: 780,
    left: '90%',
    transform: [{ translateX: -width / 2 }],
    flexDirection: 'row',
  },
  paginationDot: {
    width: 10,
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: '#fff',
    borderWidth: 1,
    margin: 5,
    transform: [{ rotate: '45deg' }],
  },
  paginationDotActive: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  collectionButton: {
    marginTop: 50,
    padding: 8,
    paddingHorizontal: 50,
    borderRadius: 30,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#238931',
    letterSpacing: 4,
    marginBottom: -40,
  },
  line: {
    resizeMode: 'center',
    width: '40%',
    marginBottom: -50,
    alignSelf: 'center',
  },
  backgroundText: {
    fontSize: 45,
    fontFamily: 'BodoniModa_700Bold',
    marginTop: 200,
    marginBottom: 150,
    color: '#555555',
  },
  seeMore: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    fontSize: 18,
    marginRight: 5,
    color: '#238931',
    fontFamily: 'Poppins_400Regular',
  },
  Collections: {
    width: width,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 50,
  },
  videoControls: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 120,
    flexDirection: 'row',
    width: '100%',
  },
  playPauseButton: {
    backgroundColor: '#238931',
    padding: 10,
    borderRadius: 50,
  },
  trend: {
    backgroundColor: '#d6d6d6',
    marginTop: 60,
    height: 20,
    marginBottom: 10,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginRight: 10,
  },
  trending: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -80,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  trending2: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 80,
  },
  about: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo2: {
    marginTop: -10,
    height: 70,
    width: 70,
    resizeMode: 'stretch',
  },
  sobreNos: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  insta: {
    marginTop: 40,
    marginBottom: 20,
  },
  creatorImage: {
    height: 150,
    width: 150,
    marginRight: 20,
    marginBottom: -35,
  },
  creators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 22,
  },
  socialButton: {
    marginRight: 20,
    marginBottom: 20,
  },
  contact: {
    alignItems: 'center',
    marginTop: 15,
  },
  contactText: {
    marginBottom: 0,
    fontFamily: 'Poppins_400Regular',
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingInline: 60,
    marginRight: 15,
    marginTop: 20,
  },
  contactButton: {},
  contactButtonText: {
    color: '#238931',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  copyright: {
    alignSelf: 'center',
    marginTop: 20,
    paddingInline: 24,
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  categoryButtonActive: {
    color: '#238931',
  },
});
