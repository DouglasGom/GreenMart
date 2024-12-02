import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Platform, ActionSheetIOS } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const ProfileScreen = ({ userEmail }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [profilePic, setProfilePic] = useState(require('../assets/default-avatar.png'));
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    address: '',
  });
  const [showFields, setShowFields] = useState({
    name: false,
    email: false,
    cpf: false,
    password: false,
    address: false,
  });

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedProfilePic = await AsyncStorage.getItem('profilePic');
        if (savedProfilePic) {
          setProfilePic({ uri: savedProfilePic });
        }

        const response = await fetch(`http://192.168.1.5:3000/perfil?email=${userEmail}`);
        const data = await response.json();

        setInputs({
          name: data.nome_usuario,
          email: data.email,
          cpf: data.cpf,
          password: '********',
          address: data.endereco_fisico,
        });
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadProfileData();
  }, [userEmail]);

  const handleToggleVisibility = (field) => {
    setShowFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleEditToggle = () => {
    if (isEditable) {
      fetch('http://192.168.1.3:3000/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((data) => {
          Alert.alert('Sucesso', 'As informações foram salvas.');
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível salvar as informações.');
        });
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeProfilePicture = async () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Escolher da Galeria', 'Tirar uma Foto', 'Cancelar'],
          cancelButtonIndex: 2,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setProfilePic({ uri });
              await AsyncStorage.setItem('profilePic', uri);
            }
          } else if (buttonIndex === 1) {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setProfilePic({ uri });
              await AsyncStorage.setItem('profilePic', uri);
            }
          }
        }
      );
    } else {
      Alert.alert(
        'Alterar Foto',
        'Escolha uma opção:',
        [
          {
            text: 'Escolher da Galeria',
            onPress: async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });
              if (!result.canceled) {
                const uri = result.assets[0].uri;
                setProfilePic({ uri });
                await AsyncStorage.setItem('profilePic', uri); 
              }
            },
          },
          {
            text: 'Tirar uma Foto',
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });
              if (!result.canceled) {
                const uri = result.assets[0].uri;
                setProfilePic({ uri });
                await AsyncStorage.setItem('profilePic', uri); 
              }
            },
          },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profilePic} style={styles.profileImage} />
        <TouchableOpacity style={styles.editProfileButton} onPress={handleChangeProfilePicture}>
          <Text style={styles.editProfileText}>Editar Foto</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>MEU PERFIL</Text>
      {Object.keys(inputs).map((field) => (
        <View key={field} style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isEditable && styles.editableInput]}
            value={isEditable ? inputs[field] : (showFields[field] ? inputs[field] : '********')}
            onChangeText={(value) => handleInputChange(field, value)}
            editable={isEditable}
            secureTextEntry={!showFields[field] && !isEditable}
          />
          {!isEditable && (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => handleToggleVisibility(field)}
            >
              <Image
                source={showFields[field]
                  ? require('../assets/olho1.png') 
                  : require('../assets/olho2.png')} 
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
        <Text style={styles.editButtonText}>{isEditable ? 'Salvar' : 'Editar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    marginTop: 50,
  },
  editProfileButton: {
    backgroundColor: '#0CD028',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  editProfileText: {
    color: 'black',
    fontFamily: 'Poppins-Bold'
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    fontSize: 16,
  },
  editableInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  eyeButton: {
    marginLeft: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  editButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
});

export default ProfileScreen;
