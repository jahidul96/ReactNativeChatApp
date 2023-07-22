import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {imgUri} from '../utils/FileExport';
import RegularText from './RegularText';
import {AppColors} from '../utils/AppColors';

interface chatInterface {
  isChat?: boolean;
}
const ChatComp = ({isChat = true}: chatInterface) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onLongPress={() => Alert.alert('233')}>
      <Image source={{uri: imgUri}} style={styles.imgStyle} />
      <View style={styles.rightContainer}>
        <View style={styles.nameAndDateStyle}>
          <RegularText text="Jahidul islam" />
          {isChat && <RegularText text="1h" />}
        </View>
        <View style={[styles.nameAndDateStyle, {marginTop: -10}]}>
          <RegularText text="last msg" extraStyle={styles.lastMsgStyle} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComp;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10,
  },

  imgStyle: {
    width: 52,
    height: 52,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: AppColors.WHITE,
  },

  rightContainer: {
    flex: 1,
  },
  nameAndDateStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lastMsgStyle: {
    color: AppColors.GREY,
    marginTop: -3,
  },
});
