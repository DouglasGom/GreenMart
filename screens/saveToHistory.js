import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToHistory = async (product) => {
  try {
    const storedHistory = await AsyncStorage.getItem('history');
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    const updatedHistory = [product, ...history.filter(item => item.id !== product.id)];
    await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Erro ao salvar no histórico:', error);
  }
};
