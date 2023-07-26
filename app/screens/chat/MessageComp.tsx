import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {AppColors} from '../../utils/AppColors';
import {messageInterface} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';

interface messageCompInterface {
  message: messageInterface;
}

const MessageComp = ({message}: messageCompInterface) => {
  const {user} = useContext(AppContext);

  // conditionalStyleing

  // console.log(message.senderId);
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
      {message.media && message.file.type == 'image' && (
        <View style={[styles.imgWrapper, borderCurveStyle]}>
          <Image source={{uri: message.file.urls[0]}} style={styles.imgStyle} />
        </View>
      )}

      {message.text == '' ? (
        <View />
      ) : (
        <Text
          style={[
            styles.msgTextStyle,
            {
              backgroundColor: msgBG,
            },
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
    borderRadius: 16,
    color: AppColors.WHITE,
  },
  myMsgSide: {alignItems: 'flex-end'},
  friendMsgSide: {alignItems: 'flex-start', textAlign: 'left'},
  imgWrapper: {
    width: '70%',
    height: 200,
    backgroundColor: AppColors.GREY_BLACK,
    padding: 10,
  },

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
  imgStyle: {
    flex: 1,
  },
});
