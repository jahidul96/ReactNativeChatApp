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
import {useNavigation} from '@react-navigation/native';
import {AntDesign, Ionicons} from '../utils/IconExport';

interface chatInterface {
  isChat?: boolean;
  onPress: () => void;
  onLongPress: () => void;
  profilePic: string;
  username: string;
  lastMsg: string;
  newMessage?: boolean;
}
const ChatComp = ({
  isChat = true,
  onPress,
  onLongPress,
  lastMsg,
  username,
  profilePic,
  newMessage,
}: chatInterface) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Image
        source={{uri: profilePic ? profilePic : imgUri}}
        style={styles.imgStyle}
      />
      <View style={styles.rightContainer}>
        <View style={styles.nameAndDateStyle}>
          <RegularText text={username} />
          {isChat && <RegularText text="1h" />}
        </View>
        <View style={[styles.nameAndDateStyle, {marginTop: -10}]}>
          <View style={styles.photoIconWrapper}>
            {isChat && lastMsg == 'Photo' && (
              <Ionicons
                name="image"
                style={{marginRight: 5}}
                color={AppColors.WHITE}
                size={15}
              />
            )}
            <RegularText
              text={
                lastMsg.length > 30 ? lastMsg.slice(0, 29) + '...' : lastMsg
              }
              extraStyle={styles.lastMsgStyle}
            />
          </View>

          {newMessage && (
            <View style={styles.newAlertStyle}>
              <RegularText text="new" extraStyle={styles.newTextStyle} />
            </View>
          )}
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
    width: 50,
    height: 50,
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
    fontSize: 14,
  },

  photoIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  newAlertStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 20,
  },
  newTextStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
