import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useContext} from 'react';
import {
  EmptyInfoComp,
  PositionButton,
  SizedBox,
} from '../../components/Reuseable';
import {
  goToGroupChat,
  onLongPreesOnChat,
  onPreesOnChat,
} from '../../features/HomePageFunctions';
import ChatComp from '../../components/ChatComp';
import {groupChatInterface} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {useNavigation} from '@react-navigation/native';
import getGroupsChats from '../../firebase/GetGroupsChats';
import {AntDesign} from '../../utils/IconExport';
import {AppColors} from '../../utils/AppColors';
import LoadingScreen from '../LoadingScreen';
import moment from 'moment';

interface chatTabinterFace {
  groupChats: Array<groupChatInterface>;
  loading: boolean;
  selectedSingleChat: Array<string>;
  selectedGroupChat: Array<string>;
  setSelectedSingleChat: any;
  setSelectedGroupChat: any;
}
const GroupTab = ({
  groupChats,
  loading,
  selectedSingleChat,
  selectedGroupChat,
  setSelectedSingleChat,
  setSelectedGroupChat,
}: chatTabinterFace) => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {groupChats.length == 0 ? (
            <EmptyInfoComp infoText="No Chats" />
          ) : (
            <ScrollView style={styles.tabScrollStyle}>
              {groupChats.map((group: groupChatInterface) => (
                <ChatComp
                  key={group.groupId}
                  isSelected={selectedGroupChat.includes(group.groupId)}
                  profilePic={group.groupProfilePic}
                  username={group.groupName}
                  msgTime={group.updatedAt}
                  lastMsg={
                    group.media
                      ? 'Photo'
                      : group.lastMsg == ''
                      ? 'welcome new Group'
                      : group.lastMsg
                  }
                  onLongPress={() => {
                    if (user?.uid != group.adminDetails.uid) {
                      return Alert.alert(
                        "You Can't Delete The group! You are not admin",
                      );
                    }
                    onLongPreesOnChat(
                      'groupChat',
                      group.groupId,
                      selectedGroupChat,
                      selectedSingleChat,
                      setSelectedSingleChat,
                      setSelectedGroupChat,
                    );
                  }}
                  onPress={() => {
                    if (selectedGroupChat.includes(group.groupId)) {
                      setSelectedGroupChat(
                        selectedGroupChat.filter(
                          sgChat => sgChat != group.groupId,
                        ),
                      );
                      return;
                    }
                    goToGroupChat(group, navigation, user);
                  }}
                  newMessage={
                    group.senderId != user?.uid &&
                    !group.seenBy.includes(user?.uid)
                      ? true
                      : false
                  }
                />
              ))}
              <SizedBox extraStyle={{height: 30}} />
            </ScrollView>
          )}

          <PositionButton
            onPress={() => navigation.navigate('Contacts', {isContact: false})}
            children={
              <AntDesign name="plus" color={AppColors.WHITE} size={22} />
            }
          />
        </>
      )}
    </View>
  );
};

export default GroupTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScrollStyle: {
    paddingTop: 5,
  },
});
