import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Image, TextInput, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/Logo-GreenMart.png';

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

export default function VideoDetailScreen({ route, navigation }) {
  const { video } = route.params;

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(1)).current;

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
    setPlaybackPosition(status.positionMillis);
    setPlaybackDuration(status.durationMillis);
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
    showControls();
  };

  const handleRewind = () => {
    videoRef.current.setPositionAsync(playbackPosition - 10000);
    showControls();
  };

  const handleForward = () => {
    videoRef.current.setPositionAsync(playbackPosition + 10000);
    showControls();
  };

  const handleSliderChange = (value) => {
    videoRef.current.setPositionAsync(value);
    showControls();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${video.nome} - ${video.descricao}`,
        url: video.video_url,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleControls = () => {
    if (controlsVisible) {
      hideControls();
    } else {
      showControls();
    }
  };

  const showControls = () => {
    setControlsVisible(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    hideControlsAfterTimeout();
  };

  const hideControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setControlsVisible(false));
  };

  const hideControlsAfterTimeout = () => {
    setTimeout(() => {
      hideControls();
    }, 3000); 
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <TouchableOpacity style={styles.videoContainer} onPress={toggleControls}>
        <Video
          ref={videoRef}
          source={{ uri: video.video_url }}
          style={styles.video}
          useNativeControls={false}
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          rate={videoSpeed}
        />

        {controlsVisible && (
          <>
            <View style={styles.overlay} />
            <Animated.View style={[styles.controlsOverlay, { opacity: controlsOpacity }]}>
              <TouchableOpacity onPress={handleRewind} style={styles.controlButton}>
                <Ionicons name="play-back" size={36} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
                <Ionicons name="play-forward" size={36} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}

        <Slider
          style={styles.progressSlider}
          minimumValue={0}
          maximumValue={playbackDuration}
          value={playbackPosition}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#0CD028"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="#0CD028"
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{video.nome}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{video.descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
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
    fontFamily: 'Poppins-Regular',
  },

  videoContainer: { 
    position: 'relative', 
    width: '100%', 
    height: 220, 
    backgroundColor: 'black' 
  },

  video: { 
    width: '100%', 
    height: '100%' 
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  controlsOverlay: { 
    position: 'absolute', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    height: '100%' 
  },

  controlButton: { 
    marginHorizontal: 20 
  },

  progressSlider: { 
    position: 'absolute', 
    bottom: 10, 
    width: '90%', 
    alignSelf: 'center' 
  },

  infoContainer: { 
    padding: 20 
  },

  titleContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },

  title: { 
    fontSize: 20, 
    fontFamily: 'Poppins-Bold', 
    flex: 1, 
    marginRight: 10 
  },

  description: { 
    fontSize: 16, 
    color: '#666', 
    marginTop: 10, 
    fontFamily: 'Poppins-Regular' 
  },

  shareButton: { 
    padding: 5 
  },
});
