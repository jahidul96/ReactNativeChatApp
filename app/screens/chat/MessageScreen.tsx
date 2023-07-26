import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import React, {useContext, useState, useEffect, createRef} from 'react';
import TopAppBar from '../../components/TopAppBar';
import Footer from './Footer';
import {AppColors} from '../../utils/AppColors';
import AnimatedFileModal from '../../components/AnimatedFileModal';

import MessageComp from './MessageComp';
import {EmptyInfoComp, SizedBox} from '../../components/Reuseable';
import {
  messageInterface,
  messageScreenParams,
} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {oneToOneChatMessage} from '../../firebase/fbFireStore';
import getOneToOneMessages from '../../firebase/RealTimeOneToOneMessages';
import LoadingScreen from '../LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {lanunchUserCamera} from '../../features/messageScreenFunc';
import CameraImageModal from './CameraImageModal';
import {uploadFilesToBucket} from '../../firebase/fbStorage';

interface routeParams {
  route: {
    params: messageScreenParams;
  };
}
const MessageScreen = ({route}: routeParams) => {
  const [text, setText] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const {user} = useContext(AppContext);
  const {isGroupChat, profilePic, name, chatId} = route.params;
  const [loading, setLoading] = useState(true);
  const chatMessages = getOneToOneMessages(chatId);
  const navigation = useNavigation<any>();
  const [showCamera, setShowCamera] = useState(false);
  const [cameraTakenImage, setCameraTakenImage] = useState<string | null>();
  const scrollRef = createRef<ScrollView>();

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
  const sendMessage = async (val: string) => {
    if (val == 'image') {
      console.log('camera image');

      const filePath = `cameraImages/${Date.now()}cameraImage.jpg`;
      // uploading image to firebase bucket
      let url = await uploadFilesToBucket(cameraTakenImage, filePath);

      messageData.file.urls = [url];
      messageData.file.fileCount = 1;
      messageData.file.type = 'image';
      messageData.media = true;
      setShowCamera(false);
      oneToOneChatMessage(
        text,
        chatId,
        profilePic,
        name,
        user,
        messageData,
        true,
      );
      setText('');
      setCameraTakenImage(null);
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
      setText('');
    }

    // console.log('message send and chat added!');
  };

  // onPress cameraIcon
  const onPressOnCameraIcon = async () => {
    setShowCamera(!showCamera);
    lanunchUserCamera(setShowCamera).then(result => {
      setCameraTakenImage(result);
    });
  };

  const goToMedia = (text: string) => {
    if (text == 'Camera') {
      setShowFileModal(!showFileModal);
      setShowCamera(!showCamera);
      lanunchUserCamera(setShowCamera).then(result => {
        setCameraTakenImage(result);
      });
    } else {
      Alert.alert('Not Done Yet!!!!');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      {/* topAppBar */}
      <TopAppBar back message name={name} profilePic={profilePic} />

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
          {chatMessages.length == 0 ? (
            <EmptyInfoComp infoText="No Messages" />
          ) : (
            chatMessages.map((message: messageInterface, index) => (
              <MessageComp key={index} message={message} />
            ))
          )}
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
          setVisiable={setShowCamera}
          imgUrl={cameraTakenImage!}
          name={name}
          onPress={() => sendMessage('image')}
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
