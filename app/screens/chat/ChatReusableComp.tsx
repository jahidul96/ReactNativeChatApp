import {StyleSheet, Text, View, Modal, Pressable, Image} from 'react-native';
import React from 'react';
import RegularText from '../../components/RegularText';
import {AppColors} from '../../utils/AppColors';
import {Ionicons} from '../../utils/IconExport';
import {WIDTH} from '../../utils/AppDimension';

interface mediaSendInterface {
  name: string;
  onPress: () => void;
}
export const MediaSendFooter = ({name, onPress}: mediaSendInterface) => (
  <View style={styles.bottomContainer}>
    <View style={styles.nameWrapper}>
      <RegularText text={name} />
    </View>
    <Pressable style={styles.rightContainer} onPress={onPress}>
      <Ionicons name="send-sharp" size={20} color={AppColors.WHITE} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  bottomContainer: {
    width: WIDTH,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nameWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightContainer: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
