import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopAppBar from '../components/TopAppBar';
import ChatComp from '../components/ChatComp';
import {AppColors} from '../utils/AppColors';
import {SizedBox} from '../components/Reuseable';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Contacts = () => {
  return (
    <View style={styles.container}>
      {/* topappBar */}
      <TopAppBar text="Contacts" />

      {/* contacts  */}
      <ScrollView style={{paddingTop: 10}} overScrollMode="never">
        {numbers.map(item => (
          <ChatComp key={item} isChat={false} />
        ))}
        <SizedBox />
      </ScrollView>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
});
