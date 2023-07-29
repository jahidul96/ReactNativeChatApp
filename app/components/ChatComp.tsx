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
import {AntDesign, Ionicons} from '../utils/IconExport';
import moment from 'moment';

interface chatInterface {
  isChat?: boolean;
  onPress: () => void;
  onLongPress: () => void;
  profilePic: string;
  username: string;
  lastMsg: string;
  newMessage?: boolean;
  isSelected?: boolean;
  msgTime?: Date;
}
const ChatComp = ({
  isChat = true,
  onPress,
  onLongPress,
  lastMsg,
  username,
  profilePic,
  newMessage,
  isSelected = false,
  msgTime,
}: chatInterface) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: isSelected ? AppColors.GREY_BLACK : AppColors.BLACK},
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View>
        <Image
          source={{uri: profilePic ? profilePic : imgUri}}
          style={styles.imgStyle}
        />
        {isSelected && (
          <View style={styles.selectedStyle}>
            <AntDesign name="check" color={AppColors.WHITE} size={16} />
          </View>
        )}
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.nameAndDateStyle}>
          <RegularText text={username} />
          {isChat && (
            <RegularText
              text={moment(msgTime).fromNow().toString()}
              extraStyle={{fontSize: 12}}
            />
          )}
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
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 10,
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

  selectedStyle: {
    width: 18,
    height: 18,
    backgroundColor: 'red',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 15,
  },
});
