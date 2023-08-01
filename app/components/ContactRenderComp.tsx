import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {EmptyInfoComp, SizedBox} from './Reuseable';
import {goToChatFromContact} from '../features/ContactScreenFuncs';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import {userInterface} from '../utils/interfaceExports';
import ChatComp from './ChatComp';
import {getAllContacts} from '../firebase/fbFireStore';

interface contactRenderInterface {
  selectedMembers: Array<userInterface>;
  isContact: boolean;
  setSelectedMember: any;
  memberIds: Array<string>;
  setMemberIds: any;
}
const ContactRenderComp = ({
  selectedMembers,
  isContact,
  setSelectedMember,
  memberIds,
  setMemberIds,
}: contactRenderInterface) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

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
    <View>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{paddingTop: 10}} overScrollMode="never">
          {contacts.length == 0 ? (
            <EmptyInfoComp infoText="No Contacts" />
          ) : (
            contacts.map((contact: userInterface, index) => (
              <ChatComp
                isSelected={selectedMembers.includes(contact)}
                profilePic={contact.profilePic}
                username={contact.username}
                lastMsg={contact.bio}
                onLongPress={() => {}}
                onPress={() =>
                  goToChatFromContact(
                    contact,
                    isContact,
                    navigation,
                    selectedMembers,
                    setSelectedMember,
                    memberIds,
                    setMemberIds,
                  )
                }
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

export default ContactRenderComp;

const styles = StyleSheet.create({});
