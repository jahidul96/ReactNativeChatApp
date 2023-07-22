import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';
import {TouchableNativeFeedback} from 'react-native';
import RegularText from './RegularText';

interface buttonInterFace {
  text: string;
  extraStyle?: any;
  onPress: () => void;
}
const RegularButton = ({text, extraStyle, onPress}: buttonInterFace) => (
  <TouchableNativeFeedback
    onPress={onPress}
    role="button"
    style={{alignItems: 'center'}}
    background={TouchableNativeFeedback.Ripple(AppColors.WHITE, true)}>
    <View style={[styles.container, extraStyle]}>
      <RegularText text={text} extraStyle={styles.textStyle} />
    </View>
  </TouchableNativeFeedback>
);

export default RegularButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    backgroundColor: AppColors.BLACK,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: AppColors.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
