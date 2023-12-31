import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import React, {useContext, useState, useEffect, createRef} from 'react';
import TopAppBar from '../../components/TopAppBar';
import Footer from './Footer';
import {AppColors} from '../../utils/AppColors';
import AnimatedFileModal from '../../components/AnimatedFileModal';

import MessageComp from './MessageComp';
import {
  EmptyInfoComp,
  ShowMoreComp,
  SizedBox,
} from '../../components/Reuseable';
import {
  messageInterface,
  messageScreenParams,
  userInterface,
} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {getUserData, oneToOneChatMessage} from '../../firebase/fbFireStore';
import getOneToOneMessages from '../../firebase/RealTimeOneToOneMessages';
import LoadingScreen from '../LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {
  lanunchUserCamera,
  sendOneToOneMessage,
} from '../../features/messageScreenFunc';
import CameraImageModal from './CameraImageModal';
import {PhotoPlacehoderComp} from './ChatReusableComp';
import GalleryModal from './GalleryModal';
import {uploadFilesToBucket} from '../../firebase/fbStorage';
import getGroupMessages from '../../firebase/GetGroupMessages';
import {hasAndroidPermission} from '../../features/AppPermisionEtc';
import {
  getPhotosFromStorage,
  getUserPhoto,
} from '../../features/GetStorageData';

interface routeParams {
  route: {
    params: messageScreenParams;
  };
}
const MessageScreen = ({route}: routeParams) => {
  const navigation = useNavigation<any>();
  const [text, setText] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const {user, storagePermission, setStoragePermision, setGalleryPhotos} =
    useContext(AppContext);
  const {
    isGroupChat,
    profilePic,
    name,
    chatId,
    membersId,
    adminDetails,
    memberDetails,
  } = route.params;
  const [loading, setLoading] = useState(true);
  const chatMessages = getOneToOneMessages(chatId);
  const groupMessages = getGroupMessages(chatId);
  const [showCamera, setShowCamera] = useState(false);
  const [sendingPhotos, setSendingPhotos] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [selectedImg, setSelectedImg] = useState<Array<string>>([]);
  const scrollRef = createRef<ScrollView>();
  const [groupMemberRealtimeInfo, setGroupMemberRealtimeInfo] = useState<
    Array<userInterface>
  >([]);
  const [signleChatUserRealtimeData, setSingleChatUserRealtimeData] =
    useState<userInterface>();
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  // console.log('membersIds', membersId);
  // console.log('stroage permission', storagePermission);

  const sendMessage = async (val: string) => {
    sendOneToOneMessage(
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
      groupMemberRealtimeInfo!,
      signleChatUserRealtimeData!,
    );
    setText('');
  };

  const gotoDetails = () => {
    if (isGroupChat) {
      navigation.navigate('ChatDetails', {
        isGroupChat: isGroupChat,
        memberDetails: memberDetails,
        memberIds: membersId,
        groupImage: profilePic,
        groupName: name,
        adminDetails: adminDetails,
        chatMedia: groupMessages.filter(
          (message: messageInterface) => message.file.urls.length !== 0,
        ),
        chatId: chatId,
      });
    } else {
      navigation.navigate('ChatDetails', {
        isGroupChat: isGroupChat,
        chatDetails: signleChatUserRealtimeData,
        chatMedia: chatMessages.filter(
          (message: messageInterface) => message.file.urls.length !== 0,
        ),
        chatId: chatId,
      });
    }
  };
  const onPressOnCameraIcon = async () => {
    setShowCamera(!showCamera);
    lanunchUserCamera(setShowCamera).then(result => {
      // setCameraTakenImage(result);
      setSelectedImg((prevImg: any) => [...prevImg, result]);
    });
  };

  const goToMedia = (text: string) => {
    // getting camera image
    if (text == 'Camera') {
      setShowFileModal(!showFileModal);
      setShowCamera(!showCamera);
      lanunchUserCamera(setShowCamera).then(result => {
        setSelectedImg((prevImg: any) => [...prevImg, result]);
      });
    } else if (text == 'Gallery') {
      setShowFileModal(!showFileModal);
      setGallery(!gallery);
    } else {
      Alert.alert('Not Done Yet!!!!');
    }
  };

  const getRealtimeUserInfo = async () => {
    if (isGroupChat) {
      let tempMembers = membersId.filter(id => id != user.uid);
      let users = [];
      for (const id of tempMembers) {
        let user = await getUserData(id);
        users.push(user.data());
      }
      // console.log('with current user', users);
      setGroupMemberRealtimeInfo(users);
    } else {
      let user = await getUserData(chatId);
      setSingleChatUserRealtimeData(user.data());
    }
  };

  useEffect(() => {
    if (!storagePermission) {
      hasAndroidPermission()
        .then(val => {
          setStoragePermision(val);
          getUserPhoto(setGalleryPhotos);
        })
        .catch(err => setStoragePermision(false));
    }
    getRealtimeUserInfo();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      {/* topAppBar */}
      <TopAppBar
        back
        message
        name={name}
        profilePic={profilePic}
        onPressDetails={gotoDetails}
        onPressonMore={() => setShowMoreBtn(!showMoreBtn)}
      />

      {/* showMoreBtn */}
      {showMoreBtn && (
        <ShowMoreComp
          btnText="Details"
          onPrees={() => {
            setShowMoreBtn(!showMoreBtn);
            gotoDetails();
          }}
        />
      )}

      {/* message section */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          style={styles.textContainer}
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({animated: true})
          }>
          <SizedBox />
          {isGroupChat ? (
            groupMessages.length == 0 ? (
              <EmptyInfoComp infoText="No Messages" />
            ) : (
              groupMessages.map((message: messageInterface, index) => (
                <MessageComp
                  key={index}
                  message={message}
                  isGroupChat={isGroupChat}
                />
              ))
            )
          ) : chatMessages.length == 0 ? (
            <EmptyInfoComp infoText="No Messages" />
          ) : (
            chatMessages.map((message: messageInterface, index) => (
              <MessageComp
                key={index}
                message={message}
                isGroupChat={isGroupChat}
              />
            ))
          )}

          {/* photoplaceHolder */}
          {sendingPhotos && <PhotoPlacehoderComp photos={selectedImg} />}
        </ScrollView>
      )}

      {/* file modal */}
      <AnimatedFileModal
        showFileModal={showFileModal}
        onMediaPress={goToMedia}
      />

      {/* footer section */}
      <Footer
        setValue={setText}
        value={text}
        onPreesFile={() => setShowFileModal(!showFileModal)}
        onSend={() => sendMessage('text')}
        onPressCamera={onPressOnCameraIcon}
      />

      {/* camera image modal */}
      {showCamera && (
        <CameraImageModal
          visible={showCamera}
          onRequestClose={() => setShowCamera(!showCamera)}
          imgUrl={selectedImg[0]!}
          name={name}
          onPress={() => sendMessage('image')}
        />
      )}

      {/* gallery pick image modal */}

      {gallery && (
        <GalleryModal
          visible={gallery}
          onRequestClose={() => setGallery(!gallery)}
          name={name}
          onPress={() => sendMessage('image')}
          setVisiable={setGallery}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      )}
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  textContainer: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
});
