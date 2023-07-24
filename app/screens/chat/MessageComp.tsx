import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';

interface message {
  userId: number;
  text: string;
}

interface messageCompInterface {
  message: message;
}

const myId = 1;
const MessageComp = ({message}: messageCompInterface) => {
  // conditionalStyleing
  const msgSideStyle =
    message.userId == myId ? styles.myMsgSide : styles.friendMsgSide;
  const msgBG =
    message.userId == myId ? AppColors.GREY_BLACK : AppColors.BLUE_DARK;

  return (
    <View style={[styles.messageContainer, msgSideStyle]}>
      <Text
        style={[
          styles.msgTextStyle,
          {
            backgroundColor: msgBG,
          },
        ]}>
        {message.text}
      </Text>
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
    backgroundColor: AppColors.GREY_BLACK,
    paddingHorizontal: 13,
    paddingVertical: 7,
    minWidth: '10%',
    maxWidth: '80%',
    borderRadius: 16,
    color: AppColors.WHITE,
  },
  myMsgSide: {alignItems: 'flex-end'},
  friendMsgSide: {alignItems: 'flex-start', textAlign: 'left'},
});
