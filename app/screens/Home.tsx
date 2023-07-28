import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  NativeScrollEvent,
  Pressable,
  Alert,
} from 'react-native';
import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {useNavigation} from '@react-navigation/native';
import TopAppBar from '../components/TopAppBar';
import {AppColors} from '../utils/AppColors';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {tabData} from '../data/smallData';
import Tab from '../components/Tab';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import ChatComp from '../components/ChatComp';
import {
  DeleteComp,
  EmptyInfoComp,
  PositionButton,
  ShowMoreComp,
  SizedBox,
} from '../components/Reuseable';
import {AntDesign, MaterialIcons} from '../utils/IconExport';
import {
  deleteGroupFromFb,
  deleteMessageChat,
  getUserData,
  updateSeenStatus,
} from '../firebase/fbFireStore';
import {AppContext} from '../context/AppContext';
import LoadingScreen from './LoadingScreen';
import {chatInterface, groupChatInterface} from '../utils/interfaceExports';
import getRealtimeChats from '../firebase/RealTimeChats';
import getGroupsChats from '../firebase/GetGroupsChats';
import {
  goToGroupChat,
  onLongPreesOnChat,
  onPreesOnChat,
} from '../features/HomePageFunctions';

const Home = () => {
  const navigation = useNavigation<any>();
  const translateX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [showMore, setShowMore] = useState(false);
  const {setUser} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const chats = getRealtimeChats();
  const groupChats = getGroupsChats();
  const {user} = useContext(AppContext);
  const [selectedSingleChat, setSelectedSingleChat] = useState<Array<string>>(
    [],
  );
  const [selectedGroupChat, setSelectedGroupChat] = useState<Array<string>>([]);

  // onScrollEvent function
  const onScrollEvent = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      translateX.value = event.contentOffset.x;
    },
  });

  // change tab on click
  const changeTab = useCallback((text: string) => {
    if (text == 'Chat') {
      scrollRef?.current?.scrollTo({x: 0});
    } else {
      scrollRef?.current?.scrollTo({x: WIDTH});
    }
  }, []);

  // get Active Tab value
  const activeTab = useDerivedValue(() => {
    return Math.round(translateX.value / WIDTH);
  });

  const deleteChats = (text: string) => {
    if (text == 'chat') {
      for (const id of selectedSingleChat) {
        deleteMessageChat(user?.uid, id);
      }
      setSelectedSingleChat([]);
    } else {
      for (const id of selectedGroupChat) {
        deleteGroupFromFb(id);
      }
      setSelectedGroupChat([]);
    }
  };

  // get data on first render
  useEffect(() => {
    // get userData
    getUserData()
      .then(user => {
        setUser(user.data());

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.GREY_BLACK}
        barStyle={'light-content'}
      />

      {/* when selected Chat */}
      <DeleteComp
        info="Delete Chat"
        onPress={() => deleteChats('chat')}
        onPressBack={() => {
          setSelectedSingleChat([]);
        }}
        selectedChat={selectedSingleChat.length > 0 ? true : false}
      />

      {/* when select group chat */}
      <DeleteComp
        info="Delete Group Chat"
        onPress={() => deleteChats('group')}
        onPressBack={() => {
          setSelectedGroupChat([]);
        }}
        selectedChat={selectedGroupChat.length > 0 ? true : false}
      />
      {/* topappBar */}
      <TopAppBar
        text="Chatapp"
        back={false}
        onPressonMore={() => setShowMore(!showMore)}
      />

      {/* show more buttons */}
      {showMore && (
        <ShowMoreComp
          onPrees={() => {
            setShowMore(!showMore);
            navigation.navigate('Profile');
          }}
        />
      )}

      {/* tabbar */}
      <View style={styles.tabBarContainer}>
        {tabData.map((item, index) => (
          <Tab
            key={index}
            item={item}
            index={index}
            activeTab={activeTab}
            onPress={() => changeTab(item)}
          />
        ))}
      </View>

      {/* scrollView container */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Animated.ScrollView
          ref={scrollRef}
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          onScroll={onScrollEvent}>
          {/* chat tab container */}

          <View style={styles.tabContentContainer}>
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
                      if (selectedSingleChat.includes(chat.chatterId)) return;
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
                <MaterialIcons
                  name="message"
                  color={AppColors.WHITE}
                  size={22}
                />
              }
            />
          </View>

          {/* group tab container */}
          <View style={styles.tabContentContainer}>
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
                      if (selectedGroupChat.includes(group.groupId)) return;
                      goToGroupChat(group, navigation);
                    }}
                    newMessage={
                      group.newMessage && group.senderId != user?.uid
                        ? true
                        : false
                    }
                  />
                ))}
                <SizedBox extraStyle={{height: 30}} />
              </ScrollView>
            )}

            {/* go to group positionbutton */}
            <PositionButton
              onPress={() =>
                navigation.navigate('Contacts', {isContact: false})
              }
              children={
                <AntDesign name="plus" color={AppColors.WHITE} size={22} />
              }
            />
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },

  tabBarContainer: {
    width: WIDTH,
    height: HEIGHT * 0.1 - 20,
    backgroundColor: AppColors.GREY_BLACK,
    flexDirection: 'row',
  },
  tabContentContainer: {
    width: WIDTH,
    height: HEIGHT * 0.8,
    backgroundColor: AppColors.BLACK,
  },
  tabScrollStyle: {
    paddingTop: 15,
  },
});
