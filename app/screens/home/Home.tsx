import {StyleSheet, View, StatusBar} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import TopAppBar from '../../components/TopAppBar';
import {AppColors} from '../../utils/AppColors';
import {HEIGHT, WIDTH} from '../../utils/AppDimension';

import {DeleteComp, ShowMoreComp} from '../../components/Reuseable';
import {
  deleteGroupFromFb,
  deleteMessageChat,
  getUserData,
} from '../../firebase/fbFireStore';
import {AppContext} from '../../context/AppContext';
import getRealtimeChats from '../../firebase/RealTimeChats';
import getGroupsChats from '../../firebase/GetGroupsChats';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ChatTab from './ChatTab';
import GroupTab from './GroupTab';
import AlertModal from '../../components/AlertModal';

const Home = () => {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Chats'},
    {key: 'second', title: 'Groups'},
  ]);
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
  const [confirmChatDelete, setConfirmChatDelete] = useState(false);
  const [groupDeleteConfirmation, setGroupDeleteConfirmation] = useState(false);

  // renderTabbar
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: AppColors.WHITE}}
      style={{
        backgroundColor: AppColors.GREY_BLACK,
        minHeight: 55,
        justifyContent: 'center',
        elevation: 0,
        borderRadius: 6,
      }}
      labelStyle={{
        color: AppColors.GREY,
        fontWeight: '700',
      }}
      activeColor={AppColors.WHITE}
      inactiveColor={AppColors.GREY}
    />
  );

  // renderScene
  const renderScene = SceneMap({
    first: () => (
      <ChatTab
        chats={chats}
        loading={loading}
        selectedGroupChat={selectedGroupChat}
        selectedSingleChat={selectedSingleChat}
        setSelectedGroupChat={setSelectedGroupChat}
        setSelectedSingleChat={setSelectedSingleChat}
      />
    ),
    second: () => (
      <GroupTab
        groupChats={groupChats}
        loading={loading}
        selectedGroupChat={selectedGroupChat}
        selectedSingleChat={selectedSingleChat}
        setSelectedGroupChat={setSelectedGroupChat}
        setSelectedSingleChat={setSelectedSingleChat}
      />
    ),
  });

  const confirmationCall = (text: string) => {
    if (text == 'chat') {
      setConfirmChatDelete(true);
    } else {
      setGroupDeleteConfirmation(true);
    }
  };

  // confirmationCall
  const deletChat = (text: string) => {
    if (text == 'chat') {
      for (const id of selectedSingleChat) {
        deleteMessageChat(user?.uid, id);
      }
      setConfirmChatDelete(false);
      setSelectedSingleChat([]);
    } else {
      for (const id of selectedGroupChat) {
        deleteGroupFromFb(id);
      }
      setGroupDeleteConfirmation(false);
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
        }, 1500);
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
        onPress={() => confirmationCall('chat')}
        onPressBack={() => {
          setSelectedSingleChat([]);
        }}
        selectedChat={selectedSingleChat.length > 0 ? true : false}
      />

      {/* delete chat modal */}
      <AlertModal
        infoText="Selected Chat Will be deleted"
        onPressOk={() => deletChat('chat')}
        setVisiable={setConfirmChatDelete}
        visible={confirmChatDelete}
      />

      {/* when select group chat */}
      <DeleteComp
        info="Delete Group Chat"
        onPress={() => confirmationCall('group')}
        onPressBack={() => {
          setSelectedGroupChat([]);
        }}
        selectedChat={selectedGroupChat.length > 0 ? true : false}
      />

      {/* delete chat modal */}
      <AlertModal
        infoText="Selected group will be deleted"
        onPressOk={() => deletChat('group')}
        setVisiable={setGroupDeleteConfirmation}
        visible={groupDeleteConfirmation}
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

      {/* slider */}
      <View
        style={{
          flex: 1,
          width: WIDTH,
        }}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: WIDTH}}
          renderTabBar={renderTabBar}
        />
      </View>
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
