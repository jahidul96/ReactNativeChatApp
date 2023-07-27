import {StyleSheet, Text, View, Modal, Pressable, Image} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons} from '../../utils/IconExport';
import {MediaSendFooter} from './ChatReusableComp';

interface modalInterface {
  visible: boolean;
  onRequestClose: () => void;
  imgUrl: string;
  name: string;
  onPress: () => void;
}
const CameraImageModal = ({
  visible,
  onRequestClose,
  imgUrl,
  name,
  onPress,
}: modalInterface) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      {/* toggler */}
      <Pressable style={styles.centeredView}>
        <Pressable style={styles.closeBtnWrapper} onPress={onRequestClose}>
          <AntDesign name="close" size={25} />
        </Pressable>

        {/* captured image show */}
        <View style={styles.imgWrapper}>
          {imgUrl ? (
            <Image source={{uri: imgUrl}} style={styles.imgStyle} />
          ) : (
            <View style={styles.imgStyle} />
          )}
        </View>

        {/* bottom sender comp */}
        <MediaSendFooter name={name} onPress={onPress} />
      </Pressable>
    </Modal>
  );
};

export default CameraImageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: AppColors.GREY_BLACK,
  },

  closeBtnWrapper: {
    backgroundColor: AppColors.WHITE,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    zIndex: 999,
  },

  imgWrapper: {
    flex: 1,
  },
  imgStyle: {
    flex: 1,
  },
});
