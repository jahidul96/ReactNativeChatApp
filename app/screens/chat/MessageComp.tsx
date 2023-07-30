import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppColors} from '../../utils/AppColors';
import {messageInterface} from '../../utils/interfaceExports';
import {AppContext} from '../../context/AppContext';
import {AntDesign} from '../../utils/IconExport';
import {useNavigation} from '@react-navigation/native';
import RegularText from '../../components/RegularText';
import moment from 'moment';

interface messageCompInterface {
  message: messageInterface;
  isGroupChat: boolean;
}

const MessageComp = ({message, isGroupChat}: messageCompInterface) => {
  const [seeMsgTime, setSeeMsgTime] = useState(false);
  const {user} = useContext(AppContext);
  const navigation = useNavigation<any>();

  const msgSideStyle =
    message.senderDetails.uid == user.uid
      ? styles.myMsgSide
      : styles.friendMsgSide;
  const msgBG =
    message.senderDetails.uid == user.uid
      ? AppColors.GREY_BLACK
      : AppColors.BLUE_DARK;

  const borderCurveStyle =
    message.senderDetails.uid == user.uid
      ? styles.meSideBorderCurver
      : styles.friendSideBorderCurver;

  return (
    <View style={[styles.messageContainer, msgSideStyle]}>
      <View style={[styles.messageFlexContainer]}>
        {isGroupChat && message.senderDetails.uid != user.uid && (
          <Image
            style={styles.profieImageStyle}
            source={{uri: message.senderDetails.profilePic}}
          />
        )}
        {message.media && message.file.type == 'image' ? (
          // image show
          <Pressable
            style={[
              styles.imgFlexContainer,
              borderCurveStyle,
              message.file.urls.length >= 3 && styles.threeImgFlexContainer,
              {width: isGroupChat ? '80%' : '90%'},
            ]}
            onPress={() =>
              navigation.navigate('ImageSlider', {images: message.file.urls})
            }>
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
                <AntDesign
                  name="pluscircle"
                  color={AppColors.WHITE}
                  size={45}
                />
              </View>
            )}
          </Pressable>
        ) : (
          // text show
          <View>
            <Pressable
              onPress={() => setSeeMsgTime(!seeMsgTime)}
              style={[
                styles.msgTextWrapper,
                {
                  backgroundColor: msgBG,
                },
                borderCurveStyle,
              ]}>
              <RegularText text={message.text} extraStyle={styles.textStyle} />
            </Pressable>
            {seeMsgTime && (
              <Text
                style={[
                  styles.timeStyle,
                  {
                    alignSelf:
                      message.senderDetails.uid == user.uid
                        ? 'flex-end'
                        : 'flex-start',
                  },
                ]}>
                {moment(message.createdAt).fromNow().toString()}
              </Text>
            )}
          </View>
        )}
      </View>
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
  messageFlexContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  profieImageStyle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppColors.WHITE,
    marginRight: 10,
  },
  msgTextWrapper: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    minWidth: '10%',
    maxWidth: '100%',
  },
  textStyle: {
    color: AppColors.WHITE,
    fontSize: 15,
    fontWeight: '500',
  },
  timeStyle: {
    fontSize: 12,
    color: AppColors.WHITE,
  },
  myMsgSide: {alignItems: 'flex-end'},
  friendMsgSide: {alignItems: 'flex-start', textAlign: 'left'},

  meSideBorderCurver: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
  },
  friendSideBorderCurver: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 5,
  },

  imgFlexContainer: {
    width: '70%',
    height: 280,
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
