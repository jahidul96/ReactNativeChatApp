import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
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

interface routeParams {
  route: {
    params: messageScreenParams;
  };
}
const MessageScreen = ({route}: routeParams) => {
  const [value, setValue] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const {user} = useContext(AppContext);
  const {isGroupChat, profilePic, name, chatId} = route.params;
  const [loading, setLoading] = useState(true);
  const chatsMessages = getOneToOneMessages(chatId);

  const onPreesFile = () => {
    setShowFileModal(!showFileModal);
  };

  const sendMessage = () => {
    oneToOneChatMessage(value, chatId, profilePic, name, user);
    setValue('');
    // console.log('message send and chat added!');
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
        <ScrollView style={styles.textContainer}>
          <SizedBox />
          {chatsMessages.length == 0 ? (
            <EmptyInfoComp infoText="No Messages" />
          ) : (
            chatsMessages.map((message: messageInterface, index) => (
              <MessageComp key={index} message={message} />
            ))
          )}
        </ScrollView>
      )}

      {/* file modal */}
      <AnimatedFileModal showFileModal={showFileModal} />

      {/* footer section */}
      <Footer
        setValue={setValue}
        value={value}
        onPreesFile={onPreesFile}
        onSend={sendMessage}
      />
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
