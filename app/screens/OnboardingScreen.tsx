import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';
import RegularText from '../components/RegularText';
import RegularButton from '../components/RegularButton';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.GREY_BLACK}
        barStyle={'light-content'}
      />
      <View style={styles.topBarStyle}>
        <RegularText text="ChatApp" extraStyle={styles.appbarText} />
      </View>

      <View style={styles.middleContainer}></View>

      <View style={styles.footerContainer}>
        <RegularButton text="Get Started" onPress={() => {}} />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.GREY_BLACK,
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
  },
  footerContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
