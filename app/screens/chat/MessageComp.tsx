import {StyleSheet, Text, View} from 'react-native';
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
