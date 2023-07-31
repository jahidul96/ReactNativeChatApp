import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';
import RegularText from './RegularText';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '../utils/IconExport';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface sizedProps {
  extraStyle?: any;
}
export const SizedBox = ({extraStyle}: sizedProps) => (
  <View style={[styles.container, extraStyle]} />
);

interface iconInterface {
  children: any;
  onPress: () => void;
  extraStyle?: any;
}

export const PositionButton = ({
  children,
  onPress,
  extraStyle,
}: iconInterface) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.iconContainer, extraStyle]}>
      {children}
    </TouchableOpacity>
  );
};

interface shoemoreInterface {
  onPrees: () => void;
  extraStyle?: any;
}
export const ShowMoreComp = ({onPrees, extraStyle}: shoemoreInterface) => (
  <View style={[styles.showMoreContainer, extraStyle]}>
    <Pressable style={styles.showMoreBtn} onPress={onPrees}>
      <RegularText text="Profile" extraStyle={styles.showMoreBtnText} />
    </Pressable>
  </View>
);

interface dividerInterface {
  extraStyle?: any;
}
export const Divider = ({extraStyle}: dividerInterface) => (
  <View style={[styles.dividerContainer, extraStyle]} />
);

interface emptyInterface {
  infoText: string;
}
export const EmptyInfoComp = ({infoText}: emptyInterface) => (
  <View style={styles.emptyContainer}>
    <RegularText text={infoText} />
  </View>
);

interface deletecomp {
  info: string;
  onPress: () => void;
  onPressBack: () => void;
  selectedChat: boolean;
}
export const DeleteComp = ({
  info,
  onPress,
  onPressBack,
  selectedChat,
}: deletecomp) => {
  const animStyle = useAnimatedStyle(() => {
    return {
      top: selectedChat
        ? withTiming(0, {duration: 300})
        : withTiming(-80, {duration: 300}),
      zIndex: selectedChat
        ? withTiming(999, {duration: 300})
        : withTiming(-1, {duration: 300}),
    };
  });
  return (
    <Animated.View style={[styles.deleteContentContainer, animStyle]}>
      <View style={styles.topLeftInfoComp}>
        <AntDesign
          name="arrowleft"
          color={AppColors.WHITE}
          size={25}
          style={{marginRight: 15}}
          onPress={onPressBack}
        />
        <RegularText
          text={info}
          extraStyle={{fontWeight: 'bold', fontSize: 18}}
        />
      </View>

      <Pressable onPress={onPress}>
        <AntDesign
          name="delete"
          color={AppColors.WHITE}
          size={22}
          style={{marginRight: 15}}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 20,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },

  showMoreContainer: {
    width: 150,
    height: 100,
    backgroundColor: AppColors.GREY_BLACK,
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  showMoreBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreBtnText: {
    fontWeight: '700',
    fontSize: 17,
  },

  dividerContainer: {
    width: WIDTH,
    borderBottomColor: AppColors.THIN_GREY,
    borderBottomWidth: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.BLACK,
  },
  deleteContentContainer: {
    width: WIDTH,
    height: HEIGHT * 0.1 - 10,
    backgroundColor: AppColors.GREY_BLACK,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  topLeftInfoComp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
