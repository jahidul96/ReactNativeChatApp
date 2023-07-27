import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {uploadFilesToBucket} from '../firebase/fbStorage';
import {oneToOneChatMessage} from '../firebase/fbFireStore';

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

export const sendOneToOneMessage = async (
  val,
  text,
  user,
  name,
  chatId,
  profilePic,
  cameraTakenImage,
  setCameraTakenImage,
  setShowCamera,
  setSendingPhotos,
) => {
  let messageData = {
    text: text,
    senderId: user.uid,
    createdAt: Date.now(),
    media: false,
    file: {
      urls: [],
      type: '',
      fileCount: 0,
    },
  };

  setSendingPhotos(true);

  setShowCamera(false);

  // image and text send!
  if (val == 'image') {
    const filePath = `cameraImages/${Date.now()}cameraImage.jpg`;
    // uploading image to firebase bucket
    let url = await uploadFilesToBucket(cameraTakenImage, filePath);

    messageData.file.urls = [url];
    messageData.file.fileCount = 1;
    messageData.file.type = 'image';
    messageData.media = true;

    oneToOneChatMessage(
      text,
      chatId,
      profilePic,
      name,
      user,
      messageData,
      true,
    );
    setSendingPhotos(false);
    setCameraTakenImage(null);
  } else {
    // jus text send
    oneToOneChatMessage(
      text,
      chatId,
      profilePic,
      name,
      user,
      messageData,
      false,
    );
  }
};
