import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';

interface textInterface {
  text: string;
  extraStyle?: any;
}
const RegularText = ({text, extraStyle}: textInterface) => (
  <Text style={[styles.text, extraStyle]}>{text}</Text>
);

export default RegularText;

const styles = StyleSheet.create({
  text: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
