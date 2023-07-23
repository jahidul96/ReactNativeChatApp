import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import TopAppBar from '../../components/TopAppBar';
import Footer from './Footer';
import {AppColors} from '../../utils/AppColors';
import AnimatedFileModal from '../../components/AnimatedFileModal';

const Message = () => {
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
      <ScrollView style={styles.textContainer}></ScrollView>

      {/* file modal */}
      <AnimatedFileModal showFileModal={showFileModal} />

      {/* footer section */}
      <Footer setValue={setValue} value={value} onPreesFile={onPreesFile} />
    </View>
  );
};

export default Message;

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
