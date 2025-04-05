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
import { Ionicons, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Logo = require('../../assets/images/Logo-GreenMart.png');
const { height } = Dimensions.get('screen');

const SearchHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (searchFocused) {
          closeSearch();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [searchFocused]);

  const toggleSearch = () => {
    setSearchFocused(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 20000);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        <TouchableOpacity onPress={toggleSearch}>
          <EvilIcons name="search" size={35} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <SimpleLineIcons name="handbag" size={24} color="black" />
        </TouchableOpacity>
      </View>


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
            {searchHistory?.map((item, index) => (
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

      {/* Modal de loading */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <RotatingDotsLoader />
        </View>
      </Modal>
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
    style={[styles.loaderContainerSmall, { transform: [{ rotate: rotateInterpolation }] }]}
  >
    <View style={[styles.dot, { backgroundColor: '#3DD953', top: 15, left: '50%', marginLeft: -2.5 }]} />
    <View style={[styles.dot, { backgroundColor: '#FE7ED6', bottom: 5, left: 15 }]} />
    <View style={[styles.dot, { backgroundColor: '#33F3FF', bottom: 5, right: 5 }]} />
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
  loaderContainer: {
    width: 100,
    height: 100,
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
  loaderContainerSmall: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
});

export default SearchHeader;
