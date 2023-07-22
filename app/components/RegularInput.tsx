import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';

interface inputInterFace {
  placeholder: string;
  setValue: any;
  isPassword?: boolean;
}
const RegularInput = ({
  placeholder,
  setValue,
  isPassword = false,
}: inputInterFace) => (
  <TextInput
    placeholderTextColor={AppColors.WHITE}
    placeholder={placeholder}
    style={styles.container}
    onChangeText={text => setValue(text)}
    secureTextEntry={isPassword}
  />
);

export default RegularInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.WHITE,
    marginBottom: 20,
    fontSize: 17,
    color: AppColors.WHITE,
  },
});
