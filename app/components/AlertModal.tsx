import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React from 'react';
import RegularButton from './RegularButton';
import RegularText from './RegularText';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';

interface modalInterface {
  infoText: string;
  visible: boolean;
  setVisiable: any;
  onPressOk: () => void;
}
const AlertModal = ({
  infoText,
  visible,
  setVisiable,
  onPressOk,
}: modalInterface) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisiable(false);
      }}>
      <Pressable style={styles.centeredView}>
        <View style={styles.modalView}>
          <RegularText text={infoText} extraStyle={styles.logoutInfoText} />
          <View style={styles.buttonWrapper}>
            <RegularButton
              text="Cancel"
              onPress={() => setVisiable(!visible)}
              extraStyle={styles.cancelBtnStyle}
            />
            <RegularButton
              text="OK"
              onPress={onPressOk}
              extraStyle={styles.cancelBtnStyle}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  centeredView: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    width: WIDTH - 50,
    height: 200,
    alignSelf: 'center',
    backgroundColor: AppColors.WHITE,
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logoutInfoText: {
    color: AppColors.BLACK,
    fontSize: 20,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelBtnStyle: {
    width: '45%',
    backgroundColor: AppColors.GREY_BLACK,
    height: 40,
  },
});
