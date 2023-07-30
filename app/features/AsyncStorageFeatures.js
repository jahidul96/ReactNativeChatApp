import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
