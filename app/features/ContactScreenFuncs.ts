import {Alert} from 'react-native';
import {userInterface} from '../utils/interfaceExports';

// onprees on chat
export const goToChatFromContact = (
  contact: userInterface,
  isContact: boolean,
  navigation: any,
  selectedMembers: Array<userInterface | []>,
  setSelectedMember: any,
  memberIds: Array<string>,
  setMemberIds: any,
) => {
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
      setSelectedMember((prevState: any) => [...prevState, contact]);
      setMemberIds((prevState: any) => [...prevState, contact.uid]);
    }
  }
};

export const gotoAddGroupScreen = (
  selectedMembers: Array<userInterface | []>,
  memberIds: Array<string>,
  navigation: any,
) => {
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
