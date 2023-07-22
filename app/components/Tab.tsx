import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {WIDTH} from '../utils/AppDimension';
import RegularText from './RegularText';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {AppColors} from '../utils/AppColors';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

interface tabInterface {
  item: string;
  index: number;
  activeTab: any;
  onPress: () => void;
}
const Tab = ({item, index, activeTab, onPress}: tabInterface) => {
  const tabAnimStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor:
        activeTab.value === index
          ? withTiming(AppColors.WHITE, {duration: 300})
          : withTiming('transparent', {duration: 300}),
      borderBottomWidth: withTiming(4, {duration: 300}),
    };
  });
  const textAnimStyle = useAnimatedStyle(() => {
    return {
      fontWeight: activeTab.value === index ? '700' : '600',
      color:
        activeTab.value === index
          ? withTiming(AppColors.WHITE, {duration: 300})
          : withTiming('gray', {duration: 300}),
    };
  });

  return (
    <AnimatedButton style={[styles.container, tabAnimStyle]} onPress={onPress}>
      <Animated.Text style={[styles.text, textAnimStyle]}>{item}</Animated.Text>
    </AnimatedButton>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'red',
  },

  text: {
    fontSize: 17,
  },
});
