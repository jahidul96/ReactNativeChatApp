import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {userInterface} from '../../utils/interfaceExports';
import {AppColors} from '../../utils/AppColors';
import TopAppBar from '../../components/TopAppBar';
import {useNavigation} from '@react-navigation/native';
import {getAllContacts, updateGroupInfo} from '../../firebase/fbFireStore';
import {
  EmptyInfoComp,
  PositionButton,
  SizedBox,
} from '../../components/Reuseable';
import LoadingScreen from '../LoadingScreen';
import ChatComp from '../../components/ChatComp';
import {goToChatFromContact} from '../../features/ContactScreenFuncs';

import {AntDesign} from '../../utils/IconExport';
import AnimatedAddMember from '../../components/AnimatedAddMember';
import {Alert} from 'react-native';
import {displayNotifeeMessage} from '../../features/notificationServices';

interface addnewGroupInterface {
  route: {
    params: {
      membersId: Array<string>;
      memberDetails: Array<userInterface>;
      groupId: string;
    };
  };
}
const AddNewGroupMember = ({route}: addnewGroupInterface) => {
  const {memberDetails, membersId, groupId} = route.params;
  const [alreadyAddedMember, setAlreadyAddedMember] = useState(memberDetails);
  const [tempMembersId, setTempMembersId] = useState(membersId);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  //   console.log(alreadyAddedMember);

  const onPressAddnewContact = (contact: userInterface) => {
    if (memberDetails.some(val => val.uid == contact.uid)) {
      return Alert.alert('Already added');
    } else {
      goToChatFromContact(
        contact,
        false,
        navigation,
        alreadyAddedMember,
        setAlreadyAddedMember,
        tempMembersId,
        setTempMembersId,
      );
    }
  };

  const addNewGrpMember = () => {
    if (addNewGrpMember.length >= 5) {
      return Alert.alert('just five for now');
    }
    let updatedData = {
      memberIds: tempMembersId,
      memberDetails: alreadyAddedMember,
    };
    updateGroupInfo(groupId, updatedData);
    navigation.navigate('Home');
    displayNotifeeMessage('Chatapp', 'Added new member to the group');
  };
  useEffect(() => {
    getAllContacts()
      .then(data => {
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
      <TopAppBar text="Add new Member" profie />

      {/* if selected Members lenght exists  */}
      <AnimatedAddMember
        membersId={tempMembersId}
        selectedMembers={alreadyAddedMember}
      />

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
                isSelected={alreadyAddedMember.some(
                  val => val.uid == contact.uid,
                )}
                profilePic={contact.profilePic}
                username={contact.username}
                lastMsg={contact.bio}
                onLongPress={() => {}}
                onPress={() => onPressAddnewContact(contact)}
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
        onPress={addNewGrpMember}
        children={<AntDesign name="plus" color={AppColors.WHITE} size={25} />}
      />
    </View>
  );
};

export default AddNewGroupMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
});
