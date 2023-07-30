import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import getRealtimeChats from '../../firebase/RealTimeChats';
import {
  EmptyInfoComp,
  PositionButton,
  SizedBox,
} from '../../components/Reuseable';
import {
  onLongPreesOnChat,
  onPreesOnChat,
} from '../../features/HomePageFunctions';
import ChatComp from '../../components/ChatComp';
import {chatInterface} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons} from '../../utils/IconExport';
import {AppColors} from '../../utils/AppColors';
import LoadingScreen from '../LoadingScreen';

interface chatTabinterFace {
  chats: Array<chatInterface>;
  loading: boolean;
  selectedSingleChat: Array<string>;
  selectedGroupChat: Array<string>;
  setSelectedSingleChat: any;
  setSelectedGroupChat: any;
}
const ChatTab = ({
  chats,
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
          {chats.length == 0 ? (
            <EmptyInfoComp infoText="No Chats" />
          ) : (
            <ScrollView style={styles.tabScrollStyle}>
              {chats.map((chat: chatInterface) => (
                <ChatComp
                  isSelected={selectedSingleChat.includes(chat.chatterId)}
                  key={chat.chatterId}
                  profilePic={chat.chatterProfilePic}
                  username={chat.chatterName}
                  msgTime={chat.updatedAt}
                  lastMsg={chat.media ? 'Photo' : chat.lastMsg}
                  onLongPress={() =>
                    onLongPreesOnChat(
                      'singleChat',
                      chat.chatterId,
                      selectedGroupChat,
                      selectedSingleChat,
                      setSelectedSingleChat,
                      setSelectedGroupChat,
                    )
                  }
                  onPress={() => {
                    if (selectedSingleChat.includes(chat.chatterId)) {
                      setSelectedSingleChat(
                        selectedSingleChat.filter(
                          sChat => sChat != chat.chatterId,
                        ),
                      );
                      return;
                    }
                    onPreesOnChat(chat, user, navigation);
                  }}
                  newMessage={chat.newMessage}
                />
              ))}
              <SizedBox extraStyle={{height: 30}} />
            </ScrollView>
          )}

          <PositionButton
            onPress={() => navigation.navigate('Contacts', {isContact: true})}
            children={
              <MaterialIcons name="message" color={AppColors.WHITE} size={22} />
            }
          />
        </>
      )}
    </View>
  );
};

export default ChatTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScrollStyle: {
    paddingTop: 5,
  },
});
