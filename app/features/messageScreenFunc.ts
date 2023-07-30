import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {uploadFilesToBucket} from '../firebase/fbStorage';
import {
  addMessageToGroup,
  oneToOneChatMessage,
  updateGroupInfo,
} from '../firebase/fbFireStore';
import axios from 'axios';
import {userInterface} from '../utils/interfaceExports';

export const lanunchUserCamera = async (setValue: any) => {
  try {
    const result = await launchCamera({mediaType: 'photo', cameraType: 'back'});
    if (result.didCancel) {
      setValue(false);
      return;
    }

    return result.assets[0].uri;
  } catch (error: any) {
    setValue(false);
    Alert.alert(error.message);
    console.log(error.message);
  }
};

export const sendOneToOneMessage = async (
  val: string,
  text: string,
  user: userInterface,
  name: string,
  chatId: string,
  profilePic: string,
  setShowCamera: any,
  setSendingPhotos: any,
  setGallery: any,
  selectedImg: Array<string>,
  setSelectedImg: any,
  isGroupChat: boolean,
  groupMemberRealtimeInfo: Array<userInterface>,
  signleChatUserRealtimeData: userInterface,
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
      // sending pushNotificationto users
      for (const member of groupMemberRealtimeInfo) {
        SendPushNotificationToTheUser(
          member?.pushToken,
          `sent ${selectedImg.length.toString()} photo`,
          user.profilePic,
        );
      }
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

      // sending pushNotificationto user
      SendPushNotificationToTheUser(
        signleChatUserRealtimeData?.pushToken,
        `sent ${selectedImg.length.toString()} photo`,
        user.profilePic,
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

      // sending pushNotificationto users
      for (const member of groupMemberRealtimeInfo) {
        SendPushNotificationToTheUser(member?.pushToken, text, user.profilePic);
      }
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
      // sending pushNotificationto user
      SendPushNotificationToTheUser(
        signleChatUserRealtimeData?.pushToken,
        text,
        user.profilePic,
      );
    }
  }
};

const SendPushNotificationToTheUser = (
  userToken: string,
  text: string,
  profilePic: string,
) => {
  let serverKey =
    'AAAAT1Vod54:APA91bFlfCnwUj5vy-aworW_CTdHVTO-dI5gKTo-w1LCVwuRTvrApOnOpsZLyGY1Z-ti2JL1ygH8LEiMka95T0MMjbUolrk8yUdvZIK-7Tok-lj9TeAAoY62NmdAkR2Y2ljgNi3h2q5z';
  let payload = JSON.stringify({
    to: userToken,
    data: {
      title: 'ChatApp',
      body: text,
      image: profilePic,
    },
    priority: 'high',
    contentAvailable: true,
  });

  let config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization: `key=${serverKey}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  };

  axios(config)
    .then(val => {
      console.log('succes');
    })
    .catch(err => console.log(err.message));
};
