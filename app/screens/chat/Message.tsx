import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import TopAppBar from '../../components/TopAppBar';
import Footer from './Footer';
import {AppColors} from '../../utils/AppColors';

const Message = () => {
  const [value, setValue] = useState();
  return (
    <View style={styles.container}>
      {/* topAppBar */}
      <TopAppBar back message />

      {/* message section */}
      <ScrollView style={styles.textContainer}></ScrollView>

      {/* footer section */}
      <Footer setValue={setValue} value={value} />
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
