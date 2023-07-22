import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';

interface sizedProps {
  extraStyle?: any;
}
export const SizedBox = ({extraStyle}: sizedProps) => (
  <View style={[styles.container, extraStyle]} />
);

interface iconInterface {
  children: any;
  onPress: () => void;
}

export const PositionButton = ({children, onPress}: iconInterface) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.iconContainer}>
      {children}
    </TouchableOpacity>
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
});
