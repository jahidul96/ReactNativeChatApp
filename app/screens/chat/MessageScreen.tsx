import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import TopAppBar from '../../components/TopAppBar';
import Footer from './Footer';
import {AppColors} from '../../utils/AppColors';
import AnimatedFileModal from '../../components/AnimatedFileModal';
import {messageData} from '../../data/messageData';
import MessageComp from './MessageComp';
import {SizedBox} from '../../components/Reuseable';

const MessageScreen = () => {
  const [value, setValue] = useState();
  const [showFileModal, setShowFileModal] = useState(false);

  const onPreesFile = () => {
    setShowFileModal(!showFileModal);
  };

  return (
    <View style={styles.container}>
      {/* topAppBar */}
      <TopAppBar back message />

      {/* message section */}
      <ScrollView style={styles.textContainer}>
        <SizedBox />
        {messageData.map((message, index) => (
          <MessageComp message={message} key={index} />
        ))}
      </ScrollView>

      {/* file modal */}
      <AnimatedFileModal showFileModal={showFileModal} />

      {/* footer section */}
      <Footer setValue={setValue} value={value} onPreesFile={onPreesFile} />
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
