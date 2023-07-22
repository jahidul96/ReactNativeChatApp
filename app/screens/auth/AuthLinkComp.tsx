import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';
import RegularText from '../../components/RegularText';

interface authLinkInterface {
  text: string;
  linkText: string;
  onPress: () => void;
}
const AuthLinkComp = ({text, linkText, onPress}: authLinkInterface) => (
  <View style={styles.container}>
    <RegularText text={text} />
    <TouchableOpacity onPress={onPress}>
      <RegularText text={linkText} extraStyle={styles.linkText} />
    </TouchableOpacity>
  </View>
);

export default AuthLinkComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linkText: {
    fontSize: 17,
  },
});
