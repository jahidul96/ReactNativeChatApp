import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {uploadFilesToBucket} from '../firebase/fbStorage';
import {
  addMessageToGroup,
  oneToOneChatMessage,
  updateGroupInfo,
} from '../firebase/fbFireStore';

export const lanunchUserCamera = async setValue => {
  try {
    const result = await launchCamera({mediaType: 'photo', cameraType: 'back'});
    if (result.didCancel) {
      setValue(false);
      return;
    }

    return result.assets[0].uri;
  } catch (error) {
    setValue(false);
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
  setShowCamera,
  setSendingPhotos,
  setGallery,
  selectedImg,
  setSelectedImg,
  isGroupChat,
) => {
  let messageData = {
    text: text,
    senderDetails: user,
    createdAt: Date.now(),
    media: false,
    isGroupChat,
    file: {
      urls: [],
      type: '',
    },
  };

  let updateGroupData = {
    lastMsg: text,
    newGroup: false,
    media: false,
    senderId: user.uid,
    updatedAt: Date.now(),
    newMessage: true,
  };
  // image and text send!
  if (val == 'image') {
    setSendingPhotos(true);
    setShowCamera(false);
    setGallery(false);

    // uploading image to bucket
    let urls = [];

    if (selectedImg.length === 1) {
      const img = selectedImg[0];
      const filePath = `galleryImages/${Date.now()}-0-galleryImage.jpg`;
      let url = await uploadFilesToBucket(img, filePath);
      urls.push(url);
    } else {
      for (let i = 0; i < selectedImg.length; i++) {
        const img = selectedImg[i];
        const filePath = `galleryImages/${Date.now()}-${i}-galleryImage.jpg`;
        let url = await uploadFilesToBucket(img, filePath);
        urls.push(url);
      }
    }

    messageData.file.urls = urls;
    messageData.file.type = 'image';
    messageData.media = true;

    if (isGroupChat) {
      updateGroupData.media = true;
      addMessageToGroup(chatId, messageData);
      updateGroupInfo(chatId, updateGroupData);
    } else {
      oneToOneChatMessage(
        text,
        chatId,
        profilePic,
        name,
        user,
        messageData,
        true,
      );
    }

    setSendingPhotos(false);
    setSelectedImg([]);
    console.log('img added succesfully');
  } else {
    // jus text send
    if (text == '') {
      return;
    }

    if (isGroupChat) {
      addMessageToGroup(chatId, messageData);
      updateGroupInfo(chatId, updateGroupData);
    } else {
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
  }
};
