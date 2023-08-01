import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import {AppColors} from '../utils/AppColors';
import RegularText from '../components/RegularText';
import RegularButton from '../components/RegularButton';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {onBoardingData} from '../data/onboardingData';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const OnboardingScreen = () => {
  const translateX = useSharedValue(0);
  const navigation = useNavigation<any>();

  const onScrollHanlder = useAnimatedScrollHandler({
    onScroll: event => {
      // console.log(event.contentOffset.x);
      translateX.value = event.contentOffset.x;
    },
  });
  const activeSlide = useDerivedValue(() => {
    return Math.round(translateX.value / WIDTH);
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.BLACK} barStyle={'light-content'} />

      <View style={styles.middleContainer}>
        <View style={styles.scrollWrapper}>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            onScroll={onScrollHanlder}>
            {onBoardingData.map(data => (
              <View key={data.id} style={styles.contentWrapper}>
                <Image source={data.img} style={{width: 100, height: 100}} />
                <RegularText text={data.text} extraStyle={styles.titleText} />
                <RegularText text={data.desc} extraStyle={styles.descText} />
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        <View style={styles.indicatorWrapper}>
          {onBoardingData.map((_, index) => (
            <Dot activeSlide={activeSlide} key={index} index={index} />
          ))}
        </View>
      </View>

      <View style={styles.footerContainer}>
        <RegularButton
          text="Get Started"
          onPress={() => {
            AsyncStorage.setItem('firstrun', 'true');
            navigation.navigate('Register');
          }}
          extraStyle={{backgroundColor: AppColors.GREY_BLACK}}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

interface dotInterface {
  activeSlide: any;
  index: number;
}
const Dot = ({activeSlide, index}: dotInterface) => {
  const animStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        activeSlide.value == index
          ? withTiming(AppColors.WHITE, {duration: 300})
          : withTiming(AppColors.GREY, {duration: 300}),
    };
  });
  return <Animated.View style={[styles.indicatorStyle, animStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  topBarStyle: {
    width: '100%',
    height: 70,
    backgroundColor: AppColors.GREY_BLACK,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  appbarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollWrapper: {
    width: WIDTH,
    height: HEIGHT / 2,
  },
  contentWrapper: {
    width: WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 10,
  },
  descText: {
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 25,
  },

  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: AppColors.GREY,
    marginRight: 8,
  },
  footerContainer: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
