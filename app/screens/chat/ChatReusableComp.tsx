import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
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

export const PhotoPlacehoderComp = () => (
  <View style={styles.phPlaceholderContainer}>
    <View style={[styles.imgWrapper]}>
      <ActivityIndicator color={AppColors.WHITE} />
    </View>
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

  phPlaceholderContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 8,
    paddingHorizontal: 10,
  },

  imgWrapper: {
    width: '70%',
    height: 200,
    backgroundColor: AppColors.GREY_BLACK,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
