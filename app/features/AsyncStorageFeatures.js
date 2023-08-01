import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOnboardStatus = async () => {
  try {
    const value = await AsyncStorage.getItem('firstrun');
    return value;
  } catch (e) {
    // error reading value
  }
};
