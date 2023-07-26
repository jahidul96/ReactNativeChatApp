import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons} from '../../utils/IconExport';
import {WIDTH} from '../../utils/AppDimension';
import {useNavigation} from '@react-navigation/native';
import RegularText from '../../components/RegularText';
import {imgShowScreenparamsInterface} from '../../utils/interfaceExports';

interface imageScreenInterface {
  route: {
    params: imgShowScreenparamsInterface;
  };
}

const ImageShowCaseScreen = ({route}: imageScreenInterface) => {
  const navigation = useNavigation<any>();
  const {isMultiple, imgUrl, name, chatId, profilePic, user, setShowCamera} =
    route.params;

  const onBackPress = () => {
    setShowCamera(false);
    navigation.goBack();
  };

  const sendMedia = () => {
    if (isMultiple) {
      console.log('muliple images have to send!');
    } else {
      console.log('single image have to send');
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeBtnWrapper} onPress={onBackPress}>
        <AntDesign name="close" size={25} />
      </Pressable>

      <View style={styles.imgWrapper}>
        {isMultiple ? (
          <ScrollView></ScrollView>
        ) : imgUrl ? (
          <Image source={{uri: imgUrl[0]}} style={styles.imgStyle} />
        ) : (
          <View style={styles.imgStyle} />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.nameWrapper}>
          <RegularText text={name} />
        </View>
        <Pressable style={styles.rightContainer} onPress={sendMedia}>
          <Ionicons name="send-sharp" size={20} color={AppColors.WHITE} />
        </Pressable>
      </View>
    </View>
  );
};

export default ImageShowCaseScreen;

const styles = StyleSheet.create({
  container: {
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

  bottomContainer: {
    width: WIDTH,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nameWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightContainer: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
