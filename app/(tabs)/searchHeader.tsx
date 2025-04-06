import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Dimensions,
  ScrollView,
  Modal,
  BackHandler,
  StatusBar,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import {
  Ionicons,
  EvilIcons,
  SimpleLineIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Logo = require('../../assets/images/Logo-GreenMart.png');
const { height } = Dimensions.get('screen');

const SearchHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);
  const sidebarAnim = useRef(new Animated.Value(-320)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (searchFocused) {
          closeSearch();
          return true;
        }
        if (sidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [searchFocused, sidebarVisible]);

  const toggleSearch = () => {
    setSearchFocused(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const closeSearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchHistory((prev) => [
        searchQuery,
        ...prev.filter((q) => q !== searchQuery),
      ]);
      closeSearch();
      router.push({
        pathname: '/searchResults',
        params: { query: searchQuery },
      });
    }, 2000);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -320,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  const sidebarCategories = [
    { name: 'Novo', items: ['Camisetas', 'Calças', 'Vestidos'] },
    {
      name: 'Roupas',
      items: [
        'Vestidos',
        'Blusas',
        'Camisas',
        'Camisetas',
        'Malhas',
        'Saias',
        'Calças',
        'Jeans',
        'Infantil',
      ],
    },
    { name: 'Calçados', items: ['Decoração', 'Utensílios', 'Organização'] },
    { name: 'Bolsas', items: ['Decoração', 'Utensílios', 'Organização'] },
    { name: 'Acessórios', items: ['Decoração', 'Utensílios', 'Organização'] },
    { name: 'Favoritos', items: [''] },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar}>
          <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        <TouchableOpacity onPress={toggleSearch}>
          <EvilIcons name="search" size={35} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/cart')}>
          <SimpleLineIcons name="handbag" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal de Busca */}
      <Modal
        visible={searchFocused}
        animationType="fade"
        transparent={false}
        onRequestClose={closeSearch}
      >
        <View style={styles.modalContent}>
          <View style={styles.searchInputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoFocus
            />
            <TouchableOpacity onPress={closeSearch}>
              <Ionicons name="close" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons
                name="search-outline"
                size={24}
                color="#000"
                style={{ marginLeft: 12 }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.historyList}
            keyboardShouldPersistTaps="handled"
          >
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSearchQuery(item);
                  handleSearch();
                }}
              >
                <Text style={styles.historyItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Modal de Loading */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <RotatingDotsLoader />
        </View>
      </Modal>

      {/* Sidebar com animação */}
      {sidebarVisible && (
        <Modal
          visible={true}
          transparent
          animationType="none"
          onRequestClose={closeSidebar}
        >
          <TouchableOpacity
            style={styles.sidebarOverlay}
            activeOpacity={1}
            onPressOut={closeSidebar}
          >
            <Animated.View
              style={[
                styles.sidebarContainer,
                { transform: [{ translateX: sidebarAnim }] },
              ]}
            >
              <TouchableOpacity
                onPress={closeSidebar}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              {sidebarCategories.map((category, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      if (category.name === 'Favoritos') {
                        closeSidebar();
                        router.push('/favorites');
                      } else {
                        toggleCategory(category.name);
                      }
                    }}
                    style={styles.categoryButton}
                  >
                    <Text style={styles.categoryText}>{category.name}</Text>
                    {category.name !== 'Favoritos' && (
                      <AntDesign
                        name={
                          expandedCategory === category.name ? 'up' : 'down'
                        }
                        size={16}
                        color="#000"
                      />
                    )}
                  </TouchableOpacity>
                  {expandedCategory === category.name && (
                    <View style={styles.subCategoryList}>
                      {category.items.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.subCategoryItem}
                          onPress={() => {
                            closeSidebar();
                            router.push({
                              pathname: '/searchResults',
                              params: { query: item },
                            });
                          }}
                        >
                          <Text style={styles.subCategoryText}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const RotatingDotsLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.loaderContainerSmall,
        { transform: [{ rotate: rotateInterpolation }] },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: '#3DD953',
            top: 15,
            left: '50%',
            marginLeft: -2.5,
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          { backgroundColor: '#FE7ED6', bottom: 5, left: 15 },
        ]}
      />
      <View
        style={[
          styles.dot,
          { backgroundColor: '#33F3FF', bottom: 5, right: 5 },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
    marginLeft: 65,
    resizeMode: 'contain',
  },
  modalContent: {
    height: height,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  historyItem: {
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  historyList: {
    marginTop: 10,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loaderContainerSmall: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: 320,
    backgroundColor: '#fff',
    padding: 16,
    height: '100%',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  subCategoryList: {
    paddingLeft: 12,
    paddingBottom: 10,
  },
  subCategoryItem: {
    paddingVertical: 6,
  },
  subCategoryText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
  },
});

export default SearchHeader;
