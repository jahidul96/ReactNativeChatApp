import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  NativeScrollEvent,
  Pressable,
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
  EmptyInfoComp,
  PositionButton,
  ShowMoreComp,
  SizedBox,
} from '../components/Reuseable';
import {AntDesign, MaterialIcons} from '../utils/IconExport';
import {getUserData, updateSeenStatus} from '../firebase/fbFireStore';
import {AppContext} from '../context/AppContext';
import LoadingScreen from './LoadingScreen';
import {chatInterface} from '../utils/interfaceExports';
import getRealtimeChats from '../firebase/RealTimeChats';

const Home = () => {
  const navigation = useNavigation<any>();
  const translateX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [showMore, setShowMore] = useState(false);
  const {setUser} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const chats = getRealtimeChats();
  const {user} = useContext(AppContext);

  // onScrollEvent function
  const onScrollEvent = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      // console.log(event.contentOffset.x);
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

  // toggle show more
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // onprees on chat
  const onPreesOnChat = (chat: chatInterface) => {
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
  // onLongprees on chat
  const onLongPreesOnChat = (text: string) => {};

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
      {/* topappBar */}
      <TopAppBar text="Chatapp" back={false} onPressonMore={toggleShowMore} />

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
                    key={chat.chatterId}
                    profilePic={chat.chatterProfilePic}
                    username={chat.chatterName}
                    lastMsg={chat.media ? 'Photo' : chat.lastMsg}
                    onLongPress={() => onLongPreesOnChat('singleChat')}
                    onPress={() => onPreesOnChat(chat)}
                    newMessage={chat.newMessage}
                  />
                ))}
                <SizedBox extraStyle={{height: 30}} />
              </ScrollView>
            )}

            <PositionButton
              onPress={() => navigation.navigate('Contacts')}
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
            {groups.length == 0 ? (
              <EmptyInfoComp infoText="No Groups" />
            ) : (
              <ScrollView style={styles.tabScrollStyle}>
                <ChatComp
                  onLongPress={() => onLongPreesOnChat('groupChat')}
                  onPress={() => {}}
                />
                <SizedBox extraStyle={{height: 30}} />
              </ScrollView>
            )}

            {/* go to group positionbutton */}
            <PositionButton
              onPress={() => navigation.navigate('Contacts')}
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
