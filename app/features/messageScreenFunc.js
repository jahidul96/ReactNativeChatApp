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
  setGallery,
  selectedImg,
  setSelectedImg,
) => {
  let messageData = {
    text: text,
    senderId: user.uid,
    createdAt: Date.now(),
    media: false,
    file: {
      urls: [],
      type: '',
    },
  };

  // image and text send!
  if (val == 'cameraImg') {
    setSendingPhotos(true);
    setShowCamera(false);
    const filePath = `cameraImages/${Date.now()}cameraImage.jpg`;
    // uploading image to firebase bucket
    let url = await uploadFilesToBucket(cameraTakenImage, filePath);

    messageData.file.urls = [url];
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
  } else if (val == 'gallery') {
    setSendingPhotos(true);
    setGallery(false);

    // uploading image to bucket
    let urls = [];
    for (let i = 0; i < selectedImg.length; i++) {
      const img = selectedImg[i];
      const uniqueFilePath = `galleryImages/${Date.now()}-${i}-galleryImage.jpg`;
      let url = await uploadFilesToBucket(img, uniqueFilePath);
      urls.push(url);
    }

    messageData.file.urls = urls;
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
    setSelectedImg([]);
    console.log('img added succesfully');
  } else {
    // jus text send
    if (text == '') {
      return;
    }
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
