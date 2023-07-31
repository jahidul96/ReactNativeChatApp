import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import RegularText from '../../components/RegularText';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons} from '../../utils/IconExport';
import {HEIGHT, WIDTH} from '../../utils/AppDimension';

interface mediaSendInterface {
  name: string;
  onPress: () => void;
}
export const MediaSendFooter = ({name, onPress}: mediaSendInterface) => (
  <View style={styles.bottomContainer}>
    <View style={styles.nameWrapper}>
      <RegularText text={name} />
    </View>
    <Pressable style={styles.rightContainer} onPress={onPress}>
      <Ionicons name="send-sharp" size={20} color={AppColors.WHITE} />
    </Pressable>
  </View>
);

interface photosInterFace {
  photos: Array<string>;
}
export const PhotoPlacehoderComp = ({photos}: photosInterFace) => (
  <View style={styles.phPlaceholderContainer}>
    <View
      style={[
        styles.imgContainer,
        photos.length == 2 && styles.imgFlexContainer,
        photos.length >= 3 && styles.gridImgStyle,
      ]}>
      {photos.map((url, index, arr) => (
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
    </View>

    <ActivityIndicator
      color={AppColors.WHITE}
      size={'large'}
      style={styles.loadderStyle}
    />

    {photos.length >= 3 && (
      <View style={styles.imgDeatilsPositionBtnStyle}>
        <AntDesign name="pluscircle" color={AppColors.WHITE} size={45} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
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

  phPlaceholderContainer: {
    width: '75%',
    height: HEIGHT / 2,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 10,
    alignSelf: 'flex-end',
  },

  imgFlexContainer: {
    flex: 1,
    gap: 8,
    marginBottom: 5,
  },
  gridImgStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
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
    opacity: 0.7,
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
  loadderStyle: {
    position: 'absolute',
  },
});
