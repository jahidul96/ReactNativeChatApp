import {ScrollView, StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopAppBar from '../components/TopAppBar';
import ChatComp from '../components/ChatComp';
import {AppColors} from '../utils/AppColors';
import {EmptyInfoComp, PositionButton, SizedBox} from '../components/Reuseable';
import {getAllContacts} from '../firebase/fbFireStore';
import {userInterface} from '../utils/interfaceExports';
import LoadingScreen from './LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '../utils/IconExport';
import {WIDTH} from '../utils/AppDimension';

interface contactInterface {
  route: {
    params: {
      isContact: boolean;
    };
  };
}

const Contacts = ({route}: contactInterface) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const {isContact} = route.params;
  const [selectedMembers, setSelectedMember] = useState<
    Array<userInterface | []>
  >([]);
  const [memberIds, setMemberIds] = useState<Array<string>>([]);

  // onprees on chat
  const onPreesOnChat = (contact: userInterface, isContact: boolean) => {
    if (isContact) {
      navigation.navigate('MessageScreen', {
        isGroupChat: false,
        profilePic: contact.profilePic,
        name: contact.username,
        chatId: contact.uid,
      });
    } else {
      const isExist = selectedMembers.includes(contact);
      if (isExist) {
        setSelectedMember(
          selectedMembers.filter((member: any) => member.uid != contact.uid),
        );
        setMemberIds(memberIds.filter(id => id != contact.uid));
      } else {
        if (selectedMembers.length >= 6) {
          return Alert.alert('For now just 6 members');
        }
        setSelectedMember(prevState => [...prevState, contact]);
        setMemberIds(prevState => [...prevState, contact.uid]);
      }
    }
  };

  const gotoAddGroupScreen = () => {
    if (selectedMembers.length == 0 && memberIds.length == 0) {
      return Alert.alert('Add member first! Tap on Contact to select members');
    }
    if (selectedMembers.length < 2) {
      return Alert.alert('for two person no need to create group');
    }
    navigation.navigate('CreateGroup', {
      memberIds: memberIds,
      selectedMembers: selectedMembers,
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
      <TopAppBar
        text={isContact ? 'Contacts' : 'Create Group'}
        profie={isContact ? false : true}
      />

      {/* selected Members  */}
      {selectedMembers.length > 0 && (
        <View style={styles.memberContainer}>
          {selectedMembers.map((member: any, index: number) => (
            <Image
              key={index}
              source={{uri: member.profilePic}}
              style={styles.memberAvatorStyle}
            />
          ))}
        </View>
      )}

      {/* contacts render */}
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
                onPress={() => onPreesOnChat(contact, isContact)}
                key={index}
                isChat={false}
              />
            ))
          )}

          <SizedBox />
        </ScrollView>
      )}

      {/* create groupBtn */}
      <PositionButton
        onPress={gotoAddGroupScreen}
        children={
          <AntDesign name="arrowright" color={AppColors.WHITE} size={25} />
        }
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },

  memberContainer: {
    width: WIDTH,
    height: 80,
    backgroundColor: AppColors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: AppColors.GREY,
    borderBottomWidth: 1,
  },

  memberAvatorStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.WHITE,
    marginRight: 6,
  },
});
