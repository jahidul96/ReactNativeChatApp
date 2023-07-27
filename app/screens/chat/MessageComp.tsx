import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {AppColors} from '../../utils/AppColors';
import {messageInterface} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {AntDesign} from '../../utils/IconExport';

interface messageCompInterface {
  message: messageInterface;
  isGroupChat: boolean;
}

const MessageComp = ({message, isGroupChat}: messageCompInterface) => {
  const {user} = useContext(AppContext);

  const msgSideStyle =
    message.senderId == user.uid ? styles.myMsgSide : styles.friendMsgSide;
  const msgBG =
    message.senderId == user.uid ? AppColors.GREY_BLACK : AppColors.BLUE_DARK;

  const borderCurveStyle =
    message.senderId == user.uid
      ? styles.meSideBorderCurver
      : styles.friendSideBorderCurver;

  return (
    <View style={[styles.messageContainer, msgSideStyle]}>
      {/* message image show */}
      {message.media && message.file.type == 'image' && (
        <View
          style={[
            styles.imgFlexContainer,
            borderCurveStyle,
            message.file.urls.length >= 3 && styles.threeImgFlexContainer,
          ]}>
          {message.file.urls.map((url, index, arr) => (
            <View
              key={index}
              style={[
                styles.imgContainer,
                arr.length == 2 && styles.twoImgContainerStye,
                arr.length >= 3 && styles.thereeImgContainerStye,
              ]}>
              <Image source={{uri: url}} style={[styles.imgStyle]} />
            </View>
          ))}

          {message.file.urls.length >= 3 && (
            <View style={styles.imgDeatilsPositionBtnStyle}>
              <AntDesign name="pluscircle" color={AppColors.WHITE} size={45} />
            </View>
          )}
        </View>
      )}

      {/* text show */}
      {message.text == '' ? (
        <View />
      ) : (
        <Text
          style={[
            styles.msgTextStyle,
            {
              backgroundColor: msgBG,
            },
            borderCurveStyle,
          ]}>
          {message.text}
        </Text>
      )}
    </View>
  );
};

export default MessageComp;

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  msgTextStyle: {
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 7,
    minWidth: '10%',
    maxWidth: '80%',
    color: AppColors.WHITE,
  },
  myMsgSide: {alignItems: 'flex-end'},
  friendMsgSide: {alignItems: 'flex-start', textAlign: 'left'},

  meSideBorderCurver: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  friendSideBorderCurver: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  imgFlexContainer: {
    width: '70%',
    height: 300,
    backgroundColor: AppColors.GREY_BLACK,
    padding: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    gap: 8,
  },

  threeImgFlexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },

  imgContainer: {
    width: '100%',
    height: '100%',
  },
  twoImgContainerStye: {
    width: '100%',
    height: '48%',
  },
  thereeImgContainerStye: {
    width: '48%',
    height: '48%',
  },
  imgStyle: {
    flex: 1,
    borderRadius: 5,
  },
  twoImgStyle: {
    width: '50%',
    height: '100%',
  },

  imgDeatilsPositionBtnStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: '50%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
