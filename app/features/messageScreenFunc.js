import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Alert} from 'react-native';

export const lanunchUserCamera = async setValue => {
  try {
    const result = await launchCamera({mediaType: 'photo', cameraType: 'back'});
    if (result.didCancel) {
      setValue(false);
      return;
    }

    return result.assets[0].uri;
  } catch (error) {
    Alert.alert(error.message);
    console.log(error.message);
  }
};
