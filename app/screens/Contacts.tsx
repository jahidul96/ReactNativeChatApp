import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopAppBar from '../components/TopAppBar';
import ChatComp from '../components/ChatComp';
import {AppColors} from '../utils/AppColors';
import {EmptyInfoComp, SizedBox} from '../components/Reuseable';
import {getAllContacts} from '../firebase/fbFireStore';
import {userInterface} from '../utils/interfaceExports';
import LoadingScreen from './LoadingScreen';
import {useNavigation} from '@react-navigation/native';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  // onprees on chat
  const onPreesOnChat = (contact: userInterface) => {
    navigation.navigate('MessageScreen', {
      isGroupChat: false,
      profilePic: contact.profilePic,
      name: contact.username,
      chatId: contact.uid,
    });
  };

  useEffect(() => {
    getAllContacts()
      .then(data => {
        // console.log('this is from contact', data);
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);
  return (
    <View style={styles.container}>
      {/* topappBar */}
      <TopAppBar text="Contacts" />

      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{paddingTop: 10}} overScrollMode="never">
          {contacts.length == 0 ? (
            <EmptyInfoComp infoText="No Contacts" />
          ) : (
            contacts.map((contact: userInterface, index) => (
              <ChatComp
                profilePic={contact.profilePic}
                username={contact.username}
                lastMsg={contact.bio}
                onLongPress={() => {}}
                onPress={() => onPreesOnChat(contact)}
                key={index}
                isChat={false}
              />
            ))
          )}

          <SizedBox />
        </ScrollView>
      )}
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
