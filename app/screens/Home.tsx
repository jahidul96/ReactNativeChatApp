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
import auth from '@react-native-firebase/auth';
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
import {PositionButton, ShowMoreComp, SizedBox} from '../components/Reuseable';
import {AntDesign, MaterialIcons} from '../utils/IconExport';
import RegularText from '../components/RegularText';
import {getUserData} from '../firebase/fbFireStore';
import {AppContext} from '../context/AppContext';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Home = () => {
  const navigation = useNavigation<any>();
  const translateX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [showMore, setShowMore] = useState(false);
  const {setUser} = useContext(AppContext);

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
  const onPreesOnChat = (text: string) => {
    if (text == 'singleChat') {
      navigation.navigate('MessageScreen');
    }
  };
  // onLongprees on chat
  const onLongPreesOnChat = (text: string) => {};

  // get data on first render

  useEffect(() => {
    getUserData()
      .then(user => {
        setUser(user.data());
        // console.log(user.id);
        // console.log(user.data());
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
      <Animated.ScrollView
        ref={scrollRef}
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        onScroll={onScrollEvent}>
        {/* chat tab container */}
        <View style={styles.tabContentContainer}>
          <View style={{flex: 1}}>
            <ScrollView style={styles.tabScrollStyle}>
              {numbers.map(item => (
                <ChatComp
                  key={item}
                  onLongPress={() => onLongPreesOnChat('singleChat')}
                  onPress={() => onPreesOnChat('singleChat')}
                />
              ))}
              <SizedBox extraStyle={{height: 30}} />
            </ScrollView>
            {/* go to contacts positionbutton */}
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
        </View>

        {/* group tab container */}
        <View style={styles.tabContentContainer}>
          <ScrollView style={styles.tabScrollStyle}>
            <ChatComp
              onLongPress={() => onLongPreesOnChat('groupChat')}
              onPress={() => onPreesOnChat('groupChat')}
            />
            <SizedBox extraStyle={{height: 30}} />
          </ScrollView>

          {/* go to group positionbutton */}
          <PositionButton
            onPress={() => navigation.navigate('Contacts')}
            children={
              <AntDesign name="plus" color={AppColors.WHITE} size={22} />
            }
          />
        </View>
      </Animated.ScrollView>
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
    height: HEIGHT * 0.1 - 10,
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
