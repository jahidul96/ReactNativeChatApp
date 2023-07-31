import {useAnimatedScrollHandler} from 'react-native-reanimated';
import {updateGroupInfo, updateSeenStatus} from '../firebase/fbFireStore';

import {
  chatInterface,
  groupChatInterface,
  userInterface,
} from '../utils/interfaceExports';
import {Alert} from 'react-native';

// onprees on chat
export const onPreesOnChat = (
  chat: chatInterface,
  user: userInterface,
  navigation: any,
) => {
  if (chat.newMessage) {
    console.log(chat.newMessage);
    updateSeenStatus(user.uid, chat.chatterId);
  }
  navigation.navigate('MessageScreen', {
    isGroupChat: false,
    profilePic: chat.chatterProfilePic,
    name: chat.chatterName,
    chatId: chat.chatterId,
  });
};

export const goToGroupChat = (
  group: groupChatInterface,
  navigation: any,
  user: userInterface,
) => {
  if (!group.seenBy.includes(user.uid)) {
    updateGroupInfo(group.groupId, {seenBy: [user.uid]});
  }
  navigation.navigate('MessageScreen', {
    isGroupChat: true,
    profilePic: group.groupProfilePic,
    name: group.groupName,
    chatId: group.groupId,
    membersId: group.memberIds.filter(id => id != user.uid),
    adminDetails: group.adminDetails,
  });
};

export const onLongPreesOnChat = (
  text: string,
  id: string,
  selectedGroupChat: Array<string>,
  selectedSingleChat: Array<string>,
  setSelectedSingleChat: any,
  setSelectedGroupChat: any,
) => {
  if (text == 'singleChat') {
    if (selectedGroupChat.length > 0) {
      return Alert.alert('Delete selected group or unselect them!!');
    }
    const isExist = selectedSingleChat.includes(id);
    if (isExist) {
      setSelectedSingleChat(selectedSingleChat.filter(chatId => chatId != id));
    } else {
      setSelectedSingleChat((prev: string) => [...prev, id]);
    }
  } else {
    if (selectedSingleChat.length > 0) {
      return Alert.alert('Delete selected chat or unselect them!!');
    }
    const isExist = selectedGroupChat.includes(id);
    if (isExist) {
      setSelectedGroupChat(selectedGroupChat.filter(chatId => chatId != id));
    } else {
      setSelectedGroupChat((prev: string) => [...prev, id]);
    }
  }
};
