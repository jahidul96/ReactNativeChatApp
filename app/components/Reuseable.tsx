import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';
import RegularText from './RegularText';
import {useNavigation} from '@react-navigation/native';

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
}
export const ShowMoreComp = ({onPrees}: shoemoreInterface) => (
  <View style={styles.showMoreContainer}>
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
    bottom: 20,
    right: 20,
  },

  showMoreContainer: {
    width: 150,
    height: 100,
    backgroundColor: AppColors.WHITE,
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  showMoreBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreBtnText: {
    color: AppColors.BLACK,
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
});
