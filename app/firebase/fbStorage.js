import storage from '@react-native-firebase/storage';

export const uploadFilesToBucket = async (file, filePath) => {
  try {
    const ref = storage().ref(filePath);
    await ref.putFile(file);
    const url = await ref.getDownloadURL();
    // console.log(url);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
